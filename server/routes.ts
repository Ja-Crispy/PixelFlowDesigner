import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session routes
  app.post("/api/sessions", async (req, res) => {
    const result = insertSessionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const session = await storage.createSession(result.data);
    res.json(session);
  });

  app.get("/api/sessions", async (_req, res) => {
    const sessions = await storage.getSessions();
    res.json(sessions);
  });

  app.get("/api/sessions/recent", async (_req, res) => {
    const sessions = await storage.getRecentSessions(5);
    res.json(sessions);
  });

  // Preferences routes
  app.get("/api/preferences", async (_req, res) => {
    const prefs = await storage.getPreferences();
    res.json(prefs);
  });

  app.patch("/api/preferences", async (req, res) => {
    const result = insertPreferencesSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const prefs = await storage.updatePreferences(result.data);
    res.json(prefs);
  });

  const httpServer = createServer(app);
  return httpServer;
}
