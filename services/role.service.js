
var db = require('../dbConnection');
const rolesSqlRep = require("../sqlrep/Roles/All");

var RoleService = {

  selectAll: function(req, res){
    var results = db.query(
      rolesSqlRep.SelectAll.SelectAll,
      function (error, results, fields) {
      
      if (error) {
        console.log(error);
        var apiResult = {};
        res.status(400).json(
        { status: 400,
          message: error.message,
          data: [] });
        return;
      }
      
      var resultJson = JSON.stringify(results);
      resultJson = JSON.parse(resultJson);
      res.status(200).json(
      { status: 200,
        message: "Sucesso",
        data: resultJson });
    });
  },


  insert: function(req, res, entity){
    var results = db.query(
      rolesSqlRep.Insert.Insert,
      [entity.id, entity.nome, entity.descricao, entity.ativo],
      function (error, results, fields) {

      if (error) {
        console.log(error);
        res.status(400).json(
        { status: 400,
          message: error.message,
          data: [] });
        return;
      }
      
      var resultJson = JSON.stringify(results.insertId);
      resultJson = JSON.parse(resultJson);
      res.status(200).json(
      { status: 200,
        message: "Sucesso",
        data: resultJson ? resultJson : entity.id });
    });
  },


  update: function(req, res, entity){
    var results = db.query(
      rolesSqlRep.Update.Update,
      [entity.nome, entity.descricao, entity.ativo, entity.id],
      function (error, results, fields) {

      if (error) {
        console.log(error);
        var apiResult = {};
        res.status(400).json(
        { status: 400,
          message: error.message,
          data: [] });
        return;
      }
      console.log(error);
      console.log(results);
      console.log(fields);
      
      if (!results.affectedRows) {
        console.log(error);
        var apiResult = {};
        res.status(400).json(
        { status: 400,
          message: "Nenhuma linha afetada",
          data: [] });
        return;
      }

      var resultJson = JSON.stringify(results.insertId);
      resultJson = JSON.parse(resultJson);

      res.status(200).json(
      { status: 200,
        message: "Sucesso",
        data: resultJson ? resultJson : entity.id });
    });
  },


  delet: function(req, res, entity){
    var results = db.query(
      rolesSqlRep.Delet.Delet,
      [entity.id],
      function (error, results, fields) {

      if (error) {
        console.log(error);
        var apiResult = {};
        res.status(400).json(
        { status: 400,
          message: error.message,
          data: [] });
        return;
      }
      
      if (!results.affectedRows) {
        console.log(error);
        var apiResult = {};
        res.status(400).json(
        { status: 400,
          message: "Nenhuma linha afetada",
          data: [] });
        return;
      }

      var resultJson = JSON.stringify(results.insertId);
      resultJson = JSON.parse(resultJson);
      res.status(200).json(
      { status: 200,
        message: "Sucesso",
        data: resultJson ? resultJson : entity.id });
    });
  }

}

module.exports = RoleService;
