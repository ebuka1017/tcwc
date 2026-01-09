# WG Ministries Backend API

RESTful API for the WG Ministries church website and content management system.

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Response Format

Success response:
```json
{
  "success": true,
  "data": { ... }
}
```

Error response:
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Endpoints

#### Authentication

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "admin",
    "token": "jwt_token"
  }
}
```

**Register User** (Admin only)
```http
POST /auth/register
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "editor"
}
```

**Get Current User**
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Blog Posts

**Get All Blog Posts**
```http
GET /blog?status=published&category=categoryId&page=1&limit=10
```

**Get Single Blog Post**
```http
GET /blog/:slug
```

**Create Blog Post** (Auth required)
```http
POST /blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Blog Post Title",
  "content": "Full blog content...",
  "excerpt": "Short excerpt...",
  "featuredImage": "https://example.com/image.jpg",
  "categories": ["categoryId1", "categoryId2"],
  "status": "published",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description"
}
```

**Update Blog Post** (Auth required)
```http
PUT /blog/id/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "draft"
}
```

**Delete Blog Post** (Auth required)
```http
DELETE /blog/id/:id
Authorization: Bearer <token>
```

#### Devotionals

**Get All Devotionals**
```http
GET /devotionals?status=published&date=2024-01-09&page=1&limit=10
```

**Get Today's Devotional**
```http
GET /devotionals/today
```

**Get Single Devotional**
```http
GET /devotionals/:slug
```

**Create Devotional** (Auth required)
```http
POST /devotionals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Devotional Title",
  "content": "Full devotional content...",
  "scripture": {
    "reference": "John 3:16",
    "text": "For God so loved the world..."
  },
  "authorName": "Author Name",
  "devotionalDate": "2024-01-09",
  "categories": ["categoryId"],
  "status": "published"
}
```

#### Categories

**Get All Categories**
```http
GET /categories?type=blog
```

**Create Category** (Admin only)
```http
POST /categories
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Category Name",
  "type": "blog",
  "description": "Category description"
}
```

#### Users

**Get All Users** (Admin only)
```http
GET /users
Authorization: Bearer <admin_token>
```

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'editor']),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### BlogPost
```javascript
{
  title: String,
  slug: String (unique, auto-generated),
  content: String,
  excerpt: String,
  featuredImage: String,
  author: ObjectId (ref: User),
  categories: [ObjectId] (ref: Category),
  status: String (enum: ['draft', 'published']),
  publishedAt: Date,
  views: Number,
  metaTitle: String,
  metaDescription: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Devotional
```javascript
{
  title: String,
  slug: String (unique, auto-generated),
  content: String,
  scripture: {
    reference: String,
    text: String
  },
  author: ObjectId (ref: User),
  authorName: String,
  categories: [ObjectId] (ref: Category),
  devotionalDate: Date (unique),
  status: String (enum: ['draft', 'published']),
  featuredImage: String,
  views: Number,
  metaTitle: String,
  metaDescription: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```javascript
{
  name: String (unique),
  slug: String (unique, auto-generated),
  type: String (enum: ['blog', 'devotional']),
  description: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wg-ministries
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API is rate limited to 100 requests per 15 minutes per IP address.

## CORS

CORS is configured to allow requests from the frontend origin specified in the environment variables.
