const uuidv1 = require('uuid/v1');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var url = require('url');


mongoose.connect('mongodb://localhost/Repositorio');


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