import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('stripe_product_id').nullable()
      table.string('thumbnail_url').nullable()
      table.json('thumbnail').nullable()
      table.json('images').nullable()
      table.string('price').notNullable()
      table.string('price_stripe_id').nullable()
      table.json('stock').nullable()
      table.boolean('active').defaultTo(true).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
