# Deployment Guide

This guide will help you deploy the WG Ministries website to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render or Railway account (for backend)
- MongoDB Atlas account (for database)

## 1. Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (Free tier is fine for starting)
3. Create a database user with username and password
4. Whitelist all IP addresses (0.0.0.0/0) for development, or specific IPs for production
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

## 2. Backend Deployment (Render)

### Option A: Using Render

1. Push your code to GitHub
2. Go to https://render.com and sign in
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: wg-ministries-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-random-secure-string>
   JWT_EXPIRE=7d
   CORS_ORIGIN=<your-vercel-frontend-url>
   ```

7. Click "Create Web Service"
8. Wait for deployment to complete
9. Note your backend URL (e.g., https://wg-ministries-api.onrender.com)

### Option B: Using Railway

1. Push your code to GitHub
2. Go to https://railway.app and sign in
3. Create a new project from GitHub
4. Select your repository
5. Railway will auto-detect Node.js
6. Add the same environment variables as above
7. Deploy

## 3. Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to https://vercel.com and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=<your-render-backend-url>/api/v1
   NEXT_PUBLIC_SITE_URL=<your-vercel-url>
   NEXT_PUBLIC_SITE_NAME=WG Ministries
   NEXT_PUBLIC_SITE_DESCRIPTION=A Christian ministry dedicated to spreading the Gospel
   ```

7. Click "Deploy"
8. Wait for deployment to complete
9. Your site will be live at your Vercel URL

## 4. Post-Deployment Setup

### Create First Admin User

Since the register endpoint requires authentication, you have two options:

**Option 1: Use MongoDB Atlas directly**
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Insert a document into the `users` collection:
```json
{
  "name": "Admin User",
  "email": "admin@wgministries.org",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "isActive": true,
  "createdAt": { "$date": "2024-01-09T00:00:00.000Z" },
  "updatedAt": { "$date": "2024-01-09T00:00:00.000Z" }
}
```

Note: You'll need to hash the password using bcrypt. You can use an online bcrypt tool or Node.js:
```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('your-password', 10);
console.log(hashedPassword);
```

**Option 2: Temporarily allow public registration**
1. Comment out the auth middleware in `backend/src/routes/authRoutes.js`
2. Redeploy
3. Register your admin user via API
4. Restore the auth middleware
5. Redeploy again

### Create Categories

1. Login to your admin dashboard at `https://your-site.vercel.app/admin/login`
2. Navigate to Categories
3. Create categories for blogs and devotionals

### Add Content

1. Navigate to Blog Posts or Devotionals in the admin dashboard
2. Create your first posts

## 5. Custom Domain (Optional)

### Frontend (Vercel)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Backend (Render)
1. Go to your service settings in Render
2. Click "Custom Domains"
3. Add your custom domain
4. Configure DNS records

## 6. Monitoring and Maintenance

### Logs
- **Render**: View logs in the Render dashboard
- **Vercel**: View deployment and runtime logs in Vercel dashboard
- **MongoDB Atlas**: Monitor database performance and usage

### Backups
- Set up automated backups in MongoDB Atlas
- Export important data regularly

### Updates
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Vercel and Render will auto-deploy from your main branch

## 7. Environment Variables Summary

### Backend (Render/Railway)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-secure-string
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-site.vercel.app
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api/v1
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_SITE_NAME=WG Ministries
NEXT_PUBLIC_SITE_DESCRIPTION=A Christian ministry...
```

## 8. Security Checklist

- [ ] Use strong JWT secret
- [ ] Use strong database password
- [ ] Enable HTTPS (automatic on Vercel and Render)
- [ ] Set proper CORS origin
- [ ] Limit MongoDB Atlas IP addresses (if possible)
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting (already configured)
- [ ] Keep dependencies updated

## 9. Performance Optimization

- [ ] Enable caching in Vercel
- [ ] Optimize images using Next.js Image component
- [ ] Enable MongoDB Atlas indexes
- [ ] Monitor API response times
- [ ] Use CDN for static assets

## Troubleshooting

### Backend not connecting to database
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials

### Frontend can't reach backend
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS_ORIGIN in backend matches frontend URL
- Verify backend is running (check Render logs)

### Authentication issues
- Verify JWT_SECRET matches between deployments
- Check token expiration (JWT_EXPIRE)
- Clear browser cookies and try again

## Support

For issues, check the logs in your respective platforms or open an issue on GitHub.
