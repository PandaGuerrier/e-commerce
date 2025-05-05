import { useEffect, useState } from 'react'
import { Stepper } from '@workspace/ui/components/stepper'
import { Button } from '@workspace/ui/components/button'
import { Toaster } from '@workspace/ui/components/sonner'
import { AddressShipForm } from '#marketing/ui/components/address_ship'
import { LockerShipForm } from '#marketing/ui/components/locker_ship'
import { useForm } from '@inertiajs/react'
import Navbar from '#home/ui/components/navbar'

const steps = [
  {
    title: '1 - Informations de livraison',
    description: "Qu'elle type de livraison souhaitez vous ?",
    buttons: false,
  },
  { title: '2 - Adresse ou Locker', description: 'Où souhaitez vous être livré ?', buttons: true },
  { title: '3 - Vérification', description: 'Vérifier vos informations', buttons: true },
]

const shippingMethods = [
  { name: 'Locker', description: 'Livraison dans un point relais.', slug: 'locker', price: 4.25 },
  {
    name: 'Maison',
    description: 'Livraison à domicile. Veuillez entrer votre adresse ci-dessous:',
    slug: 'home',
    price: 8.55,
  },
]

export default function ShipPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [shippingMethod, setShippingMethod] = useState<(typeof shippingMethods)[number] | null>(null)
  const { data, setData, post } = useForm({
    shippingMethod: shippingMethod?.slug || 'home',
    address: null,
    state: null,
    city: null,
    zip: null,
    complement: null,
    country: null,

    locker: null,
  })

  const handleFinish = () => {
    setData('shippingMethod', shippingMethod?.slug || 'home')
    post('/order/checkout')
  }

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }



  useEffect(() => {
    console.log('Shipping method changed:', shippingMethod)
    console.log('Data:', data)
  }, [])

  return (
    <div className="flex-1 mx-auto max-w-7xl px-4">
      <Navbar />
      <Toaster />
      <div className={'pt-16 min-h-screen'}>
        <h1 className="text-2xl font-bold mb-8 text-center">Livraison</h1>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          finishHandler={handleFinish}
        >
          <div className="p-4 rounded-md w-full justify-center items-center">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">
              Où souhaitez-vous être livré ?
            </h2>
            <div className={'flex space-x-5 w-full justify-center'}>
              <Button
                variant={shippingMethod?.slug == 'locker' ? 'default' : 'outline'}
                className={'p-20'}
                onClick={() => {
                  setShippingMethod(shippingMethods[0])
                  handleNext()
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">Point relais</h3>
                  <p className={'text-gray-400 text-xs'}>+{shippingMethods[0].price}€</p>
                </div>
              </Button>
              <Button
                variant={shippingMethod?.slug == 'home' ? 'default' : 'outline'}
                className={'p-20'}
                onClick={() => {
                  setShippingMethod(shippingMethods[1])
                  handleNext()
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">Domicile</h3>
                  <p className={'text-gray-400 text-xs'}>+{shippingMethods[1].price}€</p>
                </div>
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold mb-2">
              Vous avez sélectionné: {shippingMethod?.name}
            </h2>
            <p>{shippingMethod?.description}</p>
            <div className="mt-4">
              {shippingMethod?.slug === 'locker' ? (
                <LockerShipForm data={data} setData={setData} />
              ) : (
                <AddressShipForm data={data} setData={setData} />
              )}
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Vérification des informations</h2>
            <p>Veuillez vérifier les informations que vous avez fournies :</p>
            <div className="mt-4 grid gap-4">
              <div className="border p-3 rounded bg-white">
                <p>
                  <strong>Méthode de livraison :</strong> {shippingMethod?.name}
                </p>
                {shippingMethod?.slug === 'home' && (
                  <>
                    <p>
                      <strong>Adresse :</strong> {data.address ? data.address : 'N/A'}
                    </p>
                    <p>
                      <strong>Complément :</strong> {data.complement || 'N/A'}
                    </p>
                    <p>
                      <strong>Ville :</strong> {data.city}
                    </p>
                    <p>
                      <strong>Code postal :</strong> {data.zip}
                    </p>
                    <p>
                      <strong>Pays :</strong> {data.country}
                    </p>
                  </>
                )}
                {shippingMethod?.slug === 'locker' && (
                  <>
                    <p>
                      <strong>Point relais :</strong> {data.locker}
                    </p>
                    <p>
                      <strong>Adresse :</strong> {data.address}
                    </p>
                    <p>
                      <strong>Ville :</strong> {data.city}
                    </p>
                    <p>
                      <strong>Code postal :</strong> {data.zip}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Stepper>
      </div>
    </div>
  )
}
