import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core/container'
import PaymentService from '#marketing/services/payment_service'
import Product from '#marketing/models/product'

@inject()
export default class ProductsController {
  constructor(protected payment: PaymentService) {
  }

  async show({ inertia, params }: HttpContext) {
    const product = await Product.query().where('id', params.id).firstOrFail()
    return inertia.render('marketing/products/show', { product })
  }
}
