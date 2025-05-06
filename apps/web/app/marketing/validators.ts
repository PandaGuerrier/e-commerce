import vine from '@vinejs/vine'

export const createAddItemCartValidator = vine.compile(
  vine.object({
    productId: vine.number().positive(),
    quantity: vine.number().positive(),
    size: vine.string(),
  })
)


export const createOrderCreateValidator = vine.compile(
  vine.object({
    shippingMethod: vine.enum(['home', 'locker']),
    address: vine.string().optional(),
    state: vine.string().optional(),
    city: vine.string().optional(),
    zip: vine.string().optional(),
    complement: vine.string().optional(),
    country: vine.string().optional(),
    locker: vine.string().optional(),
  })
)
