# Haley Dreamland - Replit Migration

## Overview
Haley Dreamland is an AI-powered assistant application that was originally built on Lovable (Supabase). This project has been successfully migrated to Replit's fullstack environment using Express, Neon Postgres (via Drizzle ORM), and React.

## Project Status
✅ Backend infrastructure fully migrated to Replit
✅ Database schema pushed to Neon Postgres
✅ Express API server running on port 5000
⚠️ Frontend needs updating to use new API endpoints (currently still using Supabase client)

## Architecture

### Backend (Server-side)
- **Framework**: Express 4.x
- **Database**: Neon Postgres (serverless)
- **ORM**: Drizzle ORM
- **API Routes**: RESTful endpoints in `server/routes.ts`
- **Storage Layer**: Abstraction in `server/storage.ts`

### Frontend (Client-side)
- **Framework**: React 18
- **Routing**: React Router DOM
- **UI Library**: Radix UI + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS

### Database Schema
The project includes the following tables:
- `haley_users`: User accounts and profiles
- `haley_messages`: Chat messages
- `haley_chat_sessions`: Chat conversation sessions
- `haley_chat_limits`: Message rate limiting
- `haley_thumbnails`: YouTube thumbnail generation data

## API Endpoints

### Users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user profile

### Messages
- `GET /api/messages?userId=...&sessionId=...` - Get messages
- `POST /api/messages` - Create new message
- `DELETE /api/messages/:id?userId=...` - Delete message

### Chat Sessions
- `GET /api/sessions?userId=...` - Get user's chat sessions
- `POST /api/sessions` - Create new session
- `PUT /api/sessions/:id?userId=...` - Update session
- `DELETE /api/sessions/:id?userId=...` - Delete session

### Thumbnails
- `GET /api/thumbnails?userId=...&public=true` - Get thumbnails
- `POST /api/thumbnails` - Create thumbnail
- `PUT /api/thumbnails/:uuid` - Update thumbnail
- `POST /api/thumbnails/:uuid/views` - Increment views

### Chat Limits
- `GET /api/chat-limits/:userId` - Get user's chat limits
- `POST /api/chat-limits/:userId/increment` - Increment message count

### Export
- `GET /api/export-messages/:userId?format=json|txt` - Export messages

## Development

### Running the Application
```bash
npm run dev
```
This starts the Express server with Vite middleware on port 5000.

### Database Management
```bash
npm run db:push     # Push schema changes to database
npm run db:studio   # Open Drizzle Studio (database GUI)
```

### Building for Production
```bash
npm run build  # Build both frontend and backend
npm run start  # Start production server
```

## Migration Notes

### What Was Migrated
1. ✅ Database schema from Supabase migrations to Drizzle ORM schema
2. ✅ Supabase Edge Functions converted to Express API routes
3. ✅ Storage logic abstracted into a clean interface
4. ✅ Server infrastructure with Vite integration

### What Needs Attention
1. ⚠️ **Frontend Integration**: The frontend React components still reference `@/integrations/supabase/client` and need to be updated to use the new API endpoints
2. ⚠️ **Authentication**: The original app used Supabase Auth. You'll need to implement auth (or you can add Replit Auth integration)
3. ⚠️ **File Storage**: The original app used Supabase Storage for thumbnails. You'll need to implement file upload handling (can use Replit Object Storage)

### Next Steps for Full Migration
1. Create an API client utility in `src/lib/api-client.ts` to handle API calls
2. Update components to use the new API client instead of Supabase client
3. Implement authentication (Replit Auth, JWT, or another solution)
4. Set up file storage for thumbnail uploads
5. Remove Supabase dependencies: `@supabase/supabase-js` and related files

## File Structure
```
/
├── server/              # Backend code
│   ├── db.ts           # Database connection
│   ├── index.ts        # Express server entry point
│   ├── routes.ts       # API route handlers
│   ├── storage.ts      # Database storage layer
│   └── vite.ts         # Vite integration
├── shared/              # Shared types and schema
│   └── schema.ts       # Drizzle schema definitions
├── src/                 # Frontend React code
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── App.tsx         # Main React component
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Environment Variables
The following environment variables are automatically provided by Replit:
- `DATABASE_URL`: Neon Postgres connection string
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Individual DB credentials

## Recent Changes (November 5, 2025)
- Migrated from Lovable/Supabase to Replit infrastructure
- Set up Express 4.x server with full-stack template
- Created Drizzle ORM schema matching original Supabase schema
- Implemented RESTful API routes for all functionality
- Successfully deployed database schema to Neon Postgres
- Server running and ready for frontend integration

## Known Issues
- Frontend still using Supabase client - needs migration to new API
- No authentication system currently active
- File upload for thumbnails not yet implemented

## Support & Resources
- Replit Docs: https://docs.replit.com
- Drizzle ORM: https://orm.drizzle.team
- Express Documentation: https://expressjs.com
