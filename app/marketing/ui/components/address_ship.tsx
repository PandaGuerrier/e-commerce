import { Label } from '#ui/components/label'
import { Input } from '#ui/components/input'
import { useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'

interface AddressProps {
  data: any
  setData: (data: any, addressComponent: any) => void
}

export function AddressShipForm({ setData }: AddressProps) {
  const [valid, setValid] = useState(false)

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyAvcm_8dz59FxZXuOtxH8JNk8Ojg0uX79o',
    onPlaceSelected: (place) => {
      console.log('place', place)

      const getAddressComponent = (type: string) =>
        place.address_components.find((component: { types: string | string[] }) =>
          component.types.includes(type)
        )?.long_name || ''

      setData('state', getAddressComponent('administrative_area_level_1')) // Région
      setData('city', getAddressComponent('locality')) // Ville
      setData('zip', getAddressComponent('postal_code')) // Code postal
      setData('country', getAddressComponent('country')) // Pays

      setValid(true)
    },
  })

  return (
    <div className={'space-y-4'}>
      <div className="grid gap-2">
        <Label htmlFor="email">Ville</Label>
        <div>
          <Input id="" type="text" ref={ref} placeholder="Paris" required />
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
                  onChange={(element) =>
                    setData('address', element.target.value)
                  }
                  placeholder="85 rue de la République"
                  required
                />
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
                  onChange={(element) =>
                    setData('complement', element.target.value)
                  }
                  placeholder="Lotissement, appartement, etc."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
