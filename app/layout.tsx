import type { Metadata, Viewport } from 'next'
import { Rajdhani, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'J. P. Castilla // DINAUT_SYS_v4.0',
  description:
    'Juan Pablo Castilla Yturbe — Industry 4.0 & Digital Solutions Specialist at DINAUT. Architecting IIoT, Computer Vision, Advanced Analytics, and Cloud Monitoring ecosystems for heavy industry.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${jetbrainsMono.variable} light bg-background`}
    >
      <body className="font-sans antialiased hud-scanlines">
        {children}
        {process.env.NODE_ENV === 'production'}
      </body>
    </html>
  )
}
