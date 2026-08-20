import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { client, getDb } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

export const auth = betterAuth({
  database: mongodbAdapter(getDb(), {
    collectionNames: {
      user: "users",
      session: "sessions",
      account: "accounts",
      verification: "verification"
    }
  }),
  secret: process.env.BETTER_AUTH_SECRET || "a-super-secret-key-of-at-least-32-chars-length",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder"
    }
  },
  advanced: {
    useSecureCookies: true,
    disableCookieCache: true // Bypasses browser cache validations during cross-domain authentication
  },
  cookie: {
    secure: true, // Required for sameSite: "none" in production (HTTPS)
    sameSite: "none"
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "buyer", // Can be: buyer, seller, admin
        input: true
      },
      phone: {
        type: "string",
        required: false,
        input: true
      },
      location: {
        type: "string",
        required: false,
        input: true
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active", // active, blocked
        input: false
      },
      verified: {
        type: "boolean",
        required: false,
        defaultValue: false, // Used for the "Seller Verification Badge" optional feature
        input: false
      }
    }
  },
  // Set trusted origins to allow credential-based requests from frontend
  trustedOrigins: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.CLIENT_URL
  ].filter(Boolean)
});
