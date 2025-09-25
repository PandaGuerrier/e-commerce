import { Link } from '@inertiajs/react'

import { GalleryVerticalEnd } from 'lucide-react'
import useSettings from '#home/ui/hooks/use_settings'

export function AppLogo() {
  const settings = useSettings()
  return (
    <Link href="/" prefetch className="flex items-center space-x-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-none font-semibold">{settings.name}</span>
      </div>
    </Link>
  )
}
