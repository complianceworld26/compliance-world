import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import IntroVideoSection from '../../components/IntroVideoSection'
import PartnersSection from '../../components/PartnersSection'
import ServicesSection from '../../components/ServicesSection'
import FeaturesSection from '../../components/FeaturesSection'
import HowItWorksSection from '../../components/HowItWorksSection'
import TrustSection from '../../components/TrustSection'
import InsightsSection from '../../components/InsightsSection'
import FaqSection from '../../components/FaqSection'
import CtaSection from '../../components/CtaSection'
import Footer from '../../components/Footer'

const SectionDivider = () => (
  <div className="cw-section-divide-wrap pointer-events-none shrink-0" role="presentation">
    <div className="cw-section-divide-rail" aria-hidden>
      <hr className="cw-section-divide" />
    </div>
  </div>
)

const Home = () => {
  return (
    <>
      <Navbar />
      <div data-appearance="dark" className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <main>
          <HeroSection />
          <SectionDivider />
          <IntroVideoSection />
          <PartnersSection />
          <ServicesSection />
          <SectionDivider />
          <FeaturesSection />
          <SectionDivider />
          <HowItWorksSection />
          <SectionDivider />
          <TrustSection />
          <SectionDivider />
          <InsightsSection />
          <SectionDivider />
          <FaqSection />
          <SectionDivider />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home
