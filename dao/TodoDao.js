
const dbConnection = require("../dbConnection");
const queries = require("../sqlrep/Roles/Insert");

module.exports = class TodoDao {
  async saveEntity(entity) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedTodo = await con.query(
        queries.insert_todo,
        [entity.title, entity.completed]
      );
      await con.query("COMMIT");
      entity.id = savedTodo.insertId;
      return entity;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async updateEntity(entity) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.update_todo, [
        entity.title,
        entity.completed,
        entity.id
      ]);
      await con.query("COMMIT");
      return true;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async deleteEntity(id) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.delete_todo, [id]);
      await con.query("COMMIT");
      return true;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async readEntities() {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let todo = await con.query(queries.read_todo);
      await con.query("COMMIT");
      todo = JSON.parse(JSON.stringify(todo));
      return todo;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
};