import { DateTime } from 'luxon'
import { afterCreate, afterUpdate, BaseModel, column } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import stripe from '@vbusatta/adonis-stripe/services/main'
import env from '#start/env'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare priceStripeId: string | null | undefined

  @column({
    prepare: (value: any) => {
      return {
        objects: value,
      }
    },
    consume: (value: any) => {
      return value.objects
    }
  })
  declare stock: ProductStockInterface[]

  @column()
  declare stripeProductId: string | null

  @column()
  declare active: boolean

  @attachment({ preComputeUrl: false })
  declare thumbnail: Attachment

  @attachment({ preComputeUrl: false })
  declare images: Attachment[]

  @column()
  declare thumbnailUrl: string | null

  @afterCreate()
  public static async createStripe(product: Product) {
    const stripeProduct = await stripe.api.products.create({
      name: product.name,
      description: product.description,
      default_price_data: {
        currency: 'eur',
        unit_amount: product.price,
      },
      active: product.active,
      url: env.get('APP_URL') + '/products/' + product.id,
      shippable: true,
    })

    const stripePrice = await stripe.api.prices.create({
      unit_amount: product.price,
      billing_scheme: 'per_unit',
      active: product.active,
      currency: 'eur',
      product: stripeProduct.id,
    })

    product.stripeProductId = stripeProduct.id
    product.priceStripeId = stripePrice.id
    await product.save()
  }

  @afterUpdate()
  public static async updateStripe(product: Product) {
    if (product.$dirty.name || product.$dirty.description || product.$dirty.price || product.$dirty.active) {
      await stripe.api.products.update(product.stripeProductId!, {
        name: product.name,
        description: product.description,
        active: product.active,
      })
    }
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

export interface ProductStockInterface {
  stock: number,
  size: string,
}
