import HeaderSection from '#home/ui/components/navbar'
import ProductDto from '#marketing/dtos/product'
import { Button } from '@workspace/ui/components/button'
import { Toaster } from '@workspace/ui/components/sonner'
import Cart from '#marketing/models/cart'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { ProductCart } from '#marketing/ui/components/product_cart'

interface CartPageProps {
  cart: Cart
  products: ProductDto[]
}

export default function ProductPage({ cart, products }: CartPageProps) {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = cart.items.objects.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
    setTotal(total)
  }, [cart])


  return (
    <>
      <div className="flex-1 mx-auto max-w-7xl px-4">
        <HeaderSection />
        <Toaster />

        <div className="flex flex-col space-y-12 pt-16 min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className={'w-full flex'}>
              <div className={'flex space-x-4 justify-start w-full'}>
                <h1 className={'text-2xl font-bold'}>Votre panier</h1>
              </div>
              <div className={'flex space-x-4 justify-end items-end w-full'}>
                <Link href={'products'}>
                  <Button className={'cursor-pointer'} variant={'secondary'}>
                    Continuer les achats <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
            <div className={'w-full'}>
              <Table>
                <TableCaption>*: sans les charges comprises de livraison.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead className="text-right">Quantité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.objects.map((item) => {
                    const product = products.find((product) => product.id === item.productId)
                    if (product) {
                      return (
                        <ProductCart product={product} size={item.size} quantity={item.quantity} />
                      )
                    }
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">{total / 100} €*</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <div className={'flex w-full'}>
              <div className={'w-full flex justify-start'}>
                <a className={'cursor-pointer'} href={'/cart/reset'}>
                  <Button variant={'outline'} className={'cursor-pointer'}>
                    Réinitialiser mon panier
                  </Button>
                </a>
              </div>

              <div className={'w-full flex justify-end'}>
                <a className={'cursor-pointer'} href={total <= 0 ? '/' : '/order/ship'}>
                  <Button disabled={total <= 0} className={'cursor-pointer'}>
                    Procéder au paiement
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
