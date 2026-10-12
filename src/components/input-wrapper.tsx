import { CurrencyList } from "@/components/currency-list";
import type { Currency } from '@/types';

interface InputWrapperProps {
    type: 'from' | 'to';
    currencies: Currency[];
    amount: string;
    currencyCode: string;
    onAmountChange?: (amount: string) => void; // optional, only for the input not the result
    onCurrencyChange: (currencyCode: string) => void;
    readOnly?: boolean; // optional for the result input
}

export function InputWrapper({type, currencies, amount, currencyCode, onAmountChange, onCurrencyChange, readOnly = false}:InputWrapperProps) {
    return (
        <div className="flex w-full min-w-0 items-center gap-2 border border-slate-300 rounded-md p-2">
            <div className="w-2/5 min-w-0 border-r border-slate-200 pr-2">
                <input 
                    type="number"
                    value={amount}
                    onChange={readOnly ? undefined : (e) => onAmountChange?.(e.target.value)}
                    readOnly={readOnly}
                    name={`currency-${type}`}
                    id={`currency-${type}`} 
                    className="w-full min-w-0 appearance-none bg-transparent text-base read-only:bg-transparent cursor-pointer read-only:cursor-default" 
                />
            </div>
            <div className="w-3/5 min-w-0">
                <CurrencyList currencies={currencies} type={type} currencyCode={currencyCode} onCurrencyChange={onCurrencyChange} />
            </div>
        </div>
    )
}