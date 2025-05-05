import HeroSection from '#home/ui/components/hero'
import FeatureSection from '#home/ui/components/feature'
import FooterSection from '#home/ui/components/footer'
import FAQSection from '#home/ui/components/faq'
import Navbar from '#home/ui/components/navbar'

export default function HomePage() {
  return (
    <>
      <div className="flex-1 mx-auto max-w-7xl px-4">
        <Navbar />

        <div className="flex flex-col space-y-12 pt-16 min-h-screen">
          <HeroSection/>
          <div id="features">
            <FeatureSection/>
          </div>
          <div id="faq">
            <FAQSection/>
          </div>
          <FooterSection/>
        </div>
      </div>
    </>
  )
}
