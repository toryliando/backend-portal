import type { AssetClass } from "./index";

export interface UniverseAsset {
  symbol: string; // código de negociação exibido no portal
  name: string;
  cls: AssetClass;
  market: "Ações B3" | "Fundos Imobiliários" | "BDRs" | "Stocks EUA";
  sector: string;
  currency: "R$" | "US$";
  yahoo: string; // símbolo no Yahoo Finance
  underlying?: string; // BDR: ticker do ativo-lastro nos EUA
}

const acao = (symbol: string, name: string, sector: string): UniverseAsset => ({
  symbol,
  name,
  cls: "acoes",
  market: "Ações B3",
  sector,
  currency: "R$",
  yahoo: `${symbol}.SA`,
});
const fii = (symbol: string, name: string, sector: string): UniverseAsset => ({
  symbol,
  name,
  cls: "fiis",
  market: "Fundos Imobiliários",
  sector,
  currency: "R$",
  yahoo: `${symbol}.SA`,
});
const bdr = (symbol: string, name: string, sector: string, underlying: string): UniverseAsset => ({
  symbol,
  name,
  cls: "bdrs",
  market: "BDRs",
  sector,
  currency: "R$",
  yahoo: `${symbol}.SA`,
  underlying,
});
const stock = (symbol: string, name: string, sector: string): UniverseAsset => ({
  symbol,
  name,
  cls: "stocks",
  market: "Stocks EUA",
  sector,
  currency: "US$",
  yahoo: symbol,
});

export const UNIVERSE: UniverseAsset[] = [
  // 15 Ações B3
  acao("PETR4", "Petrobras PN", "Petróleo e Gás"),
  acao("VALE3", "Vale ON", "Mineração"),
  acao("ITUB4", "Itaú Unibanco PN", "Financeiro e Bancos"),
  acao("BBDC4", "Bradesco PN", "Financeiro e Bancos"),
  acao("BBAS3", "Banco do Brasil ON", "Financeiro e Bancos"),
  acao("WEGE3", "WEG ON", "Bens Industriais"),
  acao("ABEV3", "Ambev ON", "Consumo e Bebidas"),
  acao("B3SA3", "B3 ON", "Financeiro e Bancos"),
  acao("RENT3", "Localiza ON", "Consumo e Serviços"),
  acao("SUZB3", "Suzano ON", "Papel e Celulose"),
  acao("PRIO3", "PRIO ON", "Petróleo e Gás"),
  acao("TAEE11", "Taesa Unit", "Energia Elétrica"),
  acao("CPLE6", "Copel PNB", "Energia Elétrica"),
  acao("MGLU3", "Magazine Luiza ON", "Varejo"),
  acao("BBSE3", "BB Seguridade ON", "Seguros"),
  // 12 FIIs
  fii("HGLG11", "CSHG Logística", "FII - Logística"),
  fii("KNIP11", "Kinea Índices de Preços", "FII - Papel (CRI)"),
  fii("XPML11", "XP Malls", "FII - Shoppings"),
  fii("MXRF11", "Maxi Renda", "FII - Papel (CRI)"),
  fii("BTLG11", "BTG Pactual Logística", "FII - Logística"),
  fii("KNCR11", "Kinea Rendimentos Imobiliários", "FII - Papel (CRI)"),
  fii("VISC11", "Vinci Shopping Centers", "FII - Shoppings"),
  fii("KNRI11", "Kinea Renda Imobiliária", "FII - Híbrido"),
  fii("CPTS11", "Capitânia Securities II", "FII - Papel (CRI)"),
  fii("XPLG11", "XP Log", "FII - Logística"),
  fii("HGRU11", "CSHG Renda Urbana", "FII - Renda Urbana"),
  fii("TRXF11", "TRX Real Estate", "FII - Renda Urbana"),
  // 10 BDRs
  bdr("NVDC34", "Nvidia", "Semicondutores e IA", "NVDA"),
  bdr("AAPL34", "Apple", "Tecnologia", "AAPL"),
  bdr("MSFT34", "Microsoft", "Tecnologia e Cloud", "MSFT"),
  bdr("AMZO34", "Amazon", "Consumo e Cloud", "AMZN"),
  bdr("GOGL34", "Alphabet", "Tecnologia e Mídia", "GOOGL"),
  bdr("META34", "Meta Platforms", "Tecnologia e Redes", "META"),
  bdr("TSLA34", "Tesla", "Automotivo e Energia", "TSLA"),
  bdr("JPMC34", "JPMorgan Chase", "Financeiro e Bancos", "JPM"),
  bdr("COCA34", "Coca-Cola", "Bebidas e Consumo", "KO"),
  bdr("DISB34", "Disney", "Entretenimento", "DIS"),
  // 10 Stocks EUA
  stock("NVDA", "NVIDIA Corporation", "Semicondutores e IA"),
  stock("AAPL", "Apple Inc.", "Tecnologia"),
  stock("MSFT", "Microsoft Corporation", "Tecnologia e Cloud"),
  stock("AMZN", "Amazon.com Inc.", "Consumo e Cloud"),
  stock("GOOGL", "Alphabet Inc. (Google)", "Tecnologia e Mídia"),
  stock("META", "Meta Platforms", "Tecnologia e Redes"),
  stock("TSLA", "Tesla Inc.", "Automotivo e Energia"),
  stock("JPM", "JPMorgan Chase & Co.", "Financeiro e Bancos"),
  stock("LLY", "Eli Lilly and Company", "Saúde e Farmacêutica"),
  stock("AVGO", "Broadcom Inc.", "Semicondutores"),
];

export type InstrumentKind = "index" | "fx" | "crypto" | "rate";

export interface Instrument {
  symbol: string; // como aparece no ticker do portal
  name: string;
  kind: InstrumentKind;
  currency?: "R$" | "US$";
  yahoo?: string;
  brapi?: string;
  bcbSeries?: number;
}

export const INSTRUMENTS: Instrument[] = [
  { symbol: "USD/BRL", name: "Dólar", kind: "fx", currency: "R$", yahoo: "BRL=X" },
  { symbol: "EUR/BRL", name: "Euro", kind: "fx", currency: "R$", yahoo: "EURBRL=X" },
  { symbol: "IBOV", name: "Ibovespa", kind: "index", yahoo: "^BVSP", brapi: "^BVSP" },
  { symbol: "IFIX", name: "IFIX", kind: "index", brapi: "^IFIX" },
  { symbol: "SMLL", name: "Small Caps", kind: "index", brapi: "^SMLL" },
  { symbol: "IDIV", name: "Índice Dividendos", kind: "index", brapi: "^IDIV" },
  { symbol: "BTC", name: "Bitcoin", kind: "crypto", currency: "US$", yahoo: "BTC-USD" },
  { symbol: "SPX", name: "S&P 500", kind: "index", yahoo: "^GSPC" },
  { symbol: "NDX", name: "Nasdaq 100", kind: "index", yahoo: "^NDX" },
  { symbol: "SELIC", name: "Selic Meta", kind: "rate", bcbSeries: 432 },
];
