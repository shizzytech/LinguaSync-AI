import { 
  users, 
  waitlistEntries, 
  type User, 
  type InsertUser,
  type WaitlistEntry,
  type InsertWaitlistEntry 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist operations
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results.length > 0 ? results[0] : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return results.length > 0 ? results[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username.toLowerCase()));
    return results.length > 0 ? results[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Ensure email and username are lowercase
    const userToInsert = {
      ...insertUser,
      email: insertUser.email.toLowerCase(),
      username: insertUser.username.toLowerCase()
    };
    
    const results = await db.insert(users).values(userToInsert).returning();
    return results[0];
  }

  // Waitlist methods
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    // Ensure email is lowercase
    const entryToInsert = {
      ...entry,
      email: entry.email.toLowerCase()
    };
    
    const results = await db.insert(waitlistEntries).values(entryToInsert).returning();
    return results[0];
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const results = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, email.toLowerCase()));
    return results.length > 0 ? results[0] : undefined;
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    return db.select().from(waitlistEntries);
  }
}

export const storage = new DatabaseStorage();
