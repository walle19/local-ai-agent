import { readFile } from "node:fs/promises";

const LOG_FILE = new URL(
  "../../data/application-logs.json",
  import.meta.url
);

const ALLOWED_FILTERS = new Set([
  "service",
  "level",
  "query",
  "limit"
]);

export async function searchLogs(args = {}) {
  if (
    args === null ||
    typeof args !== "object" ||
    Array.isArray(args)
  ) {
    throw new Error("Tool arguments must be an object");
  }

  for (const key of Object.keys(args)) {
    if (!ALLOWED_FILTERS.has(key)) {
      throw new Error(`Unsupported filter: ${key}`);
    }
  }

  const { service, level, query } = args;
  const limit = args.limit ?? 10;

  if (
    service !== undefined &&
    (typeof service !== "string" || service.length > 100)
  ) {
    throw new Error("Invalid service filter");
  }

  if (
    level !== undefined &&
    (typeof level !== "string" ||
      !["INFO", "WARN", "ERROR"].includes(level))
  ) {
    throw new Error("Invalid log level");
  }

  if (
    query !== undefined &&
    (typeof query !== "string" || query.length > 200)
  ) {
    throw new Error("Invalid search query");
  }

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 20
  ) {
    throw new Error("Limit must be an integer from 1 to 20");
  }

  const file = await readFile(LOG_FILE, "utf8");
  const logs = JSON.parse(file);

  const matches = logs.filter((log) => {
    if (
      service &&
      log.service.toLowerCase() !== service.toLowerCase()
    ) {
      return false;
    }

    if (level && log.level !== level) {
      return false;
    }

    if (
      query &&
      !log.message.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return {
    totalMatches: matches.length,
    returned: matches.slice(0, limit)
  };
}