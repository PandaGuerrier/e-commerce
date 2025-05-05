import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { VerifyInformationUser } from '#common/utils/verifiy_information_user'

export default class VerifyProfileMiddleware {
  async handle({ response, auth  }: HttpContext, next: NextFn) {
    const user = auth.user!
    const verifyUser = VerifyInformationUser.verify(user)

    if (verifyUser.redirect) {
      return response.redirect().toRoute(verifyUser.route)
    }

    return next()
  }
}
