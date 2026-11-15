// Contratos do frontend (nomes de propriedades idênticos aos do Lovable).
// Respostas da API são JSON CRU nesses formatos; metadados vão em headers.

export const HEADER_UPDATED_AT = "X-Data-Updated-At";
export const HEADER_STALE = "X-Data-Stale";

export interface Quote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  currency?: string;
  spark?: number[];
}

export type MarketKey = "acoes" | "fiis" | "bdrs" | "sp500";

export interface MarketOverviewResponse {
  title: string;
  index: { name: string; value: string; change: number };
  gainers: Quote[];
  losers: Quote[];
}

export type AssetClass = "acoes" | "fiis" | "bdrs" | "stocks";

export interface ScreenerRow {
  symbol: string;
  name: string;
  cls: AssetClass;
  market: string;
  sector: string;
  currency: string;
  price: number;
  change: number;
  dy: number;
  pl: number | null; // null em FIIs
  pvp: number;
  margin: number;
  roe: number;
  marketCap: number;
  volume: number;
  vacancy?: number;
}

export type HistoryRange = "1D" | "5D" | "1M" | "6M" | "1A" | "5A" | "MÁX";

export interface HistoryResponse {
  symbol: string;
  range: HistoryRange;
  series: number[];
}

export interface AssetDetailResponse {
  symbol: string;
  name: string;
  market: string;
  sector: string;
  price: number;
  change: number;
  currency: string;
  low52: number;
  high52: number;
  volume: string | number;
  marketCap: string | number;
  series: number[];
  indicators: { [key: string]: string | number };
}

export type CalendarImpact = "Alto" | "Médio" | "Baixo";
export type CalendarCountry = "BR" | "US" | "CN";

export interface CalendarEvent {
  id?: string;
  date: string;
  time: string;
  country: CalendarCountry;
  indicator: string;
  frequency: string;
  impact: CalendarImpact;
  note: string;
  actual?: string;
  forecast?: string;
  previous?: string;
}

export interface Article {
  slug: string;
  tag: string;
  category?: string;
  title: string;
  lead: string;
  excerpt: string;
  minutes: number;
  image: string;
  date: string;
  author: string;
  source: string;
  body: string[];
  externalUrl?: string; // novo, opcional: link da matéria original
  publishedAt?: string; // novo, opcional: ISO
}

export interface MostReadArticle {
  slug: string;
  title: string;
}

export * from "./universe";
export * from "./schemas";
