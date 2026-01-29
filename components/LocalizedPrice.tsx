
import React from 'react';
import { useCurrencyStore } from '../store/useAppStore';
import { CURRENCY_SYMBOLS } from '../constants';

interface LocalizedPriceProps {
  basePrice: number;
  className?: string;
  showSymbol?: boolean;
}

const LocalizedPrice: React.FC<LocalizedPriceProps> = ({ basePrice, className = "", showSymbol = true }) => {
  const { currency, exchangeRates } = useCurrencyStore();
  const rate = exchangeRates[currency] || 1;
  const converted = Math.round(basePrice * rate);
  const symbol = CURRENCY_SYMBOLS[currency];

  return (
    <span className={className}>
      {showSymbol && <span className="mr-1">{symbol}</span>}
      {converted.toLocaleString()}
    </span>
  );
};

export default LocalizedPrice;
