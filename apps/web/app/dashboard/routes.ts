/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import Role from '#users/enums/role'

const DashboardController = () => import('#dashboard/controllers/dashboard_controller')

router.get('/dashboard', [DashboardController]).middleware([middleware.auth(), middleware.verifyProfile(), middleware.role(Role.ADMIN)]).as('dashboard.show')
