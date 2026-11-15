import { z } from "zod";
import type { Quote, ScreenerRow, CalendarEvent, Article } from "./index";

export const quoteSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  price: z.number().finite(),
  change: z.number().finite(),
  currency: z.string().optional(),
  spark: z.array(z.number().finite()).optional(),
}) satisfies z.ZodType<Quote>;

export const screenerRowSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  cls: z.enum(["acoes", "fiis", "bdrs", "stocks"]),
  market: z.string(),
  sector: z.string(),
  currency: z.string(),
  price: z.number().finite(),
  change: z.number().finite(),
  dy: z.number().finite(),
  pl: z.number().finite().nullable(),
  pvp: z.number().finite(),
  margin: z.number().finite(),
  roe: z.number().finite(),
  marketCap: z.number().finite(),
  volume: z.number().finite(),
  vacancy: z.number().finite().optional(),
}) satisfies z.ZodType<ScreenerRow>;

export const calendarEventSchema = z.object({
  id: z.string().optional(),
  date: z.string(),
  time: z.string(),
  country: z.enum(["BR", "US", "CN"]),
  indicator: z.string(),
  frequency: z.string(),
  impact: z.enum(["Alto", "Médio", "Baixo"]),
  note: z.string(),
  actual: z.string().optional(),
  forecast: z.string().optional(),
  previous: z.string().optional(),
}) satisfies z.ZodType<CalendarEvent>;

export const articleSchema = z.object({
  slug: z.string().min(1),
  tag: z.string(),
  category: z.string().optional(),
  title: z.string().min(1),
  lead: z.string(),
  excerpt: z.string(),
  minutes: z.number().int().nonnegative(),
  image: z.string(),
  date: z.string(),
  author: z.string(),
  source: z.string(),
  body: z.array(z.string()),
  externalUrl: z.string().optional(),
  publishedAt: z.string().optional(),
}) satisfies z.ZodType<Article>;
