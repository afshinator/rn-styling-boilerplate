// constants/currency.ts

export const EXCHANGE_RATE_API_BASE_URL = 'https://open.er-api.com/v6/latest/USD'

/**
 * Supported currency codes for CoinGecko API
 */
export type CurrencyCode = 
  | 'usd' | 'aed' | 'ars' | 'aud' | 'bdt' | 'bhd' | 'bmd' | 'brl' | 'cad' 
  | 'chf' | 'clp' | 'cny' | 'czk' | 'dkk' | 'eur' | 'gbp' | 'gel' | 'hkd' 
  | 'huf' | 'idr' | 'ils' | 'inr' | 'jpy' | 'krw' | 'kwd' | 'lkr' | 'mmk' 
  | 'mxn' | 'myr' | 'ngn' | 'nok' | 'nzd' | 'php' | 'pkr' | 'pln' | 'rub' 
  | 'sar' | 'sek' | 'sgd' | 'thb' | 'try' | 'twd' | 'uah' | 'vef' | 'vnd' 
  | 'zar' | 'xdr' | 'xag' | 'xau' | 'btc' | 'eth' | 'ltc' | 'bch' | 'bnb' 
  | 'eos' | 'xrp' | 'xlm' | 'link' | 'dot' | 'yfi';


export type SupportedCurrency = 
  | 'usd' // US Dollar
  | 'eur' // Euro
  | 'gbp' // British Pound
  | 'jpy' // Japanese Yen
  | 'cny' // Chinese Yuan
  | 'inr' // Indian Rupee
  | 'aud' // Australian Dollar
  | 'cad' // Canadian Dollar
  | 'ngn' // Nigerian Naira
  | 'try' // Turkish Lira


export const DEFAULT_CURRENCY: SupportedCurrency = 'usd';

export const CURRENCY_DISPLAY_NAMES: Record<SupportedCurrency, string> = {
  usd: 'US Dollar',
  eur: 'Euro',
  gbp: 'British Pound',
  jpy: 'Japanese Yen',
  cny: 'Chinese Yuan',
  inr: 'Indian Rupee',
  aud: 'Australian Dollar',
  cad: 'Canadian Dollar',
  ngn: 'Nigerian Naira',
  try: 'Turkish Lira',
};

/**
 * Number formatting thresholds
 */
const TRILLION = 1e12;
const BILLION = 1e9;
const MILLION = 1e6;

/**
 * Formatting precision constants
 */
export const FIAT_DECIMAL_PLACES = 2;
export const CRYPTO_DECIMAL_PLACES = 8;

/**
 * Maps currency codes to their display symbols
 */
export const CURRENCY_SYMBOLS: { [key: string]: string } = {
  // Fiat currencies
  usd: '$',
  eur: '€',
  gbp: '£',
  jpy: '¥',
  cny: '¥',
  krw: '₩',
  inr: '₹',
  rub: '₽',
  aud: 'A$',
  cad: 'C$',
  chf: 'CHF',
  brl: 'R$',
  mxn: 'MX$',
  zar: 'R',
  ngn: '₦',
  try: '₺',
  // Crypto currencies
  btc: '₿',
  eth: 'Ξ',
  ltc: 'Ł',
  bch: 'BCH',
  bnb: 'BNB',
  xrp: 'XRP',
};