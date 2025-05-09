import type { Metadata } from "next"
import PageHeader from "@/components/shared/PageHeader"
import PricingTables from "@/components/pricing/PricingTables"
import FAQSection from "@/components/pricing/FAQSection"
import CTASection from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore My Legal AI pricing plans and choose the right option for your needs",
}

export default function PricingPage() {
  return (
    <>
      <PageHeader title="Simple, Transparent Pricing" subtitle="Choose the plan that's right for you" />
      <PricingTables />
      <FAQSection />
      <CTASection
        title="Ready to get started?"
        subtitle="Choose the plan that's right for you and start transforming your legal experience today"
        buttonText="Sign Up Now"
        buttonHref="/signin"
      />
    </>
  )
}

// Enable static generation
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours
