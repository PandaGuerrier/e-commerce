import type { HttpContext } from '@adonisjs/core/http'
import { createOrderCreateValidator } from '#marketing/validators'
import Product from '#marketing/models/product'
import env from '#start/env'
import PaymentService from '#marketing/services/payment_service'
import { inject } from '@adonisjs/core/container'

@inject()
export default class OrdersController {
  constructor(protected payment: PaymentService) {
  }

  public async ship({ inertia }: HttpContext) {
    return inertia.render('marketing/order/ship')
  }

  public async checkout({ auth, request, inertia }: HttpContext) {
    const data = await request.validateUsing(createOrderCreateValidator)
    const user = auth.user!

    const cart = await user.related('cart').query().firstOrFail()
    const shippingInfo = {
      shippingMethod: data.shippingMethod,
      address: data.address || null,
      state: data.state || null,
      city: data.city || null,
      zip: data.zip || null,
      complement: data.complement || null,
      country: data.country || null,
      locker: data.locker || null
    }

    const products = [] as Product[]


    for (const item of cart.items.objects) {
      const product = await Product.query().where('id', item.productId).firstOrFail()
      for (let i = 0; i < item.quantity; i++) {
        products.push(product)
      }
    }

    const sessionStripe = await this.payment.createCheckoutSession({
      items: products,
      success_url: `${env.get('APP_URL')}/order/success`,
      cancel_url: `${env.get('APP_URL')}/order/cancel`,
      charges: shippingInfo.shippingMethod === 'locker' ? 425 : 855,
      user,
      shippingInfo
    })

    return inertia.location(sessionStripe.url!)
  }

  public async success({ inertia }: HttpContext) {
    return inertia.render('marketing/order/success')
  }

  public async cancel({ inertia }: HttpContext) {
    return inertia.render('marketing/order/cancel')
  }
}
