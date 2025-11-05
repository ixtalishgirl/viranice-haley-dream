import { db } from "./db.js";
import {
  haleyUsers,
  haleyMessages,
  haleyThumbnails,
  haleyChatSessions,
  haleyChatLimits,
  type User,
  type InsertUser,
  type Message,
  type InsertMessage,
  type Thumbnail,
  type InsertThumbnail,
  type ChatSession,
  type InsertChatSession,
  type ChatLimit,
  type InsertChatLimit,
} from "../shared/schema.js";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  
  getUserMessages(userId: string, limit?: number, offset?: number): Promise<Message[]>;
  getSessionMessages(sessionId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(messageId: string, userId: string): Promise<boolean>;
  
  getChatSessions(userId: string): Promise<ChatSession[]>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(sessionId: string, userId: string, updates: Partial<InsertChatSession>): Promise<ChatSession | undefined>;
  deleteChatSession(sessionId: string, userId: string): Promise<boolean>;
  
  getPublicThumbnails(): Promise<Thumbnail[]>;
  getUserThumbnails(userId: string): Promise<Thumbnail[]>;
  createThumbnail(thumbnail: InsertThumbnail): Promise<Thumbnail>;
  updateThumbnail(uuid: string, updates: Partial<InsertThumbnail>): Promise<Thumbnail | undefined>;
  incrementThumbnailViews(uuid: string): Promise<void>;
  
  getChatLimit(userId: string): Promise<ChatLimit | undefined>;
  checkMessageLimit(userId: string): Promise<boolean>;
  incrementMessageCount(userId: string): Promise<void>;
  getRemainingMessages(userId: string): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(haleyUsers).where(eq(haleyUsers.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(haleyUsers).where(eq(haleyUsers.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(haleyUsers).values(user).returning();
    return result[0];
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(haleyUsers).set(user).where(eq(haleyUsers.id, id)).returning();
    return result[0];
  }

  async getUserMessages(userId: string, limit: number = 100, offset: number = 0): Promise<Message[]> {
    return await db.select()
      .from(haleyMessages)
      .where(eq(haleyMessages.userId, userId))
      .orderBy(desc(haleyMessages.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getSessionMessages(sessionId: string): Promise<Message[]> {
    return await db.select()
      .from(haleyMessages)
      .where(eq(haleyMessages.sessionId, sessionId))
      .orderBy(haleyMessages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(haleyMessages).values(message).returning();
    
    if (message.sessionId) {
      await db.update(haleyChatSessions)
        .set({ lastMessageAt: new Date() })
        .where(eq(haleyChatSessions.id, message.sessionId));
    }
    
    return result[0];
  }

  async deleteMessage(messageId: string, userId: string): Promise<boolean> {
    const result = await db.delete(haleyMessages)
      .where(and(eq(haleyMessages.id, messageId), eq(haleyMessages.userId, userId)))
      .returning();
    return result.length > 0;
  }

  async getChatSessions(userId: string): Promise<ChatSession[]> {
    return await db.select()
      .from(haleyChatSessions)
      .where(eq(haleyChatSessions.userId, userId))
      .orderBy(desc(haleyChatSessions.lastMessageAt));
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const result = await db.insert(haleyChatSessions).values(session).returning();
    return result[0];
  }

  async updateChatSession(sessionId: string, userId: string, updates: Partial<InsertChatSession>): Promise<ChatSession | undefined> {
    const result = await db.update(haleyChatSessions)
      .set(updates)
      .where(and(eq(haleyChatSessions.id, sessionId), eq(haleyChatSessions.userId, userId)))
      .returning();
    return result[0];
  }

  async deleteChatSession(sessionId: string, userId: string): Promise<boolean> {
    const result = await db.delete(haleyChatSessions)
      .where(and(eq(haleyChatSessions.id, sessionId), eq(haleyChatSessions.userId, userId)))
      .returning();
    return result.length > 0;
  }

  async getPublicThumbnails(): Promise<Thumbnail[]> {
    return await db.select()
      .from(haleyThumbnails)
      .where(eq(haleyThumbnails.isPublic, true))
      .orderBy(desc(haleyThumbnails.createdAt));
  }

  async getUserThumbnails(userId: string): Promise<Thumbnail[]> {
    return await db.select()
      .from(haleyThumbnails)
      .where(eq(haleyThumbnails.userId, userId))
      .orderBy(desc(haleyThumbnails.createdAt));
  }

  async createThumbnail(thumbnail: InsertThumbnail): Promise<Thumbnail> {
    const result = await db.insert(haleyThumbnails).values(thumbnail).returning();
    return result[0];
  }

  async updateThumbnail(uuid: string, updates: Partial<InsertThumbnail>): Promise<Thumbnail | undefined> {
    const result = await db.update(haleyThumbnails)
      .set(updates)
      .where(eq(haleyThumbnails.uuid, uuid))
      .returning();
    return result[0];
  }

  async incrementThumbnailViews(uuid: string): Promise<void> {
    await db.update(haleyThumbnails)
      .set({ views: sql`${haleyThumbnails.views} + 1` })
      .where(eq(haleyThumbnails.uuid, uuid));
  }

  async getChatLimit(userId: string): Promise<ChatLimit | undefined> {
    const result = await db.select()
      .from(haleyChatLimits)
      .where(eq(haleyChatLimits.userId, userId))
      .limit(1);
    return result[0];
  }

  async checkMessageLimit(userId: string): Promise<boolean> {
    const limit = await this.getChatLimit(userId);
    
    if (!limit) {
      return true;
    }
    
    if (limit.limitResetAt < new Date()) {
      return true;
    }
    
    if (limit.planType === "free") {
      return limit.messagesSent < 5;
    }
    
    return true;
  }

  async incrementMessageCount(userId: string): Promise<void> {
    const limit = await this.getChatLimit(userId);
    
    if (!limit) {
      await db.insert(haleyChatLimits).values({
        userId,
        messagesSent: 1,
        limitResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        planType: "free",
      });
    } else {
      if (limit.limitResetAt < new Date()) {
        await db.update(haleyChatLimits)
          .set({
            messagesSent: 1,
            limitResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          })
          .where(eq(haleyChatLimits.userId, userId));
      } else {
        await db.update(haleyChatLimits)
          .set({ messagesSent: sql`${haleyChatLimits.messagesSent} + 1` })
          .where(eq(haleyChatLimits.userId, userId));
      }
    }
  }

  async getRemainingMessages(userId: string): Promise<number> {
    const limit = await this.getChatLimit(userId);
    
    if (!limit) {
      return 5;
    }
    
    if (limit.limitResetAt < new Date()) {
      return 5;
    }
    
    if (limit.planType === "free") {
      return Math.max(0, 5 - limit.messagesSent);
    }
    
    return Infinity;
  }
}

export const storage = new DatabaseStorage();
