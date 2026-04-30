import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const ALLOWED_ACCENTS = ["slate", "emerald", "blue", "violet", "rose", "amber"] as const
const ALLOWED_RADII = ["compact", "default", "comfortable"] as const
const ALLOWED_MOTIONS = ["default", "reduced"] as const
const ALLOWED_SCALES = ["sm", "md", "lg"] as const

function getCookieValue<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T {
  if (value && allowed.includes(value as T)) {
    return value as T
  }

  return fallback
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accent = getCookieValue(cookieStore.get("app-accent")?.value, ALLOWED_ACCENTS, "emerald")
  const radius = getCookieValue(cookieStore.get("app-radius")?.value, ALLOWED_RADII, "default")
  const motion = getCookieValue(cookieStore.get("app-motion")?.value, ALLOWED_MOTIONS, "default")
  const scale = getCookieValue(cookieStore.get("app-scale")?.value, ALLOWED_SCALES, "md")

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
      data-accent={accent}
      data-radius={radius}
      data-motion={motion}
      data-scale={scale}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
