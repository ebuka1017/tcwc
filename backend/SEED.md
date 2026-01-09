# Database Seed Documentation

## Overview

The seed file (`seed.js`) populates your MongoDB database with initial data for development and testing purposes.

## Running the Seed

```bash
npm run seed
```

## What Gets Created

### Users (2)

1. **Admin User**
   - Name: Admin User
   - Email: admin@wgministries.org
   - Password: admin123
   - Role: admin
   - Can manage all content and users

2. **Editor User**
   - Name: Editor User
   - Email: editor@wgministries.org
   - Password: editor123
   - Role: editor
   - Can manage blog posts and devotionals

### Categories (9)

#### Blog Categories (5)
1. Spiritual Growth - Articles about growing in faith
2. Theology - Deep theological insights and biblical teaching
3. Faith - Living out your faith in daily life
4. Community - Building strong Christian community
5. Ministry - Serving God and others through ministry

#### Devotional Categories (4)
1. Daily Wisdom - Daily wisdom from Scripture
2. Prayer - Growing in prayer and communion with God
3. Faith Building - Strengthening your faith daily
4. God's Love - Experiencing God's unfailing love

### Blog Posts (4)

1. **5 Ways to Strengthen Your Prayer Life**
   - Author: Admin User
   - Categories: Spiritual Growth, Faith
   - Status: Published
   - Views: 245
   - Full content about deepening prayer life

2. **Understanding Biblical Grace**
   - Author: Admin User
   - Categories: Theology, Faith
   - Status: Published
   - Views: 312
   - Comprehensive teaching on God's grace

3. **Walking in Faith During Difficult Times**
   - Author: Editor User
   - Categories: Faith, Spiritual Growth
   - Status: Published
   - Views: 189
   - Practical guidance for maintaining faith in hardship

4. **The Importance of Community in Faith**
   - Author: Admin User
   - Categories: Community, Spiritual Growth
   - Status: Published
   - Views: 156
   - Biblical foundation for Christian community

### Devotionals (5)

1. **Walking in Faith** (Jan 9, 2024)
   - Scripture: Hebrews 11:1
   - Author: Pastor William Green
   - Categories: Faith Building
   - Views: 423

2. **The Lord is My Shepherd** (Jan 8, 2024)
   - Scripture: Psalm 23:1-4
   - Author: Pastor William Green
   - Categories: Daily Wisdom, God's Love
   - Views: 367

3. **God's Unfailing Love** (Jan 7, 2024)
   - Scripture: Psalm 136:1
   - Author: Sarah Johnson
   - Categories: God's Love, Daily Wisdom
   - Views: 298

4. **The Power of Prayer** (Jan 6, 2024)
   - Scripture: Philippians 4:6-7
   - Author: Pastor William Green
   - Categories: Prayer, Daily Wisdom
   - Views: 445

5. **New Mercies Every Morning** (Jan 5, 2024)
   - Scripture: Lamentations 3:22-23
   - Author: Sarah Johnson
   - Categories: God's Love, Daily Wisdom
   - Views: 389

## Features

### Data Integrity
- All blog posts reference valid users and categories
- All devotionals have complete Scripture references
- Dates are set to recent dates for realistic testing
- Views are populated with realistic numbers

### SEO Optimization
- Meta titles and descriptions are included
- Slugs are auto-generated from titles
- Published dates are properly set

### Content Quality
- All content is fully written (not lorem ipsum)
- Content is spiritually relevant and meaningful
- Scripture references are accurate
- Articles are comprehensive (800-1500 words)

## Important Notes

### ⚠️ WARNING: Data Loss
Running the seed will **DELETE ALL EXISTING DATA** from your database including:
- All users
- All categories
- All blog posts
- All devotionals

**Only use in development environments!**

### Security
The default passwords (`admin123` and `editor123`) are for development only.

**In production:**
1. Never run the seed script
2. Create users manually with strong passwords
3. Change any default passwords immediately

### Customization

You can modify `seed.js` to:
- Add more sample data
- Change default passwords
- Adjust content to match your ministry
- Add different categories
- Create different user roles

## Troubleshooting

### Connection Error
```
Error: Could not connect to MongoDB
```
**Solution:** Verify your `MONGODB_URI` in `.env` is correct and MongoDB is running.

### Duplicate Key Error
```
Error: E11000 duplicate key error
```
**Solution:** This usually means the seed has already been run. The seed script clears data first, so this shouldn't happen. Try manually clearing your database.

### Authentication Error
```
Error: Not authorized to access this route
```
**Solution:** This error shouldn't occur during seeding. Check that the seed script is using direct model creation, not API calls.

## After Seeding

1. **Test Login**
   - Go to `http://localhost:3000/admin/login`
   - Use admin credentials: admin@wgministries.org / admin123

2. **Explore the Data**
   - Check the blog posts at `/blog`
   - View devotionals at `/devotionals`
   - Navigate through categories

3. **Test Admin Features**
   - Create a new blog post
   - Edit an existing devotional
   - Manage categories
   - Try CRUD operations

4. **Change Passwords**
   - Even in development, consider changing the default passwords
   - Test the password change functionality

## Production Seeding

For production environments:

1. **Never use this seed script** - it deletes all data
2. Create an admin user manually using a secure method
3. Import real content, don't use sample data
4. Use strong, unique passwords
5. Set up proper user management

## Support

If you encounter issues with the seed script:
1. Check your MongoDB connection
2. Verify all dependencies are installed
3. Check the console for detailed error messages
4. Review the seed.js file for any modifications
