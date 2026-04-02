type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * Lightweight logger for test debugging.
 * Respects a LOG_LEVEL environment variable (default: "info").
 */
class Logger {
  private readonly levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private get threshold(): number {
    const envLevel = (process.env.LOG_LEVEL ?? "info") as LogLevel;
    return this.levels[envLevel] ?? this.levels.info;
  }

  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (this.levels[level] >= this.threshold) {
      const timestamp = new Date().toISOString();
      const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
      console.log(prefix, message, ...args);
    }
  }

  debug(message: string, ...args: unknown[]): void {
    this.log("debug", message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log("info", message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log("warn", message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log("error", message, ...args);
  }
}

export const logger = new Logger();
