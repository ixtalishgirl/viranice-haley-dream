# 🚀 Haley Dreamland - 24/7 Deployment Guide

## ✅ Current Setup Status

Your Node.js Express backend is fully operational with:
- ✅ Express server running on port 5000
- ✅ PostgreSQL database (Neon) with Drizzle ORM
- ✅ All API routes implemented
- ✅ Landing page intact and working
- ✅ Production build configuration ready

---

## 📋 Complete API Endpoints (Embedded/Fetched System)

### 👤 User Management
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user

### 💬 Messages System
- `GET /api/messages?userId=xxx` - Get all user messages
- `GET /api/messages?sessionId=xxx` - Get session messages
- `POST /api/messages` - Create new message
- `DELETE /api/messages/:id?userId=xxx` - Delete message

### 📝 Chat Sessions
- `GET /api/sessions?userId=xxx` - Get all user sessions
- `POST /api/sessions` - Create new session
- `PUT /api/sessions/:id?userId=xxx` - Update session
- `DELETE /api/sessions/:id?userId=xxx` - Delete session

### 🖼️ Thumbnails
- `GET /api/thumbnails?userId=xxx` - Get user thumbnails
- `GET /api/thumbnails?public=true` - Get public thumbnails
- `POST /api/thumbnails` - Create thumbnail
- `PUT /api/thumbnails/:uuid` - Update thumbnail
- `POST /api/thumbnails/:uuid/views` - Increment views

### 📊 Chat Limits
- `GET /api/chat-limits/:userId` - Get limit info
- `POST /api/chat-limits/:userId/increment` - Increment count

### 📤 Export
- `GET /api/export-messages/:userId?format=json` - Export as JSON
- `GET /api/export-messages/:userId?format=txt` - Export as TXT

---

## 🎯 24/7 Deployment Steps

### Option 1: Replit Deployment (Recommended)

1. **Click the "Deploy" button** in Replit
   - This will deploy your app to production
   - Your site will run 24/7 automatically
   - You'll get a permanent URL

2. **Configure Deployment Settings**:
   - Deployment Type: **Autoscale** (already configured)
   - Build Command: `npm run build`
   - Run Command: `npm start`

3. **Environment Variables** (already set):
   - `DATABASE_URL` - PostgreSQL connection string
   - All other database credentials are auto-configured

### Option 2: Manual Server Configuration

If you're running on your own server:

```bash
# Build the application
npm run build

# Start in production mode
NODE_ENV=production npm start
```

---

## 🔧 Database Schema

### Tables Created:
1. **haley_users** - User accounts
2. **haley_messages** - Chat messages
3. **haley_chat_sessions** - Chat conversations
4. **haley_thumbnails** - Generated thumbnails
5. **haley_chat_limits** - Message limits tracking

### Features:
- ✅ Row Level Security policies
- ✅ Automatic timestamps
- ✅ Cascade deletes
- ✅ UUID primary keys
- ✅ Indexed queries for performance

---

## 📱 Frontend Integration Examples

### Fetch User Messages
```javascript
// Get all messages for a user
const response = await fetch('/api/messages?userId=USER_ID');
const messages = await response.json();

// Get messages for specific session
const sessionResponse = await fetch('/api/messages?sessionId=SESSION_ID');
const sessionMessages = await sessionResponse.json();
```

### Create New Message
```javascript
const newMessage = {
  userId: 'USER_ID',
  sessionId: 'SESSION_ID',
  role: 'user',
  content: 'Hello Haley!',
};

const response = await fetch('/api/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newMessage),
});
const created = await response.json();
```

### Check Chat Limits
```javascript
const response = await fetch('/api/chat-limits/USER_ID');
const { limit, remaining, canSend } = await response.json();

if (canSend) {
  // User can send messages
} else {
  // Show limit reached message
}
```

---

## 🛠️ Maintenance Commands

```bash
# Run database migrations
npm run db:push

# Open Drizzle Studio (database viewer)
npm run db:studio

# Development mode
npm run dev

# Production mode
npm start
```

---

## ⚡ Performance Optimizations

1. **Database Indexing**: All queries use indexed columns
2. **Connection Pooling**: Neon PostgreSQL handles this automatically
3. **Efficient Queries**: Uses Drizzle ORM for optimized SQL
4. **Caching Ready**: Add Redis if needed for high traffic

---

## 🔒 Security Features

- ✅ Row Level Security (RLS) policies
- ✅ User ID validation on all operations
- ✅ Input validation using Zod schemas
- ✅ SQL injection protection via Drizzle ORM
- ✅ Environment variable secrets management

---

## 📊 Monitoring & Logs

Your server logs all API requests with timing:
```
GET /api/messages?userId=xxx 200 in 45ms
POST /api/messages 201 in 123ms
```

---

## 🎨 Landing Page

Your landing page is **completely intact** at:
- Route: `/` (root)
- Features: All original design preserved
- Theme: Anime-themed magical dreamland
- Navigation: Home, Anime, Haley's Dreamland

---

## 🚨 Troubleshooting

### Server won't start?
```bash
# Check if port 5000 is available
lsof -i :5000

# Restart the workflow
# (Replit will do this automatically)
```

### Database connection issues?
```bash
# Verify environment variables
env | grep DATABASE

# Push schema again
npm run db:push
```

### API not responding?
- Check server logs in Replit console
- Verify database is connected
- Test endpoints with curl or Postman

---

## 📈 Next Steps

1. ✅ Backend fully migrated to Node.js/Express
2. ✅ Database schema deployed
3. ✅ All API endpoints working
4. 🎯 **Click "Deploy" button for 24/7 hosting**
5. 🔜 Connect frontend to new API endpoints
6. 🔜 Add authentication system
7. 🔜 Implement AI chat functionality

---

## 💡 Tips

- **Auto-restart**: Replit automatically restarts your server on code changes
- **Environment**: All secrets are safely stored in Replit Secrets
- **Scalability**: Autoscale deployment handles traffic spikes automatically
- **Monitoring**: Check Replit deployment dashboard for metrics

Your site is ready to run 24/7! 🎉
