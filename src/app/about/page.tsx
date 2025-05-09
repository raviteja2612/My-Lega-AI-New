import type { Metadata } from "next"
import PageHeader from "@/components/shared/PageHeader"
import MissionSection from "@/components/about/MissionSection"
import StorySection from "@/components/about/StorySection"
import WhyChooseUs from "@/components/about/WhyChooseUs"
import TeamSection from "@/components/about/TeamSection"
import CTASection from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about My Legal AI and our mission to make legal help accessible",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About My Legal AI"
        subtitle="Our mission is to make quality legal help accessible to everyone"
      />
      <MissionSection />
      <StorySection />
      <WhyChooseUs />
      <TeamSection />
      <CTASection
        title="Join us in our mission to democratize legal help"
        subtitle="Whether you're seeking legal assistance or a legal professional looking to enhance your practice, we're here to help"
        buttonText="Get Started"
        buttonHref="/signin"
      />
    </>
  )
}

// Enable static generation
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours
