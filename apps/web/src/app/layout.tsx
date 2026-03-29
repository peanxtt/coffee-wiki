import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Global Grind & Whisk | Coffee & Matcha Encyclopedia',
    template: '%s | Global Grind & Whisk',
  },
  description:
    'A comprehensive encyclopedia exploring coffee and matcha origins, brewing methods, and cultural traditions from around the world.',
  keywords: ['coffee', 'matcha', 'encyclopedia', 'brewing', 'origins', 'tea'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-background-light dark:bg-background-dark text-text-main dark:text-cream antialiased">
        {children}
      </body>
    </html>
  )
}
