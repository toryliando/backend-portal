import { Hono } from "hono";
import { cors } from "hono/cors";
import { HEADER_STALE, HEADER_UPDATED_AT } from "@portal/contracts";

export type Bindings = {
  APP_ENV?: string;
  ALLOWED_ORIGINS?: string;
};

const DEFAULT_ORIGINS = "http://localhost:3000,http://localhost:5173";

export const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      const allowed = (c.env?.ALLOWED_ORIGINS ?? DEFAULT_ORIGINS)
        .split(",")
        .map((s: string) => s.trim());
      return allowed.includes(origin) ? origin : null;
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: [HEADER_UPDATED_AT, HEADER_STALE],
    maxAge: 86400,
  }),
);

app.get("/health", (c) =>
  c.json({
    status: "ok",
    service: "portal-investidor-api",
    env: c.env?.APP_ENV ?? "dev",
    time: new Date().toISOString(),
  }),
);

app.notFound((c) => c.json({ error: "not_found" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});

export default app;
