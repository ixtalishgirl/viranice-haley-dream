# Haley Dreamland - Production Ready Setup

## 🌸 Overview

Haley Dreamland is your personal AI companion with integrated memory vault and creative studio. This document contains everything you need to deploy and manage the production application.

## 📋 Project Structure

```
haley-dreamland/
├── src/
│   ├── components/       # React components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HaleyPopupChat.tsx
│   │   └── ...
│   ├── lib/
│   │   └── haley-api.ts  # API wrapper functions
│   ├── pages/            # Route pages
│   └── integrations/
│       └── supabase/     # Auto-generated Supabase client
├── supabase/
│   ├── functions/        # Edge functions (API endpoints)
│   │   ├── thumbnails/   # Thumbnail management
│   │   ├── messages/     # Chat message management
│   │   ├── users/        # User profile management
│   │   └── export-messages/  # Export conversations
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## 🗄️ Database Schema

### Tables

**haley_users**
- `id` (UUID, PK) - User ID linked to auth.users
- `email` (TEXT, UNIQUE) - User email
- `username` (TEXT) - Username
- `display_name` (TEXT) - Display name
- `avatar_url` (TEXT) - Avatar image URL
- `role` (TEXT) - User role (user/admin)
- `created_at` (TIMESTAMPTZ) - Account creation time

**haley_messages** (Chat Archive)
- `id` (UUID, PK)
- `user_id` (UUID, FK → haley_users.id)
- `role` (TEXT) - 'user' or 'assistant'
- `content` (TEXT) - Message content
- `content_plain` (TEXT) - Optional plain text version
- `metadata` (JSONB) - Additional metadata
- `created_at` (TIMESTAMPTZ)

**haley_thumbnails**
- `id` (BIGSERIAL, PK)
- `uuid` (UUID, UNIQUE)
- `user_id` (UUID, FK → haley_users.id)
- `video_title` (TEXT)
- `prompt` (TEXT) - Generation prompt
- `model_used` (TEXT) - AI model used
- `thumbnail_url` (TEXT) - Image URL
- `language` (TEXT) - Default 'en'
- `rating` (INT) - 0-5 rating
- `is_public` (BOOLEAN) - Public/private flag
- `views` (INT) - View count
- `tags` (TEXT[]) - Array of tags
- `ai_feedback` (TEXT) - AI-generated feedback
- `created_at` (TIMESTAMPTZ)

### Storage Bucket

**haley-thumbnails**
- Public bucket for thumbnail images
- 5MB file size limit
- Allowed MIME types: jpeg, png, webp, gif
- RLS policies for user-owned file management

## 🔒 Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Users**: Can only view/update their own profile
- **Messages**: Can only view/insert/update/delete their own messages
- **Thumbnails**: Can view public thumbnails or their own; can only modify their own
- **Storage**: Can upload/update/delete their own files; public read access

## 🚀 API Endpoints (Edge Functions)

### 1. `/functions/v1/thumbnails` (Public)

**GET** - Fetch thumbnails
- Query params: `user_id`, `public=true`
- Returns: Array of thumbnails

**POST** - Create thumbnail
- Body: `{ user_id, video_title, prompt, model_used, thumbnail_url, language, tags, is_public }`
- Returns: Created thumbnail

**PUT** `/functions/v1/thumbnails/:uuid` - Update thumbnail
- Body: Partial thumbnail data
- Returns: Updated thumbnail

**POST** `/functions/v1/thumbnails/signed-url` - Get signed upload URL
- Body: `{ filename, user_id }`
- Returns: `{ token, path, publicUrl, filePath }`

### 2. `/functions/v1/messages` (Authenticated)

**GET** - Fetch user messages
- Query params: `limit=100`, `offset=0`
- Headers: `Authorization: Bearer <token>`
- Returns: Array of messages

**POST** - Create message
- Headers: `Authorization: Bearer <token>`
- Body: `{ role, content, content_plain?, metadata? }`
- Returns: Created message

**DELETE** `/functions/v1/messages/:id` - Delete message
- Headers: `Authorization: Bearer <token>`
- Returns: `{ success: true }`

### 3. `/functions/v1/users` (Authenticated)

**GET** - Get current user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User object

**PUT** - Update user profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ username?, display_name?, avatar_url? }`
- Returns: Updated user

### 4. `/functions/v1/export-messages` (Authenticated)

**GET** - Export all user messages
- Headers: `Authorization: Bearer <token>`
- Query params: `format=json` or `format=txt`
- Returns: File download (JSON or TXT)

## 📦 Frontend API Usage

All API functions are available in `src/lib/haley-api.ts`:

```typescript
import { messagesAPI, thumbnailsAPI, usersAPI } from '@/lib/haley-api';

// Get messages
const messages = await messagesAPI.getMessages(100, 0);

// Create message
const message = await messagesAPI.createMessage('user', 'Hello!');

// Export messages
const blob = await messagesAPI.exportMessages('json');

// Get thumbnails
const thumbnails = await thumbnailsAPI.getThumbnails();

// Upload thumbnail
const signedUrl = await thumbnailsAPI.getSignedUploadUrl('image.jpg', userId);
// Upload file to signedUrl.path
const thumbnail = await thumbnailsAPI.createThumbnail({
  user_id: userId,
  thumbnail_url: signedUrl.publicUrl,
  ...
});

// Get/update user
const user = await usersAPI.getCurrentUser();
const updated = await usersAPI.updateUser({ display_name: 'New Name' });
```

## 🔐 Authentication

The app uses Lovable Cloud authentication (Supabase Auth):

1. Users sign up/login via email & password
2. User profile automatically created in `haley_users` table via trigger
3. JWT tokens used for authenticated endpoints
4. Frontend uses `supabase.auth.getSession()` for token retrieval

## 🌐 Deployment

### Environment Variables

The following are **automatically configured** by Lovable Cloud:

```
VITE_SUPABASE_URL=<auto-configured>
VITE_SUPABASE_PUBLISHABLE_KEY=<auto-configured>
VITE_SUPABASE_PROJECT_ID=<auto-configured>
SUPABASE_SERVICE_ROLE_KEY=<auto-configured>
```

**DO NOT** manually edit these or create `.env` files - they are managed automatically.

### Deploy Steps

1. **Frontend Deployment**
   - Click "Publish" button in Lovable
   - Frontend auto-deploys to `<your-project>.lovable.app`

2. **Edge Functions**
   - Edge functions auto-deploy with each change
   - No manual deployment needed

3. **Database Migrations**
   - Already applied via Lovable Cloud
   - Schema is production-ready

### Custom Domain

To connect a custom domain:
1. Go to Project → Settings → Domains
2. Follow the DNS configuration instructions
3. Requires paid Lovable plan

## ✅ Testing Checklist

### Database
- [ ] All tables created with correct schema
- [ ] RLS policies working correctly
- [ ] Storage bucket accessible
- [ ] User profile auto-created on signup

### API Endpoints
- [ ] `GET /thumbnails` returns data
- [ ] `POST /thumbnails` creates thumbnail
- [ ] `POST /thumbnails/signed-url` generates upload URL
- [ ] `GET /messages` returns user messages (authenticated)
- [ ] `POST /messages` creates message (authenticated)
- [ ] `DELETE /messages/:id` removes message (authenticated)
- [ ] `GET /export-messages?format=json` downloads JSON
- [ ] `GET /export-messages?format=txt` downloads TXT
- [ ] `GET /users` returns current user (authenticated)
- [ ] `PUT /users` updates profile (authenticated)

### Frontend
- [ ] Hero section displays correct messaging
- [ ] Navigation shows: Home, Features, Anime, Blog, Contact
- [ ] No references to "tools" or old product names
- [ ] Chat functionality works
- [ ] Games load correctly
- [ ] Theme switcher works
- [ ] Responsive on mobile

### Security
- [ ] RLS prevents unauthorized data access
- [ ] Users can only see their own messages/thumbnails
- [ ] File uploads restricted to authenticated users
- [ ] Proper CORS headers on all endpoints

## 📊 Monitoring & Logs

### View Backend Logs
Access your backend via:
<lov-actions>
  <lov-open-backend>View Backend</lov-open-backend>
</lov-actions>

### Edge Function Logs
View real-time logs for debugging:
1. Open backend panel
2. Navigate to Edge Functions
3. Select function to view logs

## 🔧 Common Tasks

### Add New Message to Chat Archive
```typescript
import { messagesAPI } from '@/lib/haley-api';

await messagesAPI.createMessage(
  'assistant',
  'Hello! How can I help you today?',
  'Hello How can I help you today',
  { source: 'auto-greeting' }
);
```

### Upload Thumbnail
```typescript
import { thumbnailsAPI } from '@/lib/haley-api';

// 1. Get signed upload URL
const { path, publicUrl } = await thumbnailsAPI.getSignedUploadUrl(
  'my-image.jpg',
  currentUserId
);

// 2. Upload file to storage (use supabase.storage)
await supabase.storage
  .from('haley-thumbnails')
  .uploadToSignedUrl(path, token, file);

// 3. Create thumbnail record
await thumbnailsAPI.createThumbnail({
  user_id: currentUserId,
  video_title: 'My Video',
  thumbnail_url: publicUrl,
  is_public: true
});
```

### Export User Data
```typescript
import { messagesAPI } from '@/lib/haley-api';

const jsonBlob = await messagesAPI.exportMessages('json');
const url = URL.createObjectURL(jsonBlob);
const a = document.createElement('a');
a.href = url;
a.download = `messages-${Date.now()}.json`;
a.click();
```

## 🆘 Support

- **Email**: viraluxsupport@gmail.com
- **Lovable Docs**: https://docs.lovable.dev
- **Backend Access**: Click "View Backend" in the Lovable interface

## 🎯 Product Focus

**Haley Dreamland** is positioned as:
- Personal AI assistant
- Memory vault for conversations
- Creative studio for thumbnails
- All-in-one digital companion

**NOT** positioned as:
- Collection of separate tools
- ViraLux (old branding)
- Multi-product suite

All messaging focuses on the unified "Haley Dreamland" experience.

---

**Last Updated**: 2025-01-01
**Version**: 1.0.0
**Lovable Cloud**: Enabled
