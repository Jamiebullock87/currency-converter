import type { Currency } from '@/types';

interface CurrencyListProps {
    currencies: Currency[];
    type: 'from' | 'to';
    currencyCode: string;
    onCurrencyChange: (currencyCode: string) => void;
}

export function CurrencyList({currencies, type, currencyCode, onCurrencyChange}:CurrencyListProps) {
    return (
        <select
            className="block w-full min-w-0 max-w-full cursor-pointer"
            value={currencyCode}
            onChange={(e) => onCurrencyChange(e.target.value)}
        >
            <option value="" disabled>Convert {type}</option>
            {/* loop through the currencies we got from the api and populate the select box */}
            {currencies.map((currency) => (
                <option key={currency.id} value={currency.short_code}>
                    {currency.short_code} — {currency.name}
                </option>
            ))}
        </select>
    )
}