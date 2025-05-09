import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  return (
    <div className="relative bg-gray-900 text-white py-16 md:py-24">
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  )
}
