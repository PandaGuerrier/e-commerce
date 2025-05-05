import React from 'react'
import { Link, useForm } from '@inertiajs/react'

import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { usePlacesWidget } from 'react-google-autocomplete'

type AddressType = {
  address: string
  city: string
  state: string
  zip: string
  complement: string
  country: string
}

interface AddressFormProps {
  informations: AddressType
  className?: string
}

export function AddressForm({ informations, className, ...props }: AddressFormProps) {
  const { data, setData, errors, post } = useForm({
    address: informations.address || '',
    state: informations.state || '',
    city: informations.city || '',
    zip: informations.zip || '',
    country: informations.country || '',
    complement: informations.complement || '',
  })

  const [valid, setValid] = React.useState(false)

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyAvcm_8dz59FxZXuOtxH8JNk8Ojg0uX79o',
    onPlaceSelected: (place) => {
      console.log('place', place)

      setData('state', place.address_components[2].long_name)
      setData('city', place.address_components[0].long_name)
      setData('zip', place.address_components[4].long_name)
      setData('country', place.address_components[3].long_name)

      setValid(true)
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    post('/complete/address', {
      onSuccess: () => {

      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Et pour la livraison ?</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Entrez votre adresse ci-dessous pour compléter votre inscription.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Ville</Label>
          <div>
            <Input
              id=""
              type="text"
              ref={ref}
              placeholder="Paris"
              className={`${errors?.address ? 'border-red-500' : ''}`}
              required
            />

            <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
              {errors?.address}
            </p>
          </div>
        </div>
        {valid && (
          <div className={'space-y-4'}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Adresse</Label>
                <div>
                  <Input
                    id="complement"
                    type="text"
                    value={data.address}
                    onChange={(element) => setData('address', element.target.value)}
                    placeholder="85 rue de la République"
                    className={`${errors?.address ? 'border-red-500' : ''}`}
                    required
                  />
                  <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
                    {errors?.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Complément d'adresse</Label>
                <div>
                  <Input
                    id="complement"
                    type="text"
                    value={data.complement}
                    onChange={(element) => setData('complement', element.target.value)}
                    placeholder="Lotissement, appartement, etc."
                    className={`${errors?.complement ? 'border-red-500' : ''}`}
                  />
                  <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
                    {errors?.complement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={'w-full'}>
          <Button type="submit" className="w-full" disabled={!valid}>
            Continuer
          </Button>
          <Link
            href="/complete/address/skip"
            className="text-sm text-muted-foreground text-center w-full"
          >
            Passer cette étape
          </Link>
        </div>
      </div>
    </form>
  )
}
