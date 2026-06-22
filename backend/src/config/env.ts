import {z} from "zod";
import dotenv from "dotenv";
 
dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("5000"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    NODE_ENV: z.enum(["development","production","test"]).default("development")
});

const parsed  = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;