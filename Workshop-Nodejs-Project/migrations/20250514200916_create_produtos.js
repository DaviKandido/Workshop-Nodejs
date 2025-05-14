/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('produtos', function(table) {
    table.increments('id').primary();              // ID autoincremento
    table.string('descricao').notNullable();       // Descrição do produto
    table.string('marca').notNullable();           // Marca do produto
    table.decimal('valor', 10, 2).notNullable();   // Valor com 2 casas decimais
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};

