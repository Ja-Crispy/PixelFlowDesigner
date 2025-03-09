import { 
  type Session, 
  type InsertSession,
  type UserPreferences,
  type InsertPreferences
} from "@shared/schema";

export interface IStorage {
  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getSessions(): Promise<Session[]>;
  getRecentSessions(limit: number): Promise<Session[]>;
  
  // Preferences operations
  getPreferences(): Promise<UserPreferences>;
  updatePreferences(prefs: InsertPreferences): Promise<UserPreferences>;
}

export class MemStorage implements IStorage {
  private sessions: Session[];
  private preferences: UserPreferences;
  private currentId: number;

  constructor() {
    this.sessions = [];
    this.currentId = 1;
    this.preferences = {
      id: 1,
      theme: "minimalist",
      character: "cat",
      soundEnabled: "true",
      volume: 50
    };
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const session: Session = {
      id: this.currentId++,
      timestamp: new Date(),
      ...insertSession
    };
    this.sessions.push(session);
    return session;
  }

  async getSessions(): Promise<Session[]> {
    return this.sessions;
  }

  async getRecentSessions(limit: number): Promise<Session[]> {
    return this.sessions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getPreferences(): Promise<UserPreferences> {
    return this.preferences;
  }

  async updatePreferences(prefs: InsertPreferences): Promise<UserPreferences> {
    this.preferences = {
      ...this.preferences,
      ...prefs
    };
    return this.preferences;
  }
}

export const storage = new MemStorage();
