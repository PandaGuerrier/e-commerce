import type { HttpContext } from '@adonisjs/core/http'

export default class WebhookController {
  async handle({ response }: HttpContext) {
    return response.ok({ received: true })
  }
}
