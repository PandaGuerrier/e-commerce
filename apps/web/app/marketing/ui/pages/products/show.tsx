import HeaderSection from '#home/ui/components/navbar'
import ProductDto from '#marketing/dtos/product'
import { Button } from '@workspace/ui/components/button'
import { ClockFading, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { toast } from '@workspace/ui/hooks/use-toast'
import { Toaster } from '@workspace/ui/components/sonner'
import { ProductStockInterface } from '#marketing/models/product'

interface ProductPageProps {
  product: ProductDto
}

export default function ProductPage({ product }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(product.stock[0] as ProductStockInterface)

  const { put, setData } = useForm({
    productId: product.id,
    quantity,
    size: product.stock[0].size,
  })

  function addToCart() {
    if (quantity < 1) {
      toast.error('Erreur', {
        richColors: true,
        description: 'La quantité doit être supérieure à 0.',
      })
      return
    }

    if (quantity > size.stock) {
      toast.error('Erreur', {
        richColors: true,
        description: `La quantité demandée (${quantity}) est supérieure à la quantité en stock (${size.stock}).`,
      })
      return
    }

    console.log('size', size)
    setData('size', size.size)

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
      onError: (e) => {
        console.error('Erreur', {
          e,
        })
        toast.error('Erreur', {
          richColors: true,
          description: "Une erreur est survenue lors de l'ajout au panier.",
        })
      },
    })
  }

  return (
    <>
      <div className="flex-1 mx-auto max-w-7xl px-4">
        <HeaderSection />

        <div className="flex min-h-screen pt-16 space-x-5">
          <div className={''}>
            <img
              src={
                product.imageUrl ??
                'https://images.unsplash.com/photo-1746648177616-eed4cc1a1213?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt={product.name}
              className="max-w-md rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <div className={"mb-5"}>
              <h1 className="text-xl font-bold">{product.name.toUpperCase()}</h1>
              <p className="text-md">€{product.price / 100}</p>
            </div>

            <div>
              <p>Taille:</p>
              <div className={'flex space-x-3'}>
                {product.stock.map((stock) => (
                  <div key={stock.size} className={'flex space-x-4 mt-4 '}>
                    <Button
                      id="size"
                      onClick={() => setSize(stock)}
                      className="border rounded-md p-2"
                      variant={size.size == stock.size ? 'default' : 'outline'}
                    >
                      {stock.size}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className={'w-full space-y-4'}>
              <Toaster />

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 p-2 border rounded-md"
                min={1}
              />
              <div className={'w-full space-y-5'}>
                <Button className={'w-full cursor-pointer'} onClick={addToCart}>
                  <ShoppingCart size={8} /> Ajouter au panier
                </Button>
                <a className={'cursor-pointer'} href={'/stripe/products/checkout/' + product.id}>
                  <Button className={'w-full cursor-pointer'} variant={'outline'}>
                    Acheter maintenant
                  </Button>
                </a>
              </div>
            </div>
            <div className={"px-5 py-4 bg-neutral-200 rounded-md mt-14"}>
              <p className={"flex space-x-4"}>
                <div className={"bg-neutral-300 p-4 rounded-md"}>
                  <ClockFading />
                </div>
                <div className={"items-center w-full"}>
                  <p>
                    Livré le : {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  </p>
                  <p className={"text-xs"}>
                    Livré sous {4} jours en moyenne
                  </p>
                </div>
              </p>
            </div>
            <div>
              <h2 className={"text-lg font-bold mt-5"}>Description</h2>
              <p className={"text-xs text-neutral-500"}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
