const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const BlogPost = require('./src/models/BlogPost');
const Devotional = require('./src/models/Devotional');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    console.log('Starting database seed...\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Category.deleteMany();
    await BlogPost.deleteMany();
    await Devotional.deleteMany();
    console.log('✓ Existing data cleared\n');

    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@wgministries.org',
      password: 'admin123', // Will be hashed by the model
      role: 'admin'
    });
    console.log('✓ Admin user created');
    console.log(`  Email: admin@wgministries.org`);
    console.log(`  Password: admin123\n`);

    // Create editor user
    console.log('Creating editor user...');
    const editorUser = await User.create({
      name: 'Editor User',
      email: 'editor@wgministries.org',
      password: 'editor123',
      role: 'editor'
    });
    console.log('✓ Editor user created');
    console.log(`  Email: editor@wgministries.org`);
    console.log(`  Password: editor123\n`);

    // Create blog categories
    console.log('Creating blog categories...');
    const blogCategories = await Category.insertMany([
      {
        name: 'Spiritual Growth',
        type: 'blog',
        description: 'Articles about growing in your faith and relationship with God'
      },
      {
        name: 'Theology',
        type: 'blog',
        description: 'Deep theological insights and biblical teaching'
      },
      {
        name: 'Faith',
        type: 'blog',
        description: 'Living out your faith in daily life'
      },
      {
        name: 'Community',
        type: 'blog',
        description: 'Building strong Christian community and fellowship'
      },
      {
        name: 'Ministry',
        type: 'blog',
        description: 'Serving God and others through ministry'
      }
    ]);
    console.log(`✓ ${blogCategories.length} blog categories created\n`);

    // Create devotional categories
    console.log('Creating devotional categories...');
    const devotionalCategories = await Category.insertMany([
      {
        name: 'Daily Wisdom',
        type: 'devotional',
        description: 'Daily wisdom from Scripture'
      },
      {
        name: 'Prayer',
        type: 'devotional',
        description: 'Growing in prayer and communion with God'
      },
      {
        name: 'Faith Building',
        type: 'devotional',
        description: 'Strengthening your faith daily'
      },
      {
        name: 'God\'s Love',
        type: 'devotional',
        description: 'Experiencing God\'s unfailing love'
      }
    ]);
    console.log(`✓ ${devotionalCategories.length} devotional categories created\n`);

    // Create sample blog posts
    console.log('Creating sample blog posts...');
    const blogPosts = await BlogPost.insertMany([
      {
        title: '5 Ways to Strengthen Your Prayer Life',
        content: `Prayer is the foundation of our relationship with God. It's not just about asking for things, but about communion, fellowship, and aligning our hearts with His will. Here are five practical ways to deepen your prayer life and experience more of God's presence.

1. **Set a Consistent Time and Place**
Creating a dedicated prayer time and space helps build the discipline and habit of regular prayer. Whether it's early morning or late evening, consistency is key.

2. **Use Scripture in Your Prayers**
Praying God's Word back to Him is powerful. When you read a Scripture that speaks to you, turn it into a prayer. This ensures your prayers align with God's will.

3. **Keep a Prayer Journal**
Writing down your prayers helps you focus and creates a record of God's faithfulness. Looking back at answered prayers strengthens your faith.

4. **Practice Different Forms of Prayer**
Include adoration, confession, thanksgiving, and supplication (ACTS). Don't just ask for things - worship, confess, and give thanks.

5. **Pray Throughout the Day**
Prayer isn't limited to your dedicated time. Develop a habit of conversational prayer throughout your day, talking to God about everything.

Remember, prayer is a relationship, not a ritual. God desires to hear from you and wants to speak to your heart. As you invest in your prayer life, you'll find your relationship with God deepening in ways you never imagined.`,
        excerpt: 'Prayer is the foundation of our relationship with God. Here are five practical ways to deepen your prayer life and experience more of His presence.',
        author: adminUser._id,
        categories: [blogCategories[0]._id, blogCategories[2]._id],
        status: 'published',
        publishedAt: new Date('2024-01-07'),
        views: 245,
        metaTitle: '5 Ways to Strengthen Your Prayer Life | WG Ministries',
        metaDescription: 'Discover five practical ways to deepen your prayer life and strengthen your relationship with God through consistent, meaningful prayer.'
      },
      {
        title: 'Understanding Biblical Grace',
        content: `Grace is one of the most beautiful and transformative concepts in Christianity, yet it's often misunderstood. Grace isn't just a theological term to study - it's the very foundation of our salvation and our daily walk with Christ.

**What is Grace?**
Grace is God's unmerited favor. It's receiving blessing, forgiveness, and love that we don't deserve and cannot earn. The apostle Paul wrote, "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God" (Ephesians 2:8).

**The Scandal of Grace**
Grace is scandalous because it goes against our natural sense of fairness. We live in a world where you get what you earn. But God's kingdom operates differently. Grace means the worst sinner can receive the same salvation as the most moral person.

**Grace vs. Works**
Many Christians struggle with the balance between grace and works. The Bible is clear: we are saved by grace alone, not by our works. However, genuine faith produces good works as evidence of salvation (James 2:17). We don't work to be saved; we work because we are saved.

**Living in Grace**
Understanding grace should transform how we live:
- It humbles us, knowing we didn't earn salvation
- It motivates us to live for God out of love, not obligation
- It enables us to extend grace to others
- It frees us from guilt and shame

**Amazing Grace**
John Newton, the former slave trader who wrote "Amazing Grace," understood this concept deeply. He recognized that if God's grace could save someone like him, it could save anyone. That same grace is available to you today.

Don't try to earn God's love - you already have it. Don't try to deserve His grace - you never will. Simply receive it, rest in it, and let it transform your life from the inside out.`,
        excerpt: 'Grace is more than just a theological concept - it\'s the very foundation of our salvation and daily walk with Christ. Let\'s explore what the Bible teaches about grace.',
        author: adminUser._id,
        categories: [blogCategories[1]._id, blogCategories[2]._id],
        status: 'published',
        publishedAt: new Date('2024-01-05'),
        views: 312,
        metaTitle: 'Understanding Biblical Grace | WG Ministries',
        metaDescription: 'Explore the transformative power of God\'s grace and how it forms the foundation of our salvation and daily Christian walk.'
      },
      {
        title: 'Walking in Faith During Difficult Times',
        content: `Life is filled with seasons - some beautiful and bright, others dark and difficult. When storms come, our faith is tested. How do we maintain trust in God when circumstances seem overwhelming?

**Acknowledge Your Feelings**
First, it's important to be honest with God about how you feel. The Psalms are filled with raw, honest prayers from people who were hurting. David cried out to God in his pain, and God didn't condemn him for it. You can bring your fears, doubts, and questions to God.

**Remember God's Faithfulness**
When facing difficulty, look back at how God has been faithful in the past. Keep a record of His goodness. Remember the Red Sea moments, the provision in the wilderness, the answers to prayer. God who was faithful then will be faithful now.

**Hold onto God's Promises**
God's Word is filled with promises for those who trust Him:
- "Never will I leave you; never will I forsake you" (Hebrews 13:5)
- "And we know that in all things God works for the good of those who love him" (Romans 8:28)
- "The LORD is close to the brokenhearted" (Psalm 34:18)

**Surround Yourself with Community**
Don't walk through difficulty alone. God designed us to need each other. Share your struggles with trusted believers who can pray with you, encourage you, and remind you of truth when you're struggling to see it.

**Take One Day at a Time**
Jesus said, "Do not worry about tomorrow, for tomorrow will worry about itself" (Matthew 6:34). When facing hardship, focus on trusting God for today. Tomorrow will have its own grace.

**Know This Too Shall Pass**
Every storm eventually ends. Every night gives way to morning. Your current difficulty is not your final destination. Hold on - breakthrough is coming.

Faith doesn't mean you won't face storms. It means you won't face them alone. God is with you, for you, and working all things together for your good.`,
        excerpt: 'When life gets hard, our faith can falter. Learn how to maintain trust in God during life\'s storms and emerge stronger in your faith.',
        author: editorUser._id,
        categories: [blogCategories[2]._id, blogCategories[0]._id],
        status: 'published',
        publishedAt: new Date('2024-01-03'),
        views: 189,
        metaTitle: 'Walking in Faith During Difficult Times | WG Ministries',
        metaDescription: 'Discover practical ways to maintain your faith and trust in God during life\'s most challenging seasons.'
      },
      {
        title: 'The Importance of Community in Faith',
        content: `"Two are better than one... If either of them falls down, one can help the other up" (Ecclesiastes 4:9-10). This ancient wisdom reminds us that we were never meant to walk the Christian journey alone.

**Biblical Foundation**
From the very beginning, God said, "It is not good for the man to be alone" (Genesis 2:18). While this was specifically about marriage, the principle extends to all of life. We are created for community, for relationship, for connection with others.

The early church understood this. Acts 2:42-47 describes believers who "devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer." They met together daily, shared their possessions, and supported one another.

**Why We Need Community**

**1. Accountability**
We all have blind spots and areas where we're vulnerable to temptation. Christian community provides loving accountability that helps us stay on track.

**2. Encouragement**
Life is hard. We all face discouragement, doubt, and difficulty. Community provides encouragement when we're struggling and celebration when we're rejoicing.

**3. Growth**
Iron sharpens iron (Proverbs 27:17). We grow faster and stronger when we're in community with other believers who challenge us, teach us, and help us mature.

**4. Service**
We discover and develop our spiritual gifts in the context of community. Serving others is how we live out our faith practically.

**5. Witness**
Jesus said the world would know we are His disciples by our love for one another (John 13:35). Our unity is a powerful testimony.

**Building Real Community**
Real community goes beyond Sunday morning attendance. It involves:
- Vulnerability and authenticity
- Regular, intentional connection
- Mutual support and service
- Shared mission and purpose

**Overcoming Barriers**
Many people struggle with community due to past hurt, fear of rejection, or simple busyness. But the benefits far outweigh the risks. Take the step - join a small group, serve on a team, or simply invite someone to coffee.

You were designed for community. Don't try to do life alone.`,
        excerpt: 'We were never meant to walk this Christian journey alone. Discover the biblical basis for community and fellowship in the life of a believer.',
        author: adminUser._id,
        categories: [blogCategories[3]._id, blogCategories[0]._id],
        status: 'published',
        publishedAt: new Date('2024-01-01'),
        views: 156,
        metaTitle: 'The Importance of Community in Faith | WG Ministries',
        metaDescription: 'Explore why Christian community is essential for spiritual growth and how to build meaningful relationships with fellow believers.'
      }
    ]);
    console.log(`✓ ${blogPosts.length} blog posts created\n`);

    // Create sample devotionals
    console.log('Creating sample devotionals...');
    const devotionals = await Devotional.insertMany([
      {
        title: 'Walking in Faith',
        content: `Faith is not about having all the answers. It's about trusting the One who does.

Hebrews 11:1 defines faith as "confidence in what we hope for and assurance about what we do not see." This means faith operates in the realm of the unseen, the unknown, the uncertain. And that's exactly where God wants to meet us.

When Abraham was called by God, he didn't know where he was going. When Moses stood before the Red Sea, he didn't see a way through. When David faced Goliath, the odds were against him. But each of them took a step of faith, and God showed up.

Today, you might be facing your own impossibility. A situation that seems hopeless, a problem that appears unsolvable, a future that looks uncertain. God is inviting you to walk by faith, not by sight.

What does that look like practically?
- Trust God's character when you can't understand His plan
- Obey His word even when it doesn't make sense
- Take the next step even when you can't see the whole path
- Rest in His promises when circumstances say otherwise

Remember, faith isn't a feeling - it's a decision. You choose to trust God regardless of what you see, feel, or understand. And as you take steps of faith, God will prove Himself faithful.

**Prayer:**
Father, I choose to walk by faith today. Help me trust Your character when I can't understand Your plan. Give me courage to obey Your word even when it challenges my comfort. I believe You are good, You are faithful, and You are working all things for my good. In Jesus' name, Amen.`,
        scripture: {
          reference: 'Hebrews 11:1',
          text: 'Now faith is confidence in what we hope for and assurance about what we do not see.'
        },
        author: adminUser._id,
        authorName: 'Pastor William Green',
        categories: [devotionalCategories[2]._id],
        devotionalDate: new Date('2024-01-09'),
        status: 'published',
        views: 423,
        metaTitle: 'Walking in Faith - Daily Devotional | WG Ministries',
        metaDescription: 'Today\'s devotional on walking by faith and trusting God when we cannot see the path ahead.'
      },
      {
        title: 'The Lord is My Shepherd',
        content: `Psalm 23 begins with four powerful words: "The LORD is my shepherd." These words have comforted believers for thousands of years, and they speak profound truth for us today.

A shepherd's primary job is to care for, protect, and guide the sheep. Sheep are vulnerable creatures - they can't defend themselves, they wander easily, and they need constant care. We are like sheep, and God is our Shepherd.

**What does this mean for you today?**

**1. You are cared for**
"I lack nothing" (v.1). When the LORD is your shepherd, you have everything you need. Not everything you want, but everything you need. He provides for you.

**2. You are led to rest**
"He makes me lie down in green pastures, he leads me beside quiet waters" (v.2). God doesn't drive us to exhaustion. He leads us to places of rest and refreshment. Are you resting in Him?

**3. Your soul is restored**
"He refreshes my soul" (v.3). When you're weary, depleted, and running on empty, the Shepherd restores you. Come to Him today and let Him refresh your spirit.

**4. You are guided**
"He guides me along the right paths" (v.3). You don't have to figure out life on your own. Your Shepherd knows the way and will guide you. Trust His leading.

**5. You are protected**
"Even though I walk through the darkest valley, I will fear no evil, for you are with me" (v.4). Notice it doesn't say "if" you walk through dark valleys, but "though" - acknowledging difficulty will come. But you're not alone. Your Shepherd is with you.

Today, rest in this truth: The LORD is YOUR shepherd. Personal. Present. Powerful.

**Prayer:**
Good Shepherd, thank You for Your tender care over my life. Help me to trust Your leading, rest in Your provision, and walk confidently knowing You are with me. I am Yours, and You are mine. Amen.`,
        scripture: {
          reference: 'Psalm 23:1-4',
          text: 'The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name\'s sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me.'
        },
        author: adminUser._id,
        authorName: 'Pastor William Green',
        categories: [devotionalCategories[0]._id, devotionalCategories[3]._id],
        devotionalDate: new Date('2024-01-08'),
        status: 'published',
        views: 367,
        metaTitle: 'The Lord is My Shepherd - Daily Devotional | WG Ministries',
        metaDescription: 'Find comfort and strength in knowing that the Lord is your shepherd who cares for, protects, and guides you.'
      },
      {
        title: 'God\'s Unfailing Love',
        content: `"Give thanks to the LORD, for he is good. His love endures forever" (Psalm 136:1).

The Hebrew word for "endures forever" literally means "to the vanishing point." In other words, if you tried to measure God's love, you would exhaust yourself before you found its end. His love goes on and on and on - forever.

**What makes God's love different?**

**1. It's Unconditional**
Human love is often conditional - "I'll love you if..." But God's love isn't based on your performance. He loves you because of who He is, not because of what you do.

**2. It's Unchanging**
Human love can fade, shift, or fail. But God's love never changes. He loved you before you knew Him, He loves you on your best days, and He loves you on your worst days. Nothing can separate you from His love (Romans 8:38-39).

**3. It's Sacrificial**
"God demonstrates his own love for us in this: While we were still sinners, Christ died for us" (Romans 5:8). God's love isn't just emotional - it's active. He proved His love at the cross.

**4. It's Personal**
God doesn't love humanity as a concept - He loves you personally, individually, specifically. He knows your name, your story, your struggles, and your dreams. And He loves you completely.

**Living in God's Love**
When you truly understand God's unfailing love for you, it changes everything:
- You don't have to perform to earn His approval
- You can be honest about your struggles and weaknesses
- You can love others more freely
- You can face life's challenges with confidence

Today, pause and let this truth sink deep into your heart: You are loved by God with an unfailing, unchanging, eternal love. Nothing you do can make Him love you more, and nothing you do can make Him love you less.

**Prayer:**
Heavenly Father, thank You for Your unfailing love. Help me to truly grasp how wide and long and high and deep is Your love for me. Let this truth transform how I see myself and how I live. May I rest secure in Your love today. In Jesus' name, Amen.`,
        scripture: {
          reference: 'Psalm 136:1',
          text: 'Give thanks to the LORD, for he is good. His love endures forever.'
        },
        author: editorUser._id,
        authorName: 'Sarah Johnson',
        categories: [devotionalCategories[3]._id, devotionalCategories[0]._id],
        devotionalDate: new Date('2024-01-07'),
        status: 'published',
        views: 298,
        metaTitle: 'God\'s Unfailing Love - Daily Devotional | WG Ministries',
        metaDescription: 'Discover the depth and breadth of God\'s unfailing love that never changes and never ends.'
      },
      {
        title: 'The Power of Prayer',
        content: `"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God" (Philippians 4:6).

Prayer is not just a religious duty - it's a powerful privilege. Through prayer, we have direct access to the Creator of the universe. The God who spoke worlds into existence wants to hear from you.

**Why Prayer Matters**

**1. Prayer Changes Us**
The primary purpose of prayer isn't to change God's mind but to align our hearts with His will. As we pray, we're transformed from the inside out.

**2. Prayer Connects Us to God**
Prayer is the lifeline of our relationship with God. Just as conversation is vital in human relationships, prayer is how we maintain intimacy with our Heavenly Father.

**3. Prayer Releases God's Power**
James 5:16 tells us "The prayer of a righteous person is powerful and effective." Prayer releases God's power into situations that seem impossible.

**4. Prayer Brings Peace**
Notice what follows verse 6: "And the peace of God, which transcends all understanding, will guard your hearts and your minds" (v.7). Prayer brings supernatural peace.

**How to Pray Effectively**

**Be Honest**
God already knows what you're thinking and feeling. Be real with Him. Pour out your heart.

**Be Specific**
Don't just pray vague prayers. Be specific about what you're asking God for. This helps you recognize when He answers.

**Be Persistent**
Jesus taught us to keep asking, seeking, and knocking (Luke 11:9). Don't give up in prayer.

**Be Thankful**
Include thanksgiving in your prayers. Gratitude shifts our perspective and honors God.

**Listen**
Prayer isn't just talking - it's also listening. After you pray, be still and listen for God's voice.

What are you facing today that needs prayer? Don't try to handle it on your own. Bring it to God in prayer. He's listening, He cares, and He will answer.

**Prayer:**
Lord, teach me to pray. Help me to come to You consistently, honestly, and expectantly. I bring my concerns, my questions, and my needs before You now. Thank You that You hear me and You answer. I trust You. In Jesus' name, Amen.`,
        scripture: {
          reference: 'Philippians 4:6-7',
          text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
        },
        author: adminUser._id,
        authorName: 'Pastor William Green',
        categories: [devotionalCategories[1]._id, devotionalCategories[0]._id],
        devotionalDate: new Date('2024-01-06'),
        status: 'published',
        views: 445,
        metaTitle: 'The Power of Prayer - Daily Devotional | WG Ministries',
        metaDescription: 'Discover the transformative power of prayer and learn how to pray more effectively in your daily walk with God.'
      },
      {
        title: 'New Mercies Every Morning',
        content: `"Because of the LORD's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness" (Lamentations 3:22-23).

Every morning when you wake up, God has fresh mercy waiting for you. Yesterday's failures don't define today. Yesterday's struggles don't limit today's possibilities. Each new day is a gift of God's grace.

**The Context of This Promise**
It's significant that these words were written by Jeremiah during one of Israel's darkest hours - the destruction of Jerusalem. Jeremiah had every reason to despair, yet he chose to remember God's faithfulness. This promise isn't just for good days - it's especially for hard days.

**What Are God's Mercies?**
- Forgiveness for yesterday's sins
- Strength for today's challenges
- Hope for tomorrow's uncertainties
- Grace for current struggles
- Patience with your process
- Love that doesn't quit

**How to Receive New Mercies**

**1. Acknowledge Your Need**
Start each day by acknowledging that you need God's mercy. Pride says, "I've got this." Faith says, "I need You."

**2. Remember His Faithfulness**
Look back at how God has been faithful. He who carried you through yesterday will carry you through today.

**3. Start Fresh**
Don't carry yesterday's guilt or worry into today. Receive God's fresh mercy and start anew.

**4. Expect Good Things**
God's mercies are new every morning - expect to see them. Look for them throughout your day.

Maybe you're reading this after a difficult day, week, or season. Maybe you've made mistakes you regret. Maybe you're dealing with consequences of past choices. Here's the good news: God's compassions never fail. His mercies are new this morning.

You get to start fresh. You get a new page, a new beginning, a new opportunity. That's the beauty of God's faithfulness - it's not dependent on your performance. It flows from His unchanging character.

**Prayer:**
Father, thank You that Your mercies are new every morning. Thank You that yesterday's failures don't disqualify me from today's grace. Help me to walk in the freshness of Your mercy and to extend that same mercy to others. Great is Your faithfulness. In Jesus' name, Amen.`,
        scripture: {
          reference: 'Lamentations 3:22-23',
          text: 'Because of the LORD\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.'
        },
        author: editorUser._id,
        authorName: 'Sarah Johnson',
        categories: [devotionalCategories[3]._id, devotionalCategories[0]._id],
        devotionalDate: new Date('2024-01-05'),
        status: 'published',
        views: 389,
        metaTitle: 'New Mercies Every Morning - Daily Devotional | WG Ministries',
        metaDescription: 'Start each day fresh with God\'s new mercies. His compassions never fail and are renewed every morning.'
      }
    ]);
    console.log(`✓ ${devotionals.length} devotionals created\n`);

    console.log('═══════════════════════════════════════════');
    console.log('Database seeded successfully! ✓');
    console.log('═══════════════════════════════════════════');
    console.log('\n📊 Summary:');
    console.log(`  • ${await User.countDocuments()} users created`);
    console.log(`  • ${await Category.countDocuments()} categories created`);
    console.log(`  • ${await BlogPost.countDocuments()} blog posts created`);
    console.log(`  • ${await Devotional.countDocuments()} devotionals created`);
    console.log('\n🔐 Admin Credentials:');
    console.log('  Email: admin@wgministries.org');
    console.log('  Password: admin123');
    console.log('\n🔐 Editor Credentials:');
    console.log('  Email: editor@wgministries.org');
    console.log('  Password: editor123');
    console.log('\n⚠️  Remember to change these passwords in production!');
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
const runSeed = async () => {
  await connectDB();
  await seedData();
  await mongoose.connection.close();
  console.log('Database connection closed');
  process.exit(0);
};

runSeed();
