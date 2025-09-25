import HeaderSection from '#home/ui/components/navbar'
import { Toaster } from '#ui/components/sonner'
import { Link } from '@inertiajs/react'

export default function SuccessPage() {
  return (
    <div className="flex-1 mx-auto max-w-7xl px-4">
      <HeaderSection />
      <Toaster />
      <div className={'pt-16 min-h-screen'}>
        <h1 className="text-2xl font-bold mb-8 text-center">Merci pour votre achat !</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Votre commande a été traitée avec succès. Vous recevrez un e-mail de confirmation sous peu.
        </p>

        <p className="text-lg text-gray-700 mb-4 text-center">
          Si vous avez des questions, n'hésitez pas à nous contacter.
        </p>

        <p className="text-lg text-gray-700 mb-4 text-center">
          Nous vous remercions de votre confiance et espérons vous revoir bientôt !
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
