import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import stripe from '@vbusatta/adonis-stripe/services/main'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class VerifyStripeWebhookMiddleware {
  /**
   * The URL to redirect to when user is logged-in
   */
  async handle(ctx: HttpContext, next: NextFn) {
    const sig = ctx.request.header('stripe-signature')
    const rawBody = ctx.request.raw()

    if (!sig || !rawBody) {
      ctx.logger.warn('Invalid Stripe webhook request')
      return ctx.response.status(400).send('Invalid webhook request')
    }

    const rawBodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf-8')

    try {
      await stripe.processWebhook(rawBodyBuffer, sig)
    } catch (error) {
      ctx.logger.error(`Webhook signature verification failed: ${error.message}`)
      return ctx.response.status(400).send('Webhook signature is missing')
    }

    return next()
  }
}
