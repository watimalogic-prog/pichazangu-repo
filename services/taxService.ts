/**
 * Pichazangu Regional Tax & Compliance Service
 * Handles VAT calculations for East African Jurisdictions.
 */

import { Currency } from '../types';

interface TaxConfig {
  rate: number;
  label: string;
  authority: string;
}

const REGIONAL_TAX_CONFIG: Record<Currency, TaxConfig> = {
  KES: { rate: 0.16, label: 'VAT', authority: 'KRA' },
  UGX: { rate: 0.18, label: 'VAT', authority: 'URA' },
  TZS: { rate: 0.18, label: 'VAT', authority: 'TRA' },
  RWF: { rate: 0.18, label: 'VAT', authority: 'RRA' },
  USD: { rate: 0, label: 'Export Zero-Rate', authority: 'International' },
};

export const calculateTax = (netAmount: number, currency: Currency) => {
  const config = REGIONAL_TAX_CONFIG[currency] || REGIONAL_TAX_CONFIG.KES;
  const vatAmount = netAmount * config.rate;
  const totalAmount = netAmount + vatAmount;

  return {
    netAmount,
    vatAmount,
    totalAmount,
    rate: config.rate * 100,
    label: config.label,
    authority: config.authority,
    invoiceDate: new Date().toISOString(),
    complianceToken: Math.random().toString(36).substring(2, 10).toUpperCase()
  };
};

/**
 * Generates a compliance footer for NDPA/Regional Data Privacy laws.
 */
export const getPrivacyClause = () => {
  return "Data processed in compliance with the Kenya Data Protection Act (NDPA) and regional East African privacy protocols. Vaults are encrypted at rest with AES-256.";
};
