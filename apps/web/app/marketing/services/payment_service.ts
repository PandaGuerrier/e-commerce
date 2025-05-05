import stripe from '@vbusatta/adonis-stripe/services/main'
import { inject } from '@adonisjs/core'
import Product from '#marketing/models/product'
import User from '#users/models/user'
import { OrderItem } from '#marketing/models/order'

type ShippingInfo = {
  address: string | null
  state: string | null
  city: string | null
  zip: string | null
  complement: string | null
  country: string | null
  locker: string | null
  shippingMethod: 'locker' | 'home'
}

@inject()
export default class PaymentService {
  constructor() {
    console.log('PaymentService initialized')
  }

  async createCheckoutSession({ items, success_url, cancel_url, user, charges, shippingInfo }: {items: Product[], success_url: string, cancel_url: string, charges: number, user: User, shippingInfo: ShippingInfo }) {
    const itemsWithQuantity = this.getItemsWithQuantity(items)
    const order = await user.related('orders').create({
      shippingStatus: 'pending',
      shippingData: {
        address: shippingInfo.address || null,
        state: shippingInfo.state || null,
        city: shippingInfo.city || null,
        zip: shippingInfo.zip || null,
        complement: shippingInfo.complement || null,
        country: shippingInfo.country || null,
        locker: shippingInfo.locker || null,
      },
      shippingMethod: shippingInfo.shippingMethod,
      items: {
        objects: itemsWithQuantity,
      },
      taxes: charges,
      userId: user.id,
    })

    const lineItems = itemsWithQuantity.map((item) => ({
      price: item.stripePriceId!,
      quantity: item.quantity,
    }))

    console.log('lineItems', lineItems)

    const session = await stripe.api.checkout.sessions.create({
      customer_email: user.email,
      mode: 'payment',
      line_items: [
        ...lineItems,
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Charges',
              description: "Charges pour l'envoi du colis. (et services / autres)",
            },
            unit_amount: charges,
          },
          quantity: 1,
        },
      ],
      success_url,
      cancel_url,
      metadata: {
        order_id: order.id.toString(),
        userId: user.id.toString(),
      },
    })

    order.stripeCheckoutId = session.id
    await order.save()

    console.log('session', session)

    return session
  }

  private getItemsWithQuantity(items: Product[]): OrderItem[] {
    const itemMap: Record<number, OrderItem> = {}

    items.forEach((item) => {
      if (itemMap[item.id]) {
        itemMap[item.id].quantity += 1
      } else {
        itemMap[item.id] = {
          productId: item.id,
          quantity: 1,
          stripePriceId: item.priceStripeId!,
          ...item,
        }
      }
    })

    return Object.values(itemMap)
  }
}
