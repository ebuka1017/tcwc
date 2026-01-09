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
  title: 'Word of Grace Ministries - A Place Where Dreams Come True',
  description: 'Word of Grace Ministries, founded in 1996 by Rev. Goodwill Adogho. Located in Agbor, Delta State, Nigeria. Raising armies of worshipers, putting smiles on the face of mankind, and making dreams come true.',
  keywords: ['Word of Grace Ministries', 'WG Ministries', 'Rev. Goodwill Adogho', 'church', 'Nigeria', 'Agbor', 'Delta State', 'worship', 'sermons', 'devotionals'],
  authors: [{ name: 'Word of Grace Ministries' }],
  openGraph: {
    title: 'Word of Grace Ministries',
    description: 'A Place Where Dreams Come True - Founded 1996',
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
