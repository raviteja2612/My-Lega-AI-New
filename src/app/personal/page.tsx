import type { Metadata } from "next"
import PageHeader from "@/components/shared/PageHeader"
import PersonalFeatures from "@/components/personal/PersonalFeatures"
import HowItWorks from "@/components/personal/HowItWorks"
import CaseTypes from "@/components/personal/CaseTypes"
import Testimonials from "@/components/personal/Testimonials"
import CTASection from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "For Individuals",
  description: "Legal AI solutions for individuals",
}

export default function PersonalPage() {
  return (
    <>
      <PageHeader title="Legal AI for Individuals" subtitle="Get the legal help you need, when you need it" />
      <PersonalFeatures />
      <HowItWorks />
      <CaseTypes />
      <Testimonials />
      <CTASection
        title="Ready to get started?"
        subtitle="Join thousands of individuals who have used My Legal AI to navigate their legal challenges"
        buttonText="Get Started"
        buttonHref="/signin?role=consumer"
      />
    </>
  )
}

// Enable static generation
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours
