import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

import { attachment, attachmentManager } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

import BaseModel from '#common/models/base_model'
import Role from '#users/models/role'

import Roles from '#users/enums/role'
import ResetPasswordToken from '#users/models/reset_password_token'
import encryption from '@adonisjs/core/services/encryption'
import Order from '#marketing/models/order'
import Cart from '#marketing/models/cart'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column({
    prepare: (value) => encryption.encrypt(value),
    consume: (value) => encryption.decrypt(value),
  })
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string | null

  @attachment({ preComputeUrl: false })
  declare avatar: Attachment

  @column()
  declare avatarUrl: string | null

  @column()
  declare cartId: number | null

  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>

  @column()
  declare roleId: number

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => ResetPasswordToken)
  declare resetPasswordTokens: HasMany<typeof ResetPasswordToken>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @column({
    prepare: (value) => encryption.encrypt(value),
    consume: (value) => encryption.decrypt(value),
  })
  declare address: string | null

  @column({
    prepare: (value) => encryption.encrypt(value),
    consume: (value) => encryption.decrypt(value),
  })
  declare city: string | null

  @column()
  declare state: string | null

  @column()
  declare zip: string | null

  @column()
  declare country: string | null

  @column({
    prepare: (value) => encryption.encrypt(value),
    consume: (value) => encryption.decrypt(value),
  })
  declare complement: string | null

  @column()
  declare preferences: {
    ask_for_address: boolean
  }

  @computed()
  get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  static async preComputeUrls(models: User | User[]) {
    if (Array.isArray(models)) {
      await Promise.all(models.map((model) => this.preComputeUrls(model)))
      return
    }

    if (!models.avatar) {
      return
    }

    await attachmentManager.computeUrl(models.avatar)
  }

  @afterCreate()
  static async createCart(user: User) {
    const cart = await Cart.create({ items: { objects: [] } })
    user.cartId = cart.id
    await user.related('cart').associate(cart)
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
