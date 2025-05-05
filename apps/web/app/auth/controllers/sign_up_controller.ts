import { HttpContext } from '@adonisjs/core/http'
import { afterAuthRedirectRoute } from '#config/auth'

import User from '#users/models/user'

import { signUpValidator } from '#auth/validators'
import { VerifyInformationUser } from '#common/utils/verifiy_information_user'

export default class SignUpController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/sign_up')
  }

  async handle({ auth, request, response }: HttpContext) {
    console.log('request', request.all())
    const { email, password } = await request.validateUsing(signUpValidator)

    const user = await User.create({ email, password })

    await auth.use('web').login(user)

    const verifyUser = VerifyInformationUser.verify(user)

    if (verifyUser.redirect) {
      return response.redirect().toRoute(verifyUser.route)
    }

    return response.redirect().toRoute(afterAuthRedirectRoute)
  }
}
