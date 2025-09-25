import React from 'react'
import { useForm } from '@inertiajs/react'

import { cn } from '#ui/lib/utils'
import { Button } from '#ui/components/button'
import { Input } from '#ui/components/input'
import { Label } from '#ui/components/label'

export function FullNameForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { data, setData, errors, post } = useForm({
    lastName: '',
    firstName: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    post('/complete/fullname')
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Dites-nous en plus sur vous !</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Entrez votre nom et prénom ci-dessous pour compléter votre inscription.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Prénom</Label>
          <div>
            <Input
              id="firstname"
              type="text"
              value={data.firstName}
              onChange={(element) => setData('firstName', element.target.value)}
              placeholder="Pierre"
              className={`${errors?.firstName ? 'border-red-500' : ''}`}
              required
            />
            <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
              {errors?.firstName}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Nom de famille</Label>
            <div>
              <Input
                id="lastname"
                type="text"
                value={data.lastName}
                onChange={(element) => setData('lastName', element.target.value)}
                placeholder="Jackson"
                className={`${errors?.lastName ? 'border-red-500' : ''}`}
                required
              />
              <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
                {errors?.lastName}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full">
              Continuer
          </Button>
        </div>
      </div>
    </form>
  )
}
