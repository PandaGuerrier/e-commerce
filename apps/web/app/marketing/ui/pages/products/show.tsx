import HeaderSection from '#home/ui/components/navbar'
import ProductDto from '#marketing/dtos/product'
import { Button } from '@workspace/ui/components/button'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { toast } from '@workspace/ui/hooks/use-toast'
import { Toaster } from '@workspace/ui/components/sonner'

interface ProductPageProps {
  product: ProductDto
}

export default function ProductPage({ product }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)

  const { put } = useForm({
    productId: product.id,
    quantity,
    price: product.price,
  })

  function addToCart() {
    if (quantity < 1) {
      toast.error('Erreur', {
        richColors: true,
        description: 'La quantité doit être supérieure à 0.',
      })
      return
    }

    if (quantity > product.stock!) {
      toast.error('Erreur', {
        richColors: true,
        description: `La quantité demandée (${quantity}) est supérieure à la quantité en stock (${product.stock}).`,
      })
      return
    }


    put('/cart/add', {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Produit ajouté au panier', {
          position: 'bottom-right',
          richColors: true,
          action: {
            label: 'Voir le panier',
            onClick: () => {
              window.location.href = '/cart'
            },
          },
          actionButtonStyle: {
            backgroundColor: '#4CAF50',
            color: '#fff',
          },
          description: `${product.name} a été ajouté à votre panier.`,
        })
      },
      onError: () => {
        toast.error('Erreur', {
          richColors: true,
          description: 'Une erreur est survenue lors de l\'ajout au panier.',
        })
      },
    })
  }

  return (
    <>
      <div className="flex-1 mx-auto max-w-7xl px-4">
        <HeaderSection />

        <div className="flex flex-col space-y-12 pt-16 min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="mt-4 text-lg text-gray-600">{product.description}</p>
            <img
              src={product.imageUrl ?? ''}
              alt={product.name}
              className="mt-8 w-full max-w-md rounded-lg shadow-lg"
            />
            <p className="mt-4 text-2xl font-bold">${product.price / 100}</p>

            <div className={'flex space-x-4'}>
              <Toaster />

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 p-2 border rounded-md"
                min={1}
                />
              <Button className={"cursor-pointer"} onClick={addToCart}>
                <ShoppingCart size={8} /> Ajouter au panier
              </Button>
              <a className={"cursor-pointer"} href={'/stripe/products/checkout/' + product.id}>
                <Button className={"cursor-pointer"} variant={'ghost'}>Acheter maintenant</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
