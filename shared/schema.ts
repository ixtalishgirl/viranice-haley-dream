import { pgTable, text, uuid, timestamp, integer, boolean, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const haleyUsers = pgTable("haley_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username"),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const haleyChatSessions = pgTable("haley_chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => haleyUsers.id, { onDelete: "cascade" }),
  sessionName: text("session_name").notNull().default("New Chat"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
});

export const haleyMessages = pgTable("haley_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => haleyUsers.id, { onDelete: "cascade" }),
  sessionId: uuid("session_id").references(() => haleyChatSessions.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  contentPlain: text("content_plain"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const haleyThumbnails = pgTable("haley_thumbnails", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: uuid("user_id").references(() => haleyUsers.id, { onDelete: "cascade" }),
  videoTitle: text("video_title"),
  prompt: text("prompt"),
  modelUsed: text("model_used"),
  thumbnailUrl: text("thumbnail_url"),
  language: text("language").default("en"),
  rating: integer("rating").default(0),
  isPublic: boolean("is_public").default(false),
  views: integer("views").default(0),
  tags: text("tags").array(),
  aiFeedback: text("ai_feedback"),
  uuid: uuid("uuid").defaultRandom().unique(),
});

export const haleyChatLimits = pgTable("haley_chat_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique().references(() => haleyUsers.id, { onDelete: "cascade" }),
  messagesSent: integer("messages_sent").default(0).notNull(),
  limitResetAt: timestamp("limit_reset_at").notNull(),
  planType: text("plan_type").default("free").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(haleyUsers).omit({ id: true, createdAt: true });
export const insertChatSessionSchema = createInsertSchema(haleyChatSessions).omit({ id: true, createdAt: true, lastMessageAt: true });
export const insertMessageSchema = createInsertSchema(haleyMessages).omit({ id: true, createdAt: true });
export const insertThumbnailSchema = createInsertSchema(haleyThumbnails).omit({ id: true, createdAt: true, uuid: true });
export const insertChatLimitSchema = createInsertSchema(haleyChatLimits).omit({ id: true, createdAt: true });

export type User = typeof haleyUsers.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ChatSession = typeof haleyChatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type Message = typeof haleyMessages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Thumbnail = typeof haleyThumbnails.$inferSelect;
export type InsertThumbnail = z.infer<typeof insertThumbnailSchema>;
export type ChatLimit = typeof haleyChatLimits.$inferSelect;
export type InsertChatLimit = z.infer<typeof insertChatLimitSchema>;
