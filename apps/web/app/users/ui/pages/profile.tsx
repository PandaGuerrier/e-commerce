import { InferPageProps } from '@adonisjs/inertia/types'

import type ProfileController from '#users/controllers/profile_controller'

import AppLayout from '#common/ui/components/app_layout'
import HeadingSmall from '#common/ui/components/heading_small'
import { ProfileForm } from '#users/ui/components/profile_form'
import SettingsLayout from '#users/ui/components/settings_layout'

export default function ProfilePage({ profile }: InferPageProps<ProfileController, 'show'>) {
  const currentPath = '/settings/profile'

  return (
    <AppLayout breadcrumbs={[{ label: 'Utilisateur' }]}>
      <SettingsLayout currentPath={currentPath}>
        <div className="space-y-6">
          <HeadingSmall
            title="Modifier le profil"
            description="Modifier votre profil et vos informations personnelles."
          />
          <ProfileForm user={profile} />
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
