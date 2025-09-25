import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#marketing/models/product'

export default class ProductSeeder extends BaseSeeder {
  async run() {

    await Product.createMany([
      {
        name: 'Product 1',
        description: 'Description for product 1',
        price: 850,
        stock: [
          {
            size: 'S',
            stock: 10,
          },
          {
            size: 'M',
            stock: 5,
          },
        ],
        active: true,
      },
      {
        name: 'Product 2',
        description: 'Description for product 2',
        price: 200,
        stock: [
          {
            size: 'S',
            stock: 20,
          },
          {
            size: 'M',
            stock: 15,
          },
          {
            size: 'L',
            stock: 8,
          }
        ],
        active: true,
      },
    ])
  }
}
