import { useEffect, useState } from 'react';
import { InputWrapper } from "@/components/input-wrapper"
import { fetchCurrencies } from '@/lib/fetch-currencies';
import { convertCurrencies } from '@/lib/convert-currencies';
import type { Currency, CurrencyHistory } from '@/types';

function App() {
    const [currencyList, setCurrencyList] = useState<Currency[]>([]);
    const [amount, setAmount] = useState('');
    const [fromCode, setFromCode] = useState('');
    const [toCode, setToCode] = useState('');
    const [result, setResult] = useState(0);
    const [currencyHistory, setCurrencyHistory] = useState<CurrencyHistory[]>([]);

    useEffect(() => {
        // do this call in here and pass it down via props so the api call is only made once
        fetchCurrencies()
            .then((res) => {
                setCurrencyList(res);
            })
    }, []);

    function handleConvert() {
        convertCurrencies({ from: fromCode, to: toCode, amount: parseFloat(amount) })
            .then((response) => {
                // set the result to state so it can be passed down via props
                setResult(response.value);

                handleHistory(response);
                
                console.log('response', response);
            })
            .catch(() => {
                // again hide the actual error response from users, but in reality would log err somewhere
                console.error('error converting the currencies');
            })
    }

    function handleHistory(response: any) {
        const historyItem = [response, ...currencyHistory];

        if (currencyHistory.length < 5) {
            setCurrencyHistory(historyItem);
        } else {
            historyItem.pop();
            setCurrencyHistory(historyItem);
        }


        
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

            <section className="w-full max-w-full px-8 py-4">
                <h3>History</h3>
                <div className="grid grid-cols-4">
                    <p>From Currency</p>
                    <p>From Amount</p>
                    <p>To Currency</p>
                    <p>To Amount</p>
                </div>
                {currencyHistory.map((item, key) => {
                    return (
                        <div key={key} className="grid grid-cols-4 gap-4">
                            <p>{item.from}</p>
                            <p>{item.amount}</p>
                            <p>{item.to}</p>
                            <p>{item.value}</p>
                        </div>
                    )
                })}

            </section>
        </main>
        </>
    )
}

export default App
