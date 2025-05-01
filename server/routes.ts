import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { 
  insertUserSchema, 
  insertWaitlistEntrySchema, 
  registerSchema, 
  loginSchema 
} from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import { pool } from "./db";
import connectPgSimple from "connect-pg-simple";

// Define custom session data
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware with PostgreSQL store
  const PgStore = connectPgSimple(session);
  
  app.use(
    session({
      store: new PgStore({
        pool,
        tableName: 'session', // Use 'session' as default table name
        createTableIfMissing: true // Auto-create the sessions table
      }),
      secret: process.env.SESSION_SECRET || "linguasync-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { 
        secure: process.env.NODE_ENV === "production", 
        maxAge: 86400000 // 24 hours
      }
    })
  );

  // API routes
  const apiRouter = express.Router();
  
  // Auth endpoints
  apiRouter.post("/auth/register", async (req: Request, res: Response) => {
    try {
      const data = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      // Create user
      const user = await storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword
      });
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      // Set session
      req.session.userId = user.id;
      
      return res.status(201).json({ 
        message: "User registered successfully", 
        user: userWithoutPassword 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.format() 
        });
      }
      return res.status(500).json({ message: "Error registering user" });
    }
  });

  apiRouter.post("/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set session
      req.session.userId = user.id;
      
      // Don't return password in response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({ 
        message: "Login successful", 
        user: userWithoutPassword 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.format() 
        });
      }
      return res.status(500).json({ message: "Error logging in" });
    }
  });

  apiRouter.post("/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  apiRouter.get("/auth/me", async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching user" });
    }
  });

  // Waitlist endpoints
  apiRouter.post("/waitlist", async (req: Request, res: Response) => {
    try {
      const data = insertWaitlistEntrySchema.parse(req.body);
      
      // Check if email already exists in waitlist
      const existingEntry = await storage.getWaitlistEntryByEmail(data.email);
      if (existingEntry) {
        // Return a 200 status with a message rather than an error
        // This prevents the error modal from showing but still informs the user
        return res.status(200).json({ 
          message: "Email already on waitlist",
          alreadyRegistered: true,
          entry: existingEntry
        });
      }
      
      // Create waitlist entry
      const entry = await storage.createWaitlistEntry(data);
      
      return res.status(201).json({ 
        message: "Added to waitlist successfully",
        entry 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.format() 
        });
      }
      return res.status(500).json({ message: "Error adding to waitlist" });
    }
  });

  apiRouter.get("/waitlist", async (req: Request, res: Response) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      return res.status(200).json({ entries });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching waitlist entries" });
    }
  });

  // Use API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
