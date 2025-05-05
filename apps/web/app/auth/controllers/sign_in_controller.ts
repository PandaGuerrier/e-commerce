import { HttpContext } from '@adonisjs/core/http'
import { afterAuthRedirectRoute } from '#config/auth'

import User from '#users/models/user'

import { signInValidator } from '#auth/validators'
import { VerifyInformationUser } from '#common/utils/verifiy_information_user'

export default class SignInController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/sign_in')
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(signInValidator)

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      const verifyUser = VerifyInformationUser.verify(user)

      if (verifyUser.redirect) {
        return response.redirect().toRoute(verifyUser.route)
      }
    } catch (error) {
      session.flash('errors', 'The provided username/email or password is incorrect')

      return response.redirect().toRoute('auth.sign_in.show')
    }

    return response.redirect().toRoute(afterAuthRedirectRoute)
  }
}
