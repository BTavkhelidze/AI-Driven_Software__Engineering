import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// 1. Validate required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

// 2. Helper to parse the connection string
const parseConnectionString = (url) => {
  // Using the built-in URL constructor is safer and cleaner than regex
  try {
    const connection = new URL(url);
    return {
      user: connection.username,
      password: connection.password,
      host: connection.hostname,
      port: parseInt(connection.port, 10) || 3306,
      database: connection.pathname.substring(1), // Removes the leading '/'
    };
  } catch (error) {
    throw new Error("Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database");
  }
};

const dbConfig = parseConnectionString(process.env.DATABASE_URL);

// 3. Create the Prisma MariaDB Adapter
const adapter = new PrismaMariaDb({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 10,
});

// 4. Export the database client
export const prisma = new PrismaClient({ adapter });