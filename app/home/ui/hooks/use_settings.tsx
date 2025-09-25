import usePageProps from '#common/ui/hooks/use_page_props'

export default function useSettings() {
  const { settings } = usePageProps<{ settings: {
    name: string,
    description: string,
    seo: string
    } }>()


  return settings
}
