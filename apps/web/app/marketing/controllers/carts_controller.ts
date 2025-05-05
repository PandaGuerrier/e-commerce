import type { HttpContext } from '@adonisjs/core/http'
import { createAddItemCartValidator } from '#marketing/validators'
import Product from '#marketing/models/product'
import ProductDto from '#marketing/dtos/product'

export default class CartsController {
  /**
   * Show the cart page.
   */
  async show({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const cart = await user.related('cart').query().firstOrFail()
    const cartItems = await Promise.all(
      cart.items.objects.map(async (item) => {
        const product = await Product.findOrFail(item.productId)
        const dto = new ProductDto(product)
        return {
          ...item,
          dto,
        }
      })
    )

    console.log(cartItems)

    return inertia.render('marketing/carts/show', {
      cart: cart,
      products: cartItems.map((item) => item.dto),
    })
  }

  async addItem({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createAddItemCartValidator)
    const user = auth.user!

    const cart = await user.related('cart').query().firstOrFail()

    // check if the item already exists in the cart
    const existingItem = cart.items.objects.find(item => item.productId === data.productId)

    if (existingItem) {
      existingItem.quantity += data.quantity
    } else {
      cart.items.objects.push({
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
      })
    }

    await cart.save()

    return response.redirect().toRoute('product.show', [data.productId])
  }

  async removeItem({ request, response, auth }: HttpContext) {
    const { productId } = request.params()

    const user = auth.user!

    const cart = await user.related('cart').query().firstOrFail()

    // check if the item already exists in the cart
    const existingItemIndex = cart.items.objects.findIndex(item => item.productId === productId)

    if (existingItemIndex !== -1) {
      cart.items.objects.splice(existingItemIndex, 1)
      await cart.save()
    }

    return response.redirect().toRoute('cart.show')
  }

  async clearCart({ response, auth }: HttpContext) {
    const user = auth.user!

    const cart = await user.related('cart').query().firstOrFail()

    cart.items.objects = []

    await cart.save()

    return response.redirect().toRoute('cart.show')
  }


}
