import { useEffect, useState } from 'react';
import { InputWrapper } from "@/components/input-wrapper"
import { fetchCurrencies } from '@/lib/fetch-currencies';
import { convertCurrencies } from '@/lib/convert-currencies';
import type { Currency } from '@/types';

function App() {
    const [currencyList, setCurrencyList] = useState<Currency[]>([]);
    const [amount, setAmount] = useState('');
    const [fromCode, setFromCode] = useState('');
    const [toCode, setToCode] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        // do this call in here and pass it down via props so the api call is only made once
        fetchCurrencies()
            .then((res) => {
                setCurrencyList(res);
            })
    }, []);

    function handleConvert() {
        convertCurrencies({ from: fromCode, to: toCode, amount: parseFloat(amount) })
            .then((value) => {
                // set the result to state so it can be passed down via props
                setResult(String(value));
            })
            .catch(() => {
                // again hide the actual error response from users, but in reality would log err somewhere
                console.error('error converting the currencies');
            })
    }

    return (
        <>
        <main className="p-4 min-h-screen w-full bg-white">
            <h1 className="text-2xl font-bold mt-8 mb-4">Currency Converter</h1>
            <p className="text-lg font-semibold mb-4">Use the inputs below to choose currency to convert from/to</p>
            <section className="flex w-full min-w-0 flex-col gap-4 mb-8">
                <InputWrapper 
                    type="from" 
                    currencies={currencyList} 
                    amount={amount}
                    currencyCode={fromCode}
                    onAmountChange={setAmount}
                    onCurrencyChange={setFromCode}
                />
                {/* this one just shows result so readOnly */}
                <InputWrapper 
                    type="to" 
                    currencies={currencyList}
                    amount={result}
                    currencyCode={toCode}
                    onCurrencyChange={setToCode}
                    readOnly
                />
            </section>
            <button className="w-full max-w-full rounded-md px-8 py-4 bg-sky-500 text-white font-bold sm:w-auto cursor-pointer" onClick={handleConvert}>Convert Currency</button>
        </main>
        </>
    )
}

export default App
