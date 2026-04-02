import dotenv from "dotenv";

dotenv.config();

/**
 * Centralized environment configuration.
 * Reads from .env and provides typed access to every setting.
 */
export const config = {
  baseUrl: process.env.BASE_URL ?? "https://www.saucedemo.com",
  env: process.env.ENV ?? "staging",
  headless: process.env.HEADLESS !== "false",
  slowMo: Number(process.env.SLOW_MO ?? 0),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 30000),
  expectTimeout: Number(process.env.EXPECT_TIMEOUT ?? 10000),
  retries: Number(process.env.RETRIES ?? 1),
  workers: Number(process.env.WORKERS ?? 4),
} as const;
