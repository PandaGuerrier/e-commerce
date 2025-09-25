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

const ProductsController = () => import('#marketing/controllers/products_controller')
const WebhookController = () => import('#marketing/controllers/webhook_controller')
const CartController = () => import('#marketing/controllers/carts_controller')
const OrdersController = () => import('#marketing/controllers/orders_controller')

router.group(() => {
  router.post('/webhook', [WebhookController]).middleware(middleware.verifyStripeWebhook())
}).prefix('/stripe')

router.group(() => {
  router.put('/add', [CartController, 'addItem'])
  router.delete('/remove/:productId', [CartController, 'removeItem'])
  router.get('/', [CartController, 'show']).as('cart.show')
  router.get('/reset', [CartController, 'clearCart'])
}).prefix('/cart').middleware(middleware.auth())

router.group(() => {
  router.get('/ship', [OrdersController, 'ship'])
  router.post('/checkout', [OrdersController, 'checkout'])
  router.get('/success', [OrdersController, 'success'])
  router.get('/cancel', [OrdersController, 'cancel'])
}).prefix('/order').middleware(middleware.auth())

router.group(() => {
  router.get('/:id', [ProductsController, 'show']).as('product.show')
}).prefix('/products')
