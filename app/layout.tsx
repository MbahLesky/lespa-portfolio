import type { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Structured Digital Systems Portfolio",
  description:
    "A one-page portfolio for design, development, and brand systems.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
