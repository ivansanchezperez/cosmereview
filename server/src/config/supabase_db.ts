import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
export const db = drizzle(client);

async function testConnection() {
  try {
    await client`SELECT 1 + 1 AS result`;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testConnection();
