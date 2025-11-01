import { supabase } from "@/integrations/supabase/client";

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_URL?.replace('/rest/v1', '/functions/v1');

export interface HaleyMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  content_plain?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface HaleyThumbnail {
  id: number;
  uuid: string;
  user_id: string;
  video_title?: string;
  prompt?: string;
  model_used?: string;
  thumbnail_url?: string;
  language: string;
  rating: number;
  is_public: boolean;
  views: number;
  tags?: string[];
  ai_feedback?: string;
  created_at: string;
}

export interface HaleyUser {
  id: string;
  email: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role: string;
  created_at: string;
}

// ============================================
// MESSAGES API
// ============================================

export const messagesAPI = {
  async getMessages(limit = 100, offset = 0): Promise<HaleyMessage[]> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${FUNCTIONS_URL}/messages?limit=${limit}&offset=${offset}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch messages');
    }

    return response.json();
  },

  async createMessage(
    role: 'user' | 'assistant',
    content: string,
    contentPlain?: string,
    metadata?: Record<string, any>
  ): Promise<HaleyMessage> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${FUNCTIONS_URL}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, content, content_plain: contentPlain, metadata }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create message');
    }

    return response.json();
  },

  async deleteMessage(messageId: string): Promise<void> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${FUNCTIONS_URL}/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete message');
    }
  },

  async exportMessages(format: 'json' | 'txt' = 'json'): Promise<Blob> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${FUNCTIONS_URL}/export-messages?format=${format}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to export messages');
    }

    return response.blob();
  },
};

// ============================================
// THUMBNAILS API
// ============================================

export const thumbnailsAPI = {
  async getThumbnails(userId?: string, isPublic?: boolean): Promise<HaleyThumbnail[]> {
    const params = new URLSearchParams();
    if (userId) params.append('user_id', userId);
    if (isPublic) params.append('public', 'true');

    const response = await fetch(`${FUNCTIONS_URL}/thumbnails?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch thumbnails');
    }

    return response.json();
  },

  async createThumbnail(data: {
    user_id: string;
    video_title?: string;
    prompt?: string;
    model_used?: string;
    thumbnail_url?: string;
    language?: string;
    tags?: string[];
    is_public?: boolean;
  }): Promise<HaleyThumbnail> {
    const response = await fetch(`${FUNCTIONS_URL}/thumbnails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create thumbnail');
    }

    return response.json();
  },

  async updateThumbnail(uuid: string, data: Partial<HaleyThumbnail>): Promise<HaleyThumbnail> {
    const response = await fetch(`${FUNCTIONS_URL}/thumbnails/${uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update thumbnail');
    }

    return response.json();
  },

  async getSignedUploadUrl(filename: string, userId: string): Promise<{
    token: string;
    path: string;
    publicUrl: string;
    filePath: string;
  }> {
    const response = await fetch(`${FUNCTIONS_URL}/thumbnails/signed-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename, user_id: userId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get signed URL');
    }

    return response.json();
  },
};

// ============================================
// USERS API
// ============================================

export const usersAPI = {
  async getCurrentUser(): Promise<HaleyUser> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${FUNCTIONS_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }

    return response.json();
  },

  async updateUser(data: {
    username?: string;
    display_name?: string;
    avatar_url?: string;
  }): Promise<HaleyUser> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${FUNCTIONS_URL}/users`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }

    return response.json();
  },
};
