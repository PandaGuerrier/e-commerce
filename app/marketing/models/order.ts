import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#users/models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare stripeCheckoutId: string | null

  @column()
  declare userId: number

  @column()
  declare status: 'pending' | 'completed' | 'failed'

  @column()
  declare shippingStatus: 'pending' | 'shipped' | 'delivered' | 'returned'

  @column()
  declare shippingData: {
    address: string | null
    state: string | null
    city: string | null
    zip: string | null
    complement: string | null
    country: string | null

    locker: string | null
  }

  @column()
  declare shippingTrackingId: string | null

  @column()
  declare shippingMethod: 'locker' | 'home'

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare items: {
    objects: OrderItem[]
  }

  @column()
  declare taxes: number

  getTotalPrice() {
    return this.items.objects.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

export interface OrderItem {
  productId: number
  quantity: number
  size: string
  price: number
  stripePriceId: string
}
