import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { OrderItem } from '#marketing/models/order'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare items: {
    objects: OrderItem[]
  }

  getTotalPrice() {
    return this.items.objects.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
