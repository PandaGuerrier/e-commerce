import User from '#users/models/user'

interface Redirection {
  redirect: boolean
  message: string
  route: string
}

export class VerifyInformationUser {
  static verify(user: User): Redirection {
    if (!user.fullName) {
      return {
        redirect: true,
        message: 'Merci de completer votre nom et prenom',
        route: 'profile.complete.fullname',
      }
    }

    if (!user.address && user.preferences.ask_for_address) {
      return {
        redirect: true,
        message: 'Merci de completer votre adresse',
        route: 'profile.complete.address',
      }
    }

    return {
      redirect: false,
      message: '',
      route: '',
    }
  }
}
