import stripe from '@vbusatta/adonis-stripe/services/main'
import User from '#users/models/user'
import mail from '@adonisjs/mail/services/main'
import ValidatePurchaseNotification from '#marketing/mails/purchase_validate_notification'


console.log('Stripe event listener initialized')

stripe.api.on('response', async (event) => {
  console.log('Stripe event received:', event)
})

stripe.onEvent('checkout.session.completed', async (event) => {
  const { data } = event
  const { object } = data as any

  if (object) {
    const { userId } = object.metadata

    const user = await User.find(userId)
    if (!user) {
      return
    }

    const order = await user.related('orders').query().where('stripe_checkout_id', object.id).first()

    if (!order) {
      return
    }

    order.status = 'completed'

    const cart = await user.related('cart').query().first()
    if (cart) {
      cart.items = { objects: [] }
      await cart.save()
    }
    console.log('Order completed:', order.id)
    // send email to user

    const email = await mail.send(new ValidatePurchaseNotification(user, order))
    console.log('Email sent:', email)
  }
})



