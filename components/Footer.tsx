import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">
              {t.footer.platform.title}
            </h3>
            <ul className="space-y-2">
              {t.footer.platform.links.map((link:string, index:number) => (
                <li key={index}>
                  <Link href={`/${link.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">
              {t.footer.support.title}
            </h3>
            <ul className="space-y-2">
              {t.footer.support.links.map((link:string, index:number) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">
              {t.footer.legal.title}
            </h3>
            <ul className="space-y-2">
              {t.footer.legal.links.map((link:string, index:number) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">
              {t.footer.company.title}
            </h3>
            <ul className="space-y-2">
              {t.footer.company.links.map((link:string, index:number) => (
                <li key={index}>
                  <Link href={`/${link.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm text-center">{t.footer.copyright}</p>
          <p className="text-gray-500 text-sm text-center mt-2">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
