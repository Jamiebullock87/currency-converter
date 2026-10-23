export interface ConvertCurrencyParams {
    from: string;
    to: string;
    amount: number;
}

export async function convertCurrencies(params: ConvertCurrencyParams): Promise<object> {
    try {
        const res = await fetch('http://localhost:5174/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!res.ok) {
            throw new Error(`request badly formed`);
        }

        const data = await res.json(); 

        return data?.response;
    } catch (error) {
        // dont pass a detailed error to the user - in practice it would be good to log it for dev
        throw new Error('Error converting currencies');
    }
}
