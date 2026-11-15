import { describe, expect, it } from "vitest";
import { INSTRUMENTS, UNIVERSE } from "./universe";
import { quoteSchema } from "./schemas";

describe("universo", () => {
  it("tem 47 ativos: 15 ações, 12 FIIs, 10 BDRs, 10 stocks", () => {
    const count = (c: string) => UNIVERSE.filter((a) => a.cls === c).length;
    expect(UNIVERSE).toHaveLength(47);
    expect([count("acoes"), count("fiis"), count("bdrs"), count("stocks")]).toEqual([
      15, 12, 10, 10,
    ]);
  });
  it("símbolos e códigos Yahoo são únicos", () => {
    expect(new Set(UNIVERSE.map((a) => a.symbol)).size).toBe(47);
    expect(new Set(UNIVERSE.map((a) => a.yahoo)).size).toBe(47);
  });
  it("todo BDR tem ativo-lastro e todo ativo B3 termina em .SA no Yahoo", () => {
    for (const a of UNIVERSE) {
      if (a.cls === "bdrs") expect(a.underlying).toBeTruthy();
      if (a.cls !== "stocks") expect(a.yahoo.endsWith(".SA")).toBe(true);
    }
  });
  it("10 instrumentos de mercado do ticker", () => {
    expect(INSTRUMENTS.map((i) => i.symbol)).toEqual([
      "USD/BRL",
      "EUR/BRL",
      "IBOV",
      "IFIX",
      "SMLL",
      "IDIV",
      "BTC",
      "SPX",
      "NDX",
      "SELIC",
    ]);
  });
  it("schema de Quote aceita e rejeita", () => {
    expect(
      quoteSchema.safeParse({ symbol: "PETR4", name: "Petrobras PN", price: 38.9, change: 1.2 })
        .success,
    ).toBe(true);
    expect(
      quoteSchema.safeParse({ symbol: "PETR4", name: "x", price: Number.NaN, change: 0 }).success,
    ).toBe(false);
  });
});
