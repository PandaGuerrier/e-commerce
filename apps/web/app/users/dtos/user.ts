import { BaseModelDto } from '@adocasts.com/dto/base'

import User from '#users/models/user'
import Cart from '#marketing/models/cart'

export default class UserDto extends BaseModelDto {
  declare id: number
  declare roleId: number
  declare fullName: string | null
  declare address: string | null
  declare city: string | null
  declare state: string | null
  declare zip: string | null
  declare country: string | null
  declare role: string | null
  declare email: string
  declare avatarUrl: string | null
  declare createdAt: string
  declare updatedAt: string
  declare cart: Cart

  constructor(user?: User) {
    super()

    if (!user) return

    this.id = user.id
    this.roleId = user.roleId
    this.role = user.role?.name
    this.fullName = user.fullName
    this.email = user.email
    this.address = user.address
    this.city = user.city
    this.state = user.state
    this.zip = user.zip
    this.country = user.country
    this.avatarUrl = user.avatar && user.avatar.url ? user.avatar.url : user.avatarUrl
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt ? user.updatedAt.toISO()! : ''
    this.cart = user.cart
  }
}
