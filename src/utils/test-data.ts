import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Load a JSON test-data file from the test-data/ directory.
 *
 * @example
 *   const users = loadTestData<UserCredentials[]>("users.json");
 */
export function loadTestData<T>(fileName: string): T {
  const filePath = path.resolve(__dirname, "../../test-data", fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
