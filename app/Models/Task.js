"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Task extends Model {
  users() {
    return this.belongsTo("App/Models/User");
  }

  archives() {
    return this.hasMany("App/Models/Archive");
  }
}

module.exports = Task;
