import type { HttpContext } from '@adonisjs/core/http'
import { completeAddressValidator, completeFullNameValidator } from '#auth/validators'
import { afterAuthRedirectRoute } from '#config/auth'
import { VerifyInformationUser } from '#common/utils/verifiy_information_user'

export default class CompleteProfilesController {
  async showFullName({ inertia }: HttpContext) {
    return inertia.render('auth/full_name')
  }

  async handleFullName({ request, response, auth }: HttpContext) {
    console.log('handleFullName')
    const { firstName, lastName } = await request.validateUsing(completeFullNameValidator)

    const user = auth.user!

    user.fullName = `${firstName} ${lastName}`

    await user.save()

    const verifyUser = VerifyInformationUser.verify(user)

    if (verifyUser.redirect) {
      return response.redirect().toRoute(verifyUser.route)
    }

    return response.redirect().toRoute(afterAuthRedirectRoute)
  }

  async showAddress({ inertia, auth }: HttpContext) {
    const user = auth.user!

    return inertia.render('auth/address', {
      informations: {
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        country: user.country,
        complement: user.complement
      }
    })
  }

  async handleAddress({ request, response, auth }: HttpContext) {
    const { address, city, state, zip, country, complement } = await request.validateUsing(completeAddressValidator)

    const user = auth.user!

    user.address = address
    user.city = city
    user.state = state
    user.zip = zip
    user.country = country
    user.complement = complement || null

    user.preferences.ask_for_address = true


    await user.save()

    const verifyUser = VerifyInformationUser.verify(user)

    if (verifyUser.redirect) {
      return response.redirect().toRoute(verifyUser.route)
    }

    return response.redirect().toRoute(afterAuthRedirectRoute)
  }

  async skipAddress({ response, auth }: HttpContext) {
    const user = auth.user!

    user.preferences.ask_for_address = false

    await user.save()

    return response.redirect().toRoute(afterAuthRedirectRoute)
  }
}
