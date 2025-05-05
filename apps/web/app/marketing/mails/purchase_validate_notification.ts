import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'

import User from '#users/models/user'
import Order from '#marketing/models/order'
import Product from '#marketing/models/product'

export default class ValidatePurchaseNotification extends BaseMail {
  from = env.get('EMAIL_FROM')
  subject = env.get('APP_NAME') + ' - Votre achat a été validé !'

  constructor(
    private user: User,
    private order: Order
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  async prepare() {
    /**
     * Generate a signed URL with the user's email,
     * which can be used to reset the password.
     */

    const items = this.order.items.objects.map((async item => ({
      product: await Product.findOrFail(item.productId),
      quantity: item.quantity,
    })))

    this.message.to(this.user.email)
    this.message.htmlView('marketing::emails/validate_purchase', {
      user: this.user,
      order: this.order,
      items: await Promise.all(items),
      appName: env.get('APP_NAME'),
    })
  }
}
