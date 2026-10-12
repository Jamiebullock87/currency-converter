export interface ConvertCurrencyParams {
    from: string;
    to: string;
    amount: number;
}

export async function convertCurrencies(params: ConvertCurrencyParams): Promise<number> {
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
        const value = data?.response?.value;

        if (typeof value !== 'number') {
            throw new Error('Error converting currencies');
        }

        return value;
    } catch (error) {
        // dont pass a detailed error to the user - in practice it would be good to log it for dev
        throw new Error('Error converting currencies');
    }
}
