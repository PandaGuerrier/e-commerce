import { BaseSeeder } from '@adonisjs/lucid/seeders'
import WebsiteSetting from '#home/models/website_setting'

export default class ProductSeeder extends BaseSeeder {
  async run() {

    await WebsiteSetting.create({
      name: 'Cr3w',
      description: 'Cr3w - Vêtements et accessoires de mode',
      seo: 'cr3w, vêtements, accessoires, mode',
    })
  }
}
