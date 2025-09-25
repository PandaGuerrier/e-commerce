import { BaseSchema } from '@adonisjs/lucid/schema'

import Roles from '#users/enums/role'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .notNullable()
        .defaultTo(Roles.USER)
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state').nullable()
      table.string('zip').nullable()
      table.string('country').nullable()
      table.string('complement').nullable()
      table.json('preferences').defaultTo({
        ask_for_address: true,
      })
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').nullable()
      table.string('avatar_url').nullable().defaultTo(null)
      table.json('avatar').nullable()
      table.integer('cart_id').unsigned().references('id').inTable('carts').nullable()


      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
