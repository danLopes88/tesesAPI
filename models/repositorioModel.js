const uuidv1 = require('uuid/v1');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var url = require('url');
// const options = {
//   useMongoClient: true,
//   autoIndex: false, // Don't build indexes
//   reconnectTries: 100, // Never stop trying to reconnect
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0
// };

// mongoose.connect('mongodb://idiamond8:idiamond88@172.27.0.0:16/Repositorio', options).then(
//   () => {
//     console.log("connected to mongoDB")
//   },
//   (err) => {
//     console.log("err", err);
//   });

//mongoose.connect('mongodb://idiamond8:idiamond88@172.27.0.0:16/Repositorio');
mongoose.connect('mongodb://user:123456@ds235180.mlab.com:35180/repositorio');
var repSchema = new Schema({
  link: { type: String },
  name: { type: String },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

var Repositorio = mongoose.model('Repositorio', repSchema);

async function getRepositorio(repId)  {
  return await Repositorio.findById(repId);
}

async function getRepositorios(nome)  {
    if(!nome) return await Repositorio.find();
    nome += ".*";
    return await Repositorio.find( { 'name': { '$regex': nome, '$options' : 'i' } });
}




async function createRepositorio(repositorioData) {
    try {
      let repositorio = new Repositorio(repositorioData);
      return (await repositorio.save());
    } catch(err) {
      throw err;
    }
}

async function deleteRepositorio(repId)  {
    return await Repositorio.findByIdAndRemove(repId);
}

async function updateRepositorio(repId, repData){
    return await Repositorio.findByIdAndUpdate(repId,repData);
}



exports.getRepositorio = getRepositorio;
exports.getRepositorios = getRepositorios;
exports.createRepositorio = createRepositorio;
exports.deleteRepositorio = deleteRepositorio;
exports.updateRepositorio = updateRepositorio;