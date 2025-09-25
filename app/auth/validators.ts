import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase().trim().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(1).confirmed({ confirmationField: 'passwordConfirmation' }),
  })
)

export const completeFullNameValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(255),
    lastName: vine.string().trim().minLength(3).maxLength(255),
  })
)

export const completeAddressValidator = vine.compile(
  vine.object({
    address: vine.string().trim().minLength(3).maxLength(255),
    city: vine.string().trim().minLength(2).maxLength(255),
    state: vine.string().trim().minLength(2).maxLength(255),
    zip: vine.string().trim().minLength(3).maxLength(255),
    country: vine.string().trim().minLength(2).maxLength(255),
    complement: vine.string().trim().maxLength(255).optional(),
  })
)

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase().trim(),
    password: vine.string().minLength(1),
  })
)

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().normalizeEmail({ gmail_remove_dots: false }),
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(1).confirmed({ confirmationField: 'passwordConfirmation' }),
  })
)
