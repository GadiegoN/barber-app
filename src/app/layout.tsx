import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "./porviders/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barbeshops",
  description: "Barbearias da região",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-bg"
      className="dark overflow-auto [&::-webkit-scrollbar]:hidden"
    >
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <main className="flex min-h-screen flex-col space-y-4">
              <div className="flex-1">{children}</div>
              <Footer />
            </main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
