import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'website_settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().defaultTo('Cr3w')
      table.string('description').notNullable().defaultTo('Cr3w - Vêtements et accessoires de mode')
      table.string('seo').notNullable().defaultTo('cr3w, vêtements, accessoires, mode')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
