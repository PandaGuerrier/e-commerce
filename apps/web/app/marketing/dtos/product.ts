import { BaseModelDto } from '@adocasts.com/dto/base'
import Product, { ProductStockInterface } from '#marketing/models/product'

export default class ProductDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string
  declare price: number
  declare stripeProductId: string | null
  declare imageUrl: string | null
  declare stock: ProductStockInterface[]
  declare createdAt: string
  declare updatedAt: string

  constructor(product?: Product) {
    super()

    if (!product) return

    this.id = product.id
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.stripeProductId = product.stripeProductId
    this.imageUrl = product.thumbnail && product.thumbnail.url ? product.thumbnail.url : null
    this.stock = product.stock
    this.createdAt = product.createdAt.toISO()!
    this.updatedAt = product.updatedAt ? product.updatedAt.toISO()! : ''
  }
}
