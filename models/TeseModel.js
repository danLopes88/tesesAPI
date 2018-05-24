const uuidv1 = require('uuid/v1');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://user:123456@ds235180.mlab.com:35180/repositorio');
//mongoose.connect('mongodb://localhost:27017/Repositorio');
//mongodb://user:pass@host:port/dbname
var teseSchema = new Schema({
    title: String,
    creator: {
        type: Array,
        default: []
    },
    subject: {
        type: Array,
        default: []
    },
    description: {
        type: Array,
        default: []
    },
    date: Date,
    identifier : String,
    language : String,
    type : String,
    repNome : String,
    teseId : Number
});

var Tese = mongoose.model('teses', teseSchema);


async function getTese(teseId) {
    return await Tese.findById(teseId);
}

async function getTeses(reqObject) {
    //console.log("keys: " + Object.keys(reqObject));
    //let parametros = Object.keys(reqObject);
    //console.dir(parametros);
    let searchObj = {};
    if (Object.keys(reqObject).length == 0) return await Tese.find();

    else{
    if (reqObject.repNome){
        searchObj.repNome = {
        $regex: reqObject.repNome,
        $options: "i"
        };
    }

    if (reqObject.creator){
        searchObj.creator = {
            $regex: reqObject.creator+ ".*",
            $options: "i"
        };
    }


   if (reqObject.subject) {
       searchObj.subject = {
            $in: [reqObject.subject]
       }
    }

    if (reqObject.title) {
        searchObj.title = {
            $regex: reqObject.title + ".*",
            $options: "i"
            }
        }

    // var dataEntrada = new Date(reqObject.date);
    // var dataInicio = dataEntrada.setDate(dataEntrada.getDate() -1);
    // console.log(dataEntrada.setDate(dataEntrada.getDate() - (24 * 60 * 60 * 1000)));
    // if (reqObject.date){
    //     searchObj.date = {
    //             "$gte": new Date(dataEntrada.getDate() - 1 ),
    //             "$lte": new Date(dataEntrada.getDate() + 1)
    //     }
    // }
    return await Tese.find(searchObj);

    // var query = {}
    // if (req.body.customerName) {
    //     query = {
    //         firstName: new RegExp('^' + req.body.customerName + '$', "i"),
    //         lastName: new RegExp('^' + req.body.customerName + '$', "i")
    //     }
    // }
    // MyModel.find(query, function (err, data) {
    //     // data.forEach
    // });
    return await Tese.find();

    }
}

async function createTese(teseData) {
    try {
        let tese = new Tese(teseData);
        return (await tese.save());
    } catch (err) {
        throw err;
    }
}

// async function deleteRepositorio(repId) {
//     return await Repositorio.findByIdAndRemove(repId);
// }

// async function updateRepositorio(repId, repData) {
//     return await Repositorio.findByIdAndUpdate(repId, repData);
// }



exports.getTese = getTese;
exports.getTeses = getTeses;
exports.createTese = createTese;
// exports.deleteRepositorio = deleteRepositorio;
// exports.updateRepositorio = updateRepositorio;