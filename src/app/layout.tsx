import "./globals.css"

import { SiteHeader } from "@icco/react-common/SiteHeader"
import { ThemeProvider } from "@icco/react-common/ThemeProvider"
import { WebVitals } from "@icco/react-common/WebVitals"
import type { Metadata, Viewport } from "next"
import { Roboto_Mono } from "next/font/google"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://life.natwelch.com"),
  title: "Nat's Lifeline",
  description: "A changelog of the life of Nat Welch",
  openGraph: {
    title: "Nat's Lifeline",
    description: "A changelog of the life of Nat Welch",
    url: "https://life.natwelch.com",
    siteName: "Nat's Lifeline",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nat's Lifeline",
    description: "A changelog of the life of Nat Welch",
  },
}

export const viewport: Viewport = {
  viewportFit: "cover",
  initialScale: 1,
  width: "device-width",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={robotoMono.variable} suppressHydrationWarning>
      <body className="font-mono">
        <ThemeProvider defaultTheme="system" enableSystem>
          <SiteHeader />
          <WebVitals analyticsPath="/analytics/lifeline" />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
