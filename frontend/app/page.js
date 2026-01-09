import Hero from '@/components/home/Hero'
import FeaturedSermon from '@/components/home/FeaturedSermon'
import DailyDevotional from '@/components/home/DailyDevotional'
import RecentBlogs from '@/components/home/RecentBlogs'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import AboutPreview from '@/components/home/AboutPreview'

export const metadata = {
  title: 'Home - WG Ministries',
  description: 'Welcome to WG Ministries - A Christian ministry dedicated to spreading the Gospel and nurturing spiritual growth',
}

export default function Home() {
  return (
    <>
      <Hero />
      <DailyDevotional />
      <AboutPreview />
      <FeaturedSermon />
      <RecentBlogs />
      <UpcomingEvents />
    </>
  )
}
