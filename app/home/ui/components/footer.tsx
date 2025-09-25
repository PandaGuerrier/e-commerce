import useSettings from '#home/ui/hooks/use_settings'

export default function FooterSection() {
  const year = new Date().getFullYear()
  const settings = useSettings()

  return (
    <footer className="bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <p className="mt-8 text-center text-sm/6 md:order-1 md:mt-0">
          &copy; {year} {settings.name}, Inc. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
