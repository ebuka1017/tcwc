# WG Ministries - Modern Church Website & CMS

A modern, SEO-optimized church website with a content management system built with Next.js and Node.js.

## Features

### Public Website
- 🏠 Home page with hero section and featured content
- ℹ️ About page with ministry information and leadership
- 🎤 Sermons page with video/audio player
- 📝 Blog with Masonry layout
- 📖 Daily devotionals
- 📅 Events calendar
- 📧 Contact form
- 💰 Giving page
- 🎨 Modern UI with Framer Motion animations
- 📱 Fully responsive design
- ♿ Accessibility best practices (WCAG)
- 🔍 SEO optimized with meta tags, sitemap, and robots.txt

### Admin Dashboard
- 🔐 Secure JWT-based authentication
- 📝 Blog post management (CRUD)
- 📖 Devotional management (CRUD)
- 🏷️ Category management
- 👥 User management (admin only)
- 📊 Role-based access control (Admin, Editor)

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **Framer Motion**
- **React Masonry CSS**
- **Axios**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Joi** for validation
- **Helmet** for security
- **CORS**
- **Rate limiting**

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── blogController.js
│   │   │   ├── devotionalController.js
│   │   │   ├── categoryController.js
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── BlogPost.js
│   │   │   ├── Devotional.js
│   │   │   └── Category.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── blogRoutes.js
│   │   │   ├── devotionalRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── app/
    │   ├── (pages)/
    │   │   ├── about/
    │   │   ├── blog/
    │   │   ├── devotionals/
    │   │   ├── sermons/
    │   │   ├── events/
    │   │   ├── contact/
    │   │   └── give/
    │   ├── admin/
    │   │   ├── blog/
    │   │   ├── devotionals/
    │   │   ├── categories/
    │   │   └── login/
    │   ├── layout.js
    │   ├── page.js
    │   ├── globals.css
    │   ├── sitemap.js
    │   └── robots.js
    ├── components/
    │   ├── home/
    │   ├── Navbar.js
    │   └── Footer.js
    ├── lib/
    │   └── api.js
    ├── package.json
    └── .env.local.example
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wg-ministries
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.local.example`:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=WG Ministries
```

5. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## Creating the First Admin User

To create the first admin user, you'll need to use an API client like Postman or curl:

```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@wgministries.org",
  "password": "yourpassword",
  "role": "admin"
}
```

Note: The register endpoint requires authentication. For the first user, you may need to temporarily remove the auth middleware or create a seed script.

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Register (admin only)
- `GET /api/v1/auth/me` - Get current user

### Blog Posts
- `GET /api/v1/blog` - Get all blog posts
- `GET /api/v1/blog/:slug` - Get single blog post
- `POST /api/v1/blog` - Create blog post (auth required)
- `PUT /api/v1/blog/id/:id` - Update blog post (auth required)
- `DELETE /api/v1/blog/id/:id` - Delete blog post (auth required)

### Devotionals
- `GET /api/v1/devotionals` - Get all devotionals
- `GET /api/v1/devotionals/today` - Get today's devotional
- `GET /api/v1/devotionals/:slug` - Get single devotional
- `POST /api/v1/devotionals` - Create devotional (auth required)
- `PUT /api/v1/devotionals/id/:id` - Update devotional (auth required)
- `DELETE /api/v1/devotionals/id/:id` - Delete devotional (auth required)

### Categories
- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get single category
- `POST /api/v1/categories` - Create category (admin only)
- `PUT /api/v1/categories/:id` - Update category (admin only)
- `DELETE /api/v1/categories/:id` - Delete category (admin only)

### Users
- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get single user (admin only)
- `PUT /api/v1/users/:id` - Update user (admin only)
- `DELETE /api/v1/users/:id` - Delete user (admin only)

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Backend (Render/Railway)

1. Create a new Web Service on Render or Railway
2. Connect your repository
3. Set environment variables
4. Deploy

For MongoDB, use MongoDB Atlas for production.

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting
- CORS configuration
- Input validation and sanitization
- Helmet for security headers
- Protected admin routes

## SEO Features

- Dynamic meta tags per page
- Open Graph metadata
- Sitemap.xml generation
- Robots.txt
- Semantic HTML
- Image optimization
- Lazy loading

## Contributing

This is a ministry project. Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this for your own ministry or church website.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

## Acknowledgments

Built with modern web technologies to serve ministries worldwide.
