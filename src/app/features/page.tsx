import type { Metadata } from "next"
import PageHeader from "@/components/shared/PageHeader"
import CoreFeatures from "@/components/features/CoreFeatures"
import IndividualFeatures from "@/components/features/IndividualFeatures"
import ProfessionalFeatures from "@/components/features/ProfessionalFeatures"
import TechnologySection from "@/components/features/TechnologySection"
import CTASection from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the powerful features of My Legal AI platform",
}

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Powerful Legal AI Features"
        subtitle="Discover how our AI-powered platform can transform your legal experience"
        backgroundImage="/lady-justice-dark-scales.png"
      />
      <CoreFeatures />
      <IndividualFeatures />
      <ProfessionalFeatures />
      <TechnologySection />
      <CTASection
        title="Ready to transform your legal experience?"
        subtitle="Join thousands of individuals and legal professionals already using our platform"
        buttonText="Get Started"
        buttonHref="/signin"
      />
    </>
  )
}

// Enable static generation
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours
