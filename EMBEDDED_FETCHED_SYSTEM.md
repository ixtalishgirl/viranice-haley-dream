# 🔌 Embedded & Fetched System - Complete Integration Guide

## 📡 What is the Embedded/Fetched System?

Your Haley Dreamland app uses a **Client-Server Architecture**:
- **Frontend (Embedded)**: React app running in the browser
- **Backend (Fetched)**: Node.js Express API serving data via REST endpoints

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│         Frontend (React/Vite)           │
│  - UI Components                        │
│  - State Management (React Query)       │
│  - User Interactions                    │
└──────────────┬──────────────────────────┘
               │
               │ HTTP Requests (fetch/axios)
               │
┌──────────────▼──────────────────────────┐
│      Backend (Express Server)           │
│  - API Routes (/api/*)                  │
│  - Business Logic                       │
│  - Authentication                       │
└──────────────┬──────────────────────────┘
               │
               │ SQL Queries (Drizzle ORM)
               │
┌──────────────▼──────────────────────────┐
│   Database (PostgreSQL/Neon)            │
│  - haley_users                          │
│  - haley_messages                       │
│  - haley_chat_sessions                  │
│  - haley_thumbnails                     │
│  - haley_chat_limits                    │
└─────────────────────────────────────────┘
```

---

## 🎯 Complete Implementation Examples

### 1️⃣ User Registration Flow

**Frontend Component:**
```tsx
// client/src/components/RegisterForm.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          username,
          displayName: username 
        }),
      });

      if (!response.ok) throw new Error('Registration failed');
      
      const user = await response.json();
      
      toast({
        title: "Success!",
        description: `Welcome ${user.username}!`,
      });
      
      // Store user ID for future requests
      localStorage.setItem('userId', user.id);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="input-email"
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        data-testid="input-username"
      />
      <Button onClick={handleRegister} data-testid="button-register">
        Register
      </Button>
    </div>
  );
}
```

---

### 2️⃣ Chat Message System with React Query

**Frontend Hook:**
```tsx
// client/src/hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function useMessages(userId: string, sessionId?: string) {
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages, isLoading } = useQuery({
    queryKey: sessionId 
      ? ['/api/messages', sessionId]
      : ['/api/messages', userId],
    enabled: !!userId,
  });

  // Send new message
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      // Check limit first
      const limitRes = await fetch(`/api/chat-limits/${userId}`);
      const { canSend, remaining } = await limitRes.json();
      
      if (!canSend) {
        throw new Error(`Daily limit reached. ${remaining} messages remaining.`);
      }

      // Send message
      const message = await apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          sessionId,
          role: 'user',
          content,
        }),
      });

      // Increment counter
      await apiRequest(`/api/chat-limits/${userId}/increment`, {
        method: 'POST',
      });

      return message;
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ 
        queryKey: ['/api/messages'] 
      });
      queryClient.invalidateQueries({ 
        queryKey: [`/api/chat-limits/${userId}`] 
      });
    },
  });

  // Delete message
  const deleteMessage = useMutation({
    mutationFn: async (messageId: string) => {
      return apiRequest(`/api/messages/${messageId}?userId=${userId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/messages'] 
      });
    },
  });

  return {
    messages,
    isLoading,
    sendMessage,
    deleteMessage,
  };
}
```

**Frontend Component:**
```tsx
// client/src/components/ChatInterface.tsx
import { useState } from 'react';
import { useMessages } from '@/hooks/useMessages';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export function ChatInterface({ userId, sessionId }: Props) {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, deleteMessage } = useMessages(userId, sessionId);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    try {
      await sendMessage.mutateAsync(input);
      setInput('');
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Messages List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {messages?.map((msg) => (
          <Card key={msg.id} className="p-4" data-testid={`message-${msg.id}`}>
            <div className="flex justify-between">
              <div>
                <strong>{msg.role === 'user' ? 'You' : 'Haley'}</strong>
                <p>{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteMessage.mutate(msg.id)}
                  data-testid={`button-delete-${msg.id}`}
                >
                  Delete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat with Haley..."
          data-testid="input-message"
        />
        <Button 
          onClick={handleSend}
          disabled={sendMessage.isPending}
          data-testid="button-send"
        >
          {sendMessage.isPending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}
```

---

### 3️⃣ Session Management

**Frontend Hook:**
```tsx
// client/src/hooks/useSessions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function useSessions(userId: string) {
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['/api/sessions', userId],
    enabled: !!userId,
  });

  const createSession = useMutation({
    mutationFn: async (sessionName: string) => {
      return apiRequest('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          sessionName,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/sessions', userId] 
      });
    },
  });

  const deleteSession = useMutation({
    mutationFn: async (sessionId: string) => {
      return apiRequest(`/api/sessions/${sessionId}?userId=${userId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/sessions', userId] 
      });
    },
  });

  return {
    sessions,
    isLoading,
    createSession,
    deleteSession,
  };
}
```

---

### 4️⃣ Thumbnail Gallery

**Frontend Component:**
```tsx
// client/src/components/ThumbnailGallery.tsx
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';

export function ThumbnailGallery({ userId }: Props) {
  const { data: thumbnails, isLoading } = useQuery({
    queryKey: ['/api/thumbnails', userId],
  });

  const handleView = async (uuid: string) => {
    // Increment view count
    await fetch(`/api/thumbnails/${uuid}/views`, {
      method: 'POST',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {thumbnails?.map((thumb) => (
        <Card 
          key={thumb.uuid} 
          className="p-4 cursor-pointer hover-elevate"
          onClick={() => handleView(thumb.uuid)}
          data-testid={`thumbnail-${thumb.uuid}`}
        >
          <img 
            src={thumb.thumbnailUrl} 
            alt={thumb.videoTitle}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 font-semibold">{thumb.videoTitle}</h3>
          <p className="text-sm text-muted-foreground">
            Views: {thumb.views}
          </p>
        </Card>
      ))}
    </div>
  );
}
```

---

### 5️⃣ Chat Limit Display

**Frontend Component:**
```tsx
// client/src/components/ChatLimitBadge.tsx
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

export function ChatLimitBadge({ userId }: Props) {
  const { data: limitInfo } = useQuery({
    queryKey: [`/api/chat-limits/${userId}`],
    refetchInterval: 10000, // Refresh every 10s
  });

  if (!limitInfo) return null;

  return (
    <Badge 
      variant={limitInfo.remaining < 2 ? "destructive" : "default"}
      data-testid="badge-chat-limit"
    >
      {limitInfo.remaining} / 5 messages remaining
    </Badge>
  );
}
```

---

### 6️⃣ Export Messages Feature

**Frontend Component:**
```tsx
// client/src/components/ExportButton.tsx
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function ExportButton({ userId }: Props) {
  const handleExport = async (format: 'json' | 'txt') => {
    const response = await fetch(
      `/api/export-messages/${userId}?format=${format}`
    );
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `haley-messages-${Date.now()}.${format}`;
    a.click();
  };

  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => handleExport('json')}
        data-testid="button-export-json"
      >
        <Download className="w-4 h-4 mr-2" />
        Export JSON
      </Button>
      <Button 
        onClick={() => handleExport('txt')}
        variant="outline"
        data-testid="button-export-txt"
      >
        <Download className="w-4 h-4 mr-2" />
        Export TXT
      </Button>
    </div>
  );
}
```

---

## 🔄 Data Flow Examples

### Sending a Message:
```
1. User types message → Input component
2. Click Send → sendMessage mutation
3. Frontend → POST /api/messages
4. Backend validates with Zod schema
5. Backend saves to database
6. Backend returns created message
7. React Query invalidates cache
8. Frontend refetches messages
9. UI updates with new message
```

### Loading Chat Sessions:
```
1. Component mounts → useQuery hook
2. Frontend → GET /api/sessions?userId=xxx
3. Backend queries database
4. Returns session list
5. React Query caches data
6. Component renders sessions
```

---

## 🎨 Best Practices

### ✅ Do's:
- Use React Query for data fetching
- Cache responses appropriately
- Handle loading/error states
- Validate inputs on both frontend and backend
- Use TypeScript types from shared schema

### ❌ Don'ts:
- Don't store sensitive data in localStorage
- Don't make API calls without error handling
- Don't forget to invalidate query cache after mutations
- Don't skip user ID validation

---

## 🔐 Security Checklist

- ✅ All endpoints validate user ownership
- ✅ Zod schemas validate input data
- ✅ SQL injection protection via Drizzle ORM
- ✅ Row Level Security in database
- ✅ Environment variables for secrets

---

## 🚀 Performance Tips

1. **Use React Query DevTools** for debugging
2. **Implement pagination** for large message lists
3. **Add optimistic updates** for better UX
4. **Debounce search inputs**
5. **Use WebSockets** for real-time chat (future enhancement)

---

## 📊 Monitoring API Calls

Check the server logs to see all API activity:
```
GET /api/messages?userId=abc123 200 in 45ms
POST /api/messages 201 in 123ms :: {"id":"def456","content":"..."}
```

Your embedded/fetched system is fully operational! 🎉
