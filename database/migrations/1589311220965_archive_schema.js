"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArchiveSchema extends Schema {
  up() {
    this.create("archives", (table) => {
      table.increments();
      table
        .integer("task_id")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("path").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("archives");
  }
}

module.exports = ArchiveSchema;
