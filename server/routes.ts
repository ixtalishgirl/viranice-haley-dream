import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { insertUserSchema, insertMessageSchema, insertThumbnailSchema, insertChatSessionSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const parsed = insertUserSchema.parse(req.body);
      const user = await storage.createUser(parsed);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/messages", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      const sessionId = req.query.sessionId as string;
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;

      if (sessionId) {
        const messages = await storage.getSessionMessages(sessionId);
        return res.json(messages);
      }

      if (!userId) {
        return res.status(400).json({ error: "userId or sessionId is required" });
      }

      const messages = await storage.getUserMessages(userId, limit, offset);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      const parsed = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(parsed);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.delete("/api/messages/:id", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const deleted = await storage.deleteMessage(req.params.id, userId);
      if (!deleted) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/sessions", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const sessions = await storage.getChatSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/sessions", async (req: Request, res: Response) => {
    try {
      const parsed = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(parsed);
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  app.put("/api/sessions/:id", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const session = await storage.updateChatSession(req.params.id, userId, req.body);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Error updating session:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/sessions/:id", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const deleted = await storage.deleteChatSession(req.params.id, userId);
      if (!deleted) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting session:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/thumbnails", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      const isPublic = req.query.public === "true";

      if (userId) {
        const thumbnails = await storage.getUserThumbnails(userId);
        return res.json(thumbnails);
      }

      if (isPublic) {
        const thumbnails = await storage.getPublicThumbnails();
        return res.json(thumbnails);
      }

      res.json([]);
    } catch (error) {
      console.error("Error fetching thumbnails:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/thumbnails", async (req: Request, res: Response) => {
    try {
      const parsed = insertThumbnailSchema.parse(req.body);
      const thumbnail = await storage.createThumbnail(parsed);
      res.status(201).json(thumbnail);
    } catch (error) {
      console.error("Error creating thumbnail:", error);
      res.status(400).json({ error: "Invalid thumbnail data" });
    }
  });

  app.put("/api/thumbnails/:uuid", async (req: Request, res: Response) => {
    try {
      const thumbnail = await storage.updateThumbnail(req.params.uuid, req.body);
      if (!thumbnail) {
        return res.status(404).json({ error: "Thumbnail not found" });
      }
      res.json(thumbnail);
    } catch (error) {
      console.error("Error updating thumbnail:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/thumbnails/:uuid/views", async (req: Request, res: Response) => {
    try {
      await storage.incrementThumbnailViews(req.params.uuid);
      res.json({ success: true });
    } catch (error) {
      console.error("Error incrementing views:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/chat-limits/:userId", async (req: Request, res: Response) => {
    try {
      const limit = await storage.getChatLimit(req.params.userId);
      const remaining = await storage.getRemainingMessages(req.params.userId);
      const canSend = await storage.checkMessageLimit(req.params.userId);
      
      res.json({
        limit,
        remaining,
        canSend,
      });
    } catch (error) {
      console.error("Error fetching chat limits:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/chat-limits/:userId/increment", async (req: Request, res: Response) => {
    try {
      await storage.incrementMessageCount(req.params.userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error incrementing message count:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/export-messages/:userId", async (req: Request, res: Response) => {
    try {
      const format = req.query.format as string || "json";
      const messages = await storage.getUserMessages(req.params.userId, 10000);

      if (format === "json") {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename="haley-messages-${Date.now()}.json"`);
        res.json(messages);
      } else if (format === "txt") {
        const txtContent = messages
          .map((msg) => {
            const timestamp = new Date(msg.createdAt || "").toLocaleString();
            const role = msg.role.toUpperCase();
            return `[${timestamp}] ${role}:\n${msg.content}\n\n`;
          })
          .join("---\n\n");

        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Content-Disposition", `attachment; filename="haley-messages-${Date.now()}.txt"`);
        res.send(txtContent);
      } else {
        res.status(400).json({ error: "Invalid format. Use ?format=json or ?format=txt" });
      }
    } catch (error) {
      console.error("Error exporting messages:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
