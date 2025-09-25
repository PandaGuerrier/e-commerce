import AuthLayout from '#auth/ui/components/layout'
import { AddressForm } from '#auth/ui/components/address_form'

type AddressType = {
  address: string
  city: string
  state: string
  zip: string
  complement: string
  country: string
}

export default function FullNamePage({ informations }: { informations: AddressType }) {
  return (
    <AuthLayout center>
      <AddressForm informations={informations} />
    </AuthLayout>
  )
}
