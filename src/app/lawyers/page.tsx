import type { Metadata } from "next"
import PageHeader from "@/components/shared/PageHeader"
import LawyerFeatures from "@/components/lawyers/LawyerFeatures"
import HowItWorks from "@/components/lawyers/HowItWorks"
import PracticeAreas from "@/components/lawyers/PracticeAreas"
import Testimonials from "@/components/lawyers/Testimonials"
import CTASection from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "For Lawyers",
  description: "AI-powered tools for legal professionals",
}

export default function LawyersPage() {
  return (
    <>
      <PageHeader
        title="Legal AI for Professionals"
        subtitle="Transform your practice with AI-powered tools and insights"
      />
      <LawyerFeatures />
      <HowItWorks />
      <PracticeAreas />
      <Testimonials />
      <CTASection
        title="Ready to transform your legal practice?"
        subtitle="Join thousands of legal professionals already using our platform to enhance their practice"
        buttonText="Join Now"
        buttonHref="/signin?role=professional"
      />
    </>
  )
}

// Enable static generation
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours
