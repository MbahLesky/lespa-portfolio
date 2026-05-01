import Image from "next/image"
import { siteContent } from "@/content/content"
import { assets } from "@/lib/assets"

export function Footer() {
  return (
    <footer className="theme-dark relative overflow-hidden bg-gradient-dark py-12 text-text-primary">
      <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-50" />
      <div className="container relative z-10 flex max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Image
          src={assets.logo.light}
          alt="Portfolio wordmark"
          width={170}
          height={70}
          className="h-10 w-auto"
        />
        <p className="text-caption text-text-secondary">
          {siteContent.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
