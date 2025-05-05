import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Biohazard, LogOut, MenuIcon, Settings, ShoppingCart } from 'lucide-react'
import { NavUser, NavUserOptionsGroup } from '#common/ui/components/nav_user'
import useUser from '#auth/ui/hooks/use_user'
import useSettings from '#home/ui/hooks/use_settings'


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const user = useUser()
  const settings = useSettings()

  const navUser: NavUserOptionsGroup[] = [
    [
      {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
      },
    ],
    [
      {
        title: 'Log out',
        url: '/logout',
        icon: LogOut,
      },
    ],
  ]

  // todo faire le truc pour les user
  return (
    <nav className="sticky -top-3 pt-5 pb-2 bg-background text-foreground z-50">
      <div className="grid w-full grid-cols-2 md:grid-cols-3 items-center">
        <div
          className={`absolute top-0 left-0 w-full h-screen backdrop-blur-lg bg-background/80 z-40 flex flex-col items-center gap-4 py-16 transition-all duration-500 ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } md:hidden`}
        >
          <div className="flex flex-col w-full pt-8 gap-1 -mx-3">
            <Link
              className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-blue-200 bg-blue-100"
              href="/#features"
            >
              ✨ Nos produits ✨
            </Link>
            <Link
              className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
              href="/#features"
            >
              Nous contacter
            </Link>

            <Link
              className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
              href="/#features"
            >
              Foire aux questions
            </Link>
            <Link
              className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
              href="/cart"
            >
              Mon panier
            </Link>
            {user ? (
              <NavUser user={user} options={navUser} />
            ) : (
              <Link
                className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
                href="/login"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2.5 relative z-50">
          <Biohazard className="h-6 w-6 mr-2" />
          <span className="font-semibold">{settings.name}</span>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-8">
          <Link
            className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
            href="/#features"
          >
            FAQ
          </Link>
          <Link
            className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-blue-200 bg-blue-100"
            href="/#features"
          >
            ✨ Nos produits ✨
          </Link>
          <Link
            className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
            href="/#features"
          >
            Contact
          </Link>
        </div>

        <div className="flex justify-end relative space-x-4 z-50">
          <Link className="hidden md:inline-flex items-center gap-2.5 relative z-50" href="/cart">
            <ShoppingCart size={24} />
          </Link>
          {user ? (
            <NavUser user={user} options={navUser} />
          ) : (
            <Link
              className="w-auto rounded-xl font-medium transition-all duration-300 md:font-semibold md:-mx-3 md:inline-flex md:items-center md:justify-center px-3 py-2 md:text-sm hover:bg-muted"
              href="/login"
            >
              Connexion
            </Link>
          )}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center rounded-xl px-2 py-2 transition-all duration-300 hover:bg-muted md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  )
}
