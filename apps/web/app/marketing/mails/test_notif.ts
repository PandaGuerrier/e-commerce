import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'

export default class TestNotification extends BaseMail {
  from = env.get('EMAIL_FROM')
  subject = env.get('APP_NAME') + ' - Votre achat a été validé !'

  constructor() {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  async prepare() {
    /**
     * Generate a signed URL with the user's email,
     * which can be used to reset the password.
     */

    this.message.to('juleslofficial@gmail.com')
    this.message.htmlView('marketing::emails/test', {
      appName: env.get('APP_NAME'),
    })
  }
}
