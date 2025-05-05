import { ParcelShopSelector } from '@frontboi/mondial-relay/browser'
import { useState } from 'react'
import { Button } from '@workspace/ui/components/button'

interface LockerProps {
  data: any
  setData: (data: any, ParcelShopID: string) => void
}

export function LockerShipForm({ setData, data }: LockerProps) {
  const [valid, setValid] = useState(false)

  return (
    <div className={'space-y-4'}>
      <div className="grid gap-2">
        <div>
          {
            valid ? (
              <div className={"space-y-4"}>
                <h1 className={"text-xl"}>Point relais sélectionné</h1>
                <div className={'flex flex-col gap-2 p-4 bg-blue-100 rounded-md'}>
                  <p>{data.locker}</p>
                  <p>{data.city}</p>
                  <p>{data.address}</p>
                  <p>{data.complement}</p>
                  <p>{data.zip}</p>
                </div>
                <Button onClick={() => setValid(false)}>
                  Modifier le point relais.
                </Button>
              </div>
            ) : (
              <ParcelShopSelector
                weight={3000} // (in grams) optional, filters parcel shops by package weight
                nbResults={7} // optional (default: 7)
                deliveryMode="24R" // optional (default: "24R)
                brandIdAPI="BDTEST" // optional (default: "BDTEST", replace with your Brand Id API value for production usage)
                defaultCountry="FR" // optional (default: "FR")
                defaultPostcode="59000" // optional (default: "59000")
                allowedCountries="FR,BE" // optional (default: "FR")
                onParcelShopSelected={(lockerId) => {
                  setData('shippingMethod', 'locker')
                  setData('locker', lockerId.ParcelShopID)
                  setData('city', lockerId.Ville)
                  setData('address', lockerId.Adresse1)
                  setData('complement', lockerId.Adresse2)
                  setData('zip', lockerId.CP)

                  setValid(true)
                }} // setter function when a parcel shop is clicked
              />
            )
          }

        </div>
      </div>
    </div>
  )
}
