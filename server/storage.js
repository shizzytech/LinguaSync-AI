import { users, waitlistEntries } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export class DatabaseStorage {
  // User methods
  async getUser(id) {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results.length > 0 ? results[0] : undefined;
  }

  async getUserByEmail(email) {
    const results = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return results.length > 0 ? results[0] : undefined;
  }

  async getUserByUsername(username) {
    const results = await db.select().from(users).where(eq(users.username, username.toLowerCase()));
    return results.length > 0 ? results[0] : undefined;
  }

  async createUser(insertUser) {
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
  async createWaitlistEntry(entry) {
    // Ensure email is lowercase
    const entryToInsert = {
      ...entry,
      email: entry.email.toLowerCase()
    };
    
    const results = await db.insert(waitlistEntries).values(entryToInsert).returning();
    return results[0];
  }

  async getWaitlistEntryByEmail(email) {
    const results = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, email.toLowerCase()));
    return results.length > 0 ? results[0] : undefined;
  }

  async getAllWaitlistEntries() {
    return db.select().from(waitlistEntries);
  }
}

export const storage = new DatabaseStorage();