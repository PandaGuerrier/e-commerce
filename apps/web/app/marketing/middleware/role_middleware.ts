import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Role from '#users/enums/role'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class RoleMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = 'home.show'

  async handle({ auth, response }: HttpContext, next: NextFn, role: Role) {
    const user = auth.user

    if (!user) {
      return response.redirect().toRoute(this.redirectTo)
    }

    const userRole = user.roleId

    if (userRole !== role) {
      return response.redirect().toRoute(this.redirectTo)
    }

    return next()
  }
}
