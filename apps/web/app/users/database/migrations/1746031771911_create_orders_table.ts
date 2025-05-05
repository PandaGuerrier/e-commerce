import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('stripe_checkout_id').nullable()
      table.json('items').nullable()
      table.json('taxes').nullable()
      table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending')
      table.enum('shipping_status', ['pending', 'shipped', 'delivered', 'returned']).defaultTo('pending')
      table.json('shipping_data').nullable()
      table.string('shipping_tracking_id').nullable()
      table.enum('shipping_method', ['locker', 'home']).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
