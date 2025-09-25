import React, { useEffect, useState } from 'react'
import { Link, useForm } from '@inertiajs/react'

import { cn } from '#ui/lib/utils'
import { Button } from '#ui/components/button'
import { Input } from '#ui/components/input'
import { Label } from '#ui/components/label'
import useFlashMessage from '#common/ui/hooks/use_flash_message'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { data, setData, errors, post } = useForm({
    email: '',
    password: '',
  })

  const [invalidCreditials, setInvalidCreditials] = useState(false)

  const messages = useFlashMessage('errors')

  useEffect(() => {
    if (messages) {
      setInvalidCreditials(true)
    }
  }, [messages])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    post('/login', {
      onError: (errors) => {
        if ('E_INVALID_CREDENTIALS' in errors) {
          setInvalidCreditials(true)
        }
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Entrez votre adresse e-mail et votre mot de passe pour vous connecter à votre compte.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Adresse Email</Label>
          <div>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(element) => setData('email', element.target.value)}
              placeholder="contact@domain.fr"
              className={`${errors?.email || invalidCreditials ? 'border-red-500' : ''}`}
              required
            />
            <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
              {errors?.email}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div>
            <Input
              id="password"
              type="password"
              value={data.password}
              placeholder={'Entrez votre mot de passe'}
              onChange={(element) => setData('password', element.target.value)}
              className={`${errors?.password || invalidCreditials ? 'border-red-500' : ''}`}
              required
            />
            <p className="text-[0.8rem] font-medium text-destructive col-span-4 col-start-3">
              {errors?.password}
            </p>
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full">
            Connexion
          </Button>
          {invalidCreditials && (
            <p className="text-[0.8rem] text-center font-medium text-destructive col-span-1">
              Mot de passe ou adresse e-mail incorrect
            </p>
          )}
        </div>

      </div>
      <div className="text-center text-sm">
        Pas de compte?{' '}
        <Link href="/sign-up" className="underline underline-offset-4">
          Inscrivez-vous
        </Link>
      </div>
    </form>
  )
}
