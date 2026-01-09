export const metadata = {
  title: 'About Us - WG Ministries',
  description: 'Learn about WG Ministries, our mission, vision, and the team dedicated to spreading the Gospel',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About WG Ministries</h1>
          <p className="text-xl text-gray-600">
            A Christian ministry dedicated to spreading the Gospel and nurturing spiritual growth
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To spread the Gospel of Jesus Christ to all nations and to nurture spiritual growth in believers
              through biblical teaching, worship, and fellowship. We are committed to making disciples who will
              transform their communities with God's love.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be a thriving community of faith that impacts the world for Christ, where every member is equipped
              to live out their faith boldly, share the Gospel effectively, and serve others sacrificially.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              WG Ministries was founded over a decade ago with a simple yet profound vision: to create a space where
              people could encounter God, grow in their faith, and be equipped to fulfill their divine purpose.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What started as a small gathering of believers has grown into a vibrant ministry reaching thousands
              across the globe. Through our sermons, daily devotionals, and community programs, we continue to see
              lives transformed by the power of the Gospel.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we remain committed to our founding principles: biblical truth, authentic worship, meaningful
              fellowship, and compassionate service. We believe that the local church is God's primary instrument
              for reaching the world, and we are honored to be part of His redemptive plan.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Biblical Truth',
                description: 'We believe in the authority and sufficiency of Scripture as God\'s revealed Word.',
              },
              {
                title: 'Authentic Worship',
                description: 'We pursue genuine encounters with God through Spirit-filled worship and prayer.',
              },
              {
                title: 'Loving Community',
                description: 'We foster genuine relationships built on love, grace, and mutual encouragement.',
              },
              {
                title: 'Servant Leadership',
                description: 'We lead by example, following Christ\'s model of humble, sacrificial service.',
              },
              {
                title: 'Global Missions',
                description: 'We actively participate in God\'s mission to reach every nation with the Gospel.',
              },
              {
                title: 'Spiritual Growth',
                description: 'We are committed to ongoing discipleship and transformation through the Holy Spirit.',
              },
            ].map((value, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-bold mb-3 text-primary-600">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Pastor William Green', role: 'Senior Pastor', image: 'https://via.placeholder.com/300' },
              { name: 'Sarah Johnson', role: 'Worship Leader', image: 'https://via.placeholder.com/300' },
              { name: 'Elder Mark Thompson', role: 'Youth Pastor', image: 'https://via.placeholder.com/300' },
            ].map((leader, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="aspect-square bg-gray-200" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-primary-600">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
