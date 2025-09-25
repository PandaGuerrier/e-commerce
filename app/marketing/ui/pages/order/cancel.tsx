import HeaderSection from '#home/ui/components/navbar'
import { Toaster } from '#ui/components/sonner'
import { Link } from '@inertiajs/react'

export default function CancelPage() {
  return (
    <div className="flex-1 mx-auto max-w-7xl px-4">
      <HeaderSection />
      <Toaster />
      <div className={'pt-16 min-h-screen'}>
        <h1 className="text-2xl font-bold mb-8 text-center">Oups...</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Votre avez annulé votre commande.
        </p>

        <p className="text-lg text-gray-700 mb-4 text-center">
          Vous pouvez revenir à la page d'accueil pour explorer nos autres produits, ou repayer votre panier.
        </p>

        <div className={"w-full flex justify-center"}>
          <Link href={'/'} className="text-blue-500 hover:underline">
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
