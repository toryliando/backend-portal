import { describe, expect, it } from "vitest";
import app from "./index";

describe("api base", () => {
  it("GET /health retorna ok", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string };
    expect(body.status).toBe("ok");
  });

  it("rota inexistente retorna 404", async () => {
    const res = await app.request("/nao-existe");
    expect(res.status).toBe(404);
  });

  it("CORS só libera origens da allowlist", async () => {
    const ok = await app.request("/api/x", { headers: { Origin: "http://localhost:5173" } });
    expect(ok.headers.get("access-control-allow-origin")).toBe("http://localhost:5173");
    const bad = await app.request("/api/x", { headers: { Origin: "https://evil.example" } });
    expect(bad.headers.get("access-control-allow-origin")).toBeNull();
  });
});
