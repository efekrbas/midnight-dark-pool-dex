// Lightweight i18n Localization Engine for Midnight Dark Pool DEX

export type SupportedLanguage = 'en' | 'ja' | 'de';

export interface Translations {
  trade: string;
  portfolio: string;
  analytics: string;
  benchmark: string;
  auditorKey: string;
  connectWallet: string;
  privacyTitle: string;
  orderBookDepth: string;
  mevProtection: string;
  settlementEngine: string;
  launchTerminal: string;
  readSpecs: string;
  tvsTitle: string;
  buy: string;
  sell: string;
  amount: string;
  price: string;
  submitOrder: string;
}

export const dictionary: Record<SupportedLanguage, Translations> = {
  en: {
    trade: "Trade",
    portfolio: "Portfolio",
    analytics: "Analytics",
    benchmark: "ZK Benchmark",
    auditorKey: "Auditor Key",
    connectWallet: "Connect Wallet",
    privacyTitle: "Institutional Privacy Powered by Midnight ZK-SNARKs",
    orderBookDepth: "100% ZK Masked",
    mevProtection: "Zero Front-running",
    settlementEngine: "Instant Finality",
    launchTerminal: "Launch Trading Terminal",
    readSpecs: "View Shielded Analytics",
    tvsTitle: "Total Value Shielded",
    buy: "BUY",
    sell: "SELL",
    amount: "Amount",
    price: "Limit Price",
    submitOrder: "Submit Hidden Order",
  },
  ja: {
    trade: "トレード",
    portfolio: "ポートフォリオ",
    analytics: "アナリティクス",
    benchmark: "ZK ベンチマーク",
    auditorKey: "監査キー",
    connectWallet: "ウォレット接続",
    privacyTitle: "Midnight ZK-SNARKs による機関投資家向けプライバシー",
    orderBookDepth: "100% ZK マスク済み",
    mevProtection: "フロントランニングゼロ",
    settlementEngine: "即時決済",
    launchTerminal: "ターミナルを起動",
    readSpecs: "分析を表示",
    tvsTitle: "保護された総資産額",
    buy: "買い",
    sell: "売り",
    amount: "数量",
    price: "指値価格",
    submitOrder: "非公開注文を送信",
  },
  de: {
    trade: "Handeln",
    portfolio: "Portfolio",
    analytics: "Analysen",
    benchmark: "ZK-Test",
    auditorKey: "Prüfer-Schlüssel",
    connectWallet: "Brieftasche Verbinden",
    privacyTitle: "Institutionelle Privatsphäre mit Midnight ZK-SNARKs",
    orderBookDepth: "100% ZK Maskiert",
    mevProtection: "Null Front-Running",
    settlementEngine: "Sofortige Abwicklung",
    launchTerminal: "Handelsterminal Starten",
    readSpecs: "Geschützte Analysen",
    tvsTitle: "Gesamtwert Geschützt",
    buy: "KAUFEN",
    sell: "VERKAUFEN",
    amount: "Menge",
    price: "Limitpreis",
    submitOrder: "Versteckte Order Senden",
  }
};
