import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const timerSessions = pgTable("timer_sessions", {
  id: serial("id").primaryKey(),
  duration: integer("duration").notNull(), // in seconds
  type: text("type").notNull(), // pomodoro, flow, custom
  completed: integer("completed").notNull(), // number of completed cycles
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  theme: text("theme").notNull().default("minimalist"),
  character: text("character").notNull().default("cat"),
  soundEnabled: text("sound_enabled").notNull().default("true"),
  volume: integer("volume").notNull().default(50),
});

export const insertSessionSchema = createInsertSchema(timerSessions).omit({ 
  id: true,
  timestamp: true 
});

export const insertPreferencesSchema = createInsertSchema(userPreferences).omit({ 
  id: true 
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof timerSessions.$inferSelect;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertPreferences = z.infer<typeof insertPreferencesSchema>;
