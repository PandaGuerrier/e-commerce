import React from 'react'
import { Link, useForm } from '@inertiajs/react'

import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'

export function RegistrationForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { data, setData, errors, post } = useForm({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    post('/sign-up')
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Création de votre compte</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Créez un compte pour profiter de toutes les fonctionnalités de notre application.
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
              onChange={(e) => setData('email', e.target.value)}
              placeholder="contact@domain.fr"
              className={`${errors?.email ? 'border-red-500' : ''}`}
              required
            />
            <p className="text-[0.8rem] font-medium text-destructive">{errors?.email}</p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Entrez votre mot de passe"
              className={`${errors?.password ? 'border-red-500' : ''}`}
              required
            />
            <p className="text-[0.8rem] font-medium text-destructive">{errors?.password}</p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="passwordConfirmation">Confirmation du mot de passe</Label>
          <div>
            <Input
              id="passwordConfirmation"
              type="password"
              value={data.passwordConfirmation}
              onChange={(e) => setData('passwordConfirmation', e.target.value)}
              placeholder="Répétez votre mot de passe"
              required
            />
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors?.passwordConfirmation}
            </p>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Créer un compte
        </Button>
      </div>
      <div className="text-center text-sm">
        Déjà un compte ?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Se connecter
        </Link>
      </div>
    </form>
  )
}
