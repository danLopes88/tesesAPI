var HttpStatus = require('http-status-codes');
var json2xml = require('json2xml');

var teseModel = require('../models/TeseModel.js');
var repModel = require('../models/repositorioModel.js');

const oaipmh = require('../my_modules/oai-pmh-harvester/oai-pmh-harvester.js');

let counter = 0;
let repositorioData = {};
let repoId ='';

async function getRepositorio(req, res)  {
    sendResponse(req, res, await repModel.getRepositorio(req.params.repId));
}

async function getRepositorios(req, res)  {
    sendResponse(req, res, await repModel.getRepositorios(req.query.nome));
}


async function createRepositorio(req, res)  {


    try {
    repositorioData = {
        name: req.body.name,
        link: req.body.link + '?verb=ListRecords',
    }
     const dataProviderUrl = repositorioData.link;
     let harvester = new oaipmh.Harvester(dataProviderUrl);

     harvester.harvest(processItem, function (err, res) {
         console.log(res);
     });
     repositorioData.repoId = repoId;
        sendResponse(req, res, await repModel.createRepositorio(repositorioData));
    } catch(err) {
        res.status(500).send(err);
    }
}

async function deleteRepositorio(req, res)  {
    sendResponse(req, res, await repModel.deleteRepositorio(req.params.repId));
}


async function updateRepositorio (req, res) {
    let repId = req.params.repId;
    repData = {
        link: req.body.link,
        name: req.body.name
    }
    sendResponse(req, res, await repModel.updateRepositorio(repId, repData));
}


function sendResponse(req, res, data, errorCode) {
    if(!data) { // no data to send
        res.status(HttpStatus.NOT_FOUND).send("NOT FOUND");
    } else {
        if(req.headers.accept == "text/xml") {
            res.set('Content-Type', 'text/xml');
            res.send(json2xml( { response: data }, { header: true }));
        } else {
            res.jsonp(data);
        }
    }

}

function processItem(item) {
    try {
        let titles = item.metadata['oai_dc:dc']['dc:title'];
        let creator = item.metadata['oai_dc:dc']['dc:creator'];
        let subject = item.metadata['oai_dc:dc']['dc:subject'];
        let description = item.metadata['oai_dc:dc']['dc:description'];
        let date = item.metadata['oai_dc:dc']['dc:date'][1];
        let identifier = item.metadata['oai_dc:dc']['dc:identifier'];
        let language = item.metadata['oai_dc:dc']['dc:language'];
        let type = item.metadata['oai_dc:dc']['dc:type'];
        
        //numero da tese
        var array = identifier.split('/');
        var teseId = array[array.length - 1];

        var teseData = {
            title :  titles,
            creator : creator,
            subject : subject,
            description : description,
            date : date,
            identifier : identifier,
            language : language,
            type : type.substring(type.length -12, type.length),
            repNome : repositorioData.name,
            teseId : teseId
        }
        // console.log(teseData.type);
        if (teseData.type == 'masterThesis') teseModel.createTese(teseData);

    } catch (err) {
        // handle errors here
    }
};


exports.updateRepositorio = updateRepositorio;
exports.getRepositorio = getRepositorio;
exports.getRepositorios = getRepositorios;
exports.createRepositorio = createRepositorio;
exports.deleteRepositorio = deleteRepositorio;
