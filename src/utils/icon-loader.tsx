import dynamic from "next/dynamic"
import { Suspense } from "react"

// Create a loading placeholder for icons
const IconPlaceholder = () => <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>

// Dynamic import function for Lucide icons
export function loadIcon(iconName: string) {
  const DynamicIcon = dynamic(() => import("lucide-react").then((mod) => mod[iconName]), {
    loading: () => <IconPlaceholder />,
    ssr: false,
  })

  return (
    <Suspense fallback={<IconPlaceholder />}>
      <DynamicIcon className="h-6 w-6 text-white" />
    </Suspense>
  )
}
