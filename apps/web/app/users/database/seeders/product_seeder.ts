import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#marketing/models/product'

export default class ProductSeeder extends BaseSeeder {
  async run() {

    await Product.createMany([
      {
        name: 'Product 1',
        description: 'Description for product 1',
        price: 850,
        stock: 10,
        active: true,
      },
      {
        name: 'Product 2',
        description: 'Description for product 2',
        price: 200,
        stock: 20,
        active: true,
      },
    ])
  }
}
