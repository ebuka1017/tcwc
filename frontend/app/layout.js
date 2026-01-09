import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
})

export const metadata = {
  title: 'WG Ministries - Christian Ministry',
  description: 'A Christian ministry dedicated to spreading the Gospel and nurturing spiritual growth',
  keywords: ['Christian ministry', 'church', 'sermons', 'devotionals', 'Gospel'],
  authors: [{ name: 'WG Ministries' }],
  openGraph: {
    title: 'WG Ministries',
    description: 'A Christian ministry dedicated to spreading the Gospel and nurturing spiritual growth',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
