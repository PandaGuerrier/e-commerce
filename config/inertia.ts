import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

import AbilitiesService from '#users/services/abilities_service'
import User from '#users/models/user'
import UserDto from '#users/dtos/user'
import WebsiteSetting from '#home/models/website_setting'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    user: async (ctx) => {
      if (ctx.auth?.user) {
        const user = ctx.auth.user
        await User.preComputeUrls(user)
        await user.related('cart').query()

        return new UserDto(ctx.auth?.user)
      }
    },
    flashMessages: (ctx) => ctx.session?.flashMessages.all(),
    abilities: (ctx) => {
      if (!ctx.auth?.user) {
        return []
      }

      return new AbilitiesService().getAllAbilities(ctx.auth?.user)
    },
    settings: async () => {
      const settings = await WebsiteSetting.query().firstOrFail()

      return {
        name: settings.name,
        description: settings.description,
        seo: settings.seo,
      }
    }
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'app/core/ui/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
