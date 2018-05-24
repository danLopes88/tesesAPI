var HttpStatus = require('http-status-codes');
var json2xml = require('json2xml');

var teseModel = require('../models/TeseModel.js');
var repModel = require('../models/repositorioModel.js');

const oaipmh = require('../my_modules/oai-pmh-harvester/oai-pmh-harvester.js');



async function getTese(req, res) {
    sendResponse(req, res, await teseModel.getTese(req.params.teseId));
}

async function getTeses(req, res) {
    sendResponse(req, res, await teseModel.getTeses(req.query));
}


// async function deleteRepositorio(req, res) {
//     sendResponse(req, res, await repModel.deleteRepositorio(req.params.repId));
// }


// async function updateRepositorio(req, res) {
//     let repId = req.params.repId;
//     let repData = {
//         link: req.body.link,
//         name: req.body.name
//     }
//     sendResponse(req, res, await repModel.updateRepositorio(repId, repData));
// }


/**
 * Prepare HTTP responses according to headers
 *
 * @param {*} req
 * @param {*} res
 * @param {*} data
 */
function sendResponse(req, res, data, errorCode) {
    if (!data) { // no data to send
        res.status(HttpStatus.NOT_FOUND).send("NOT FOUND");
    } else {
        if (req.headers.accept == "text/xml") {
            res.set('Content-Type', 'text/xml');
            res.send(json2xml({
                response: data
            }, {
                header: true
            }));
        } else {
            res.jsonp(data);
        }
    }

}

exports.getTese = getTese;
exports.getTeses = getTeses;


