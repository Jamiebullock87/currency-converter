export async function fetchCurrencies() {
    try {
        const res = await fetch('http://localhost:5174/api/currencies');
        if (!res.ok) {
            throw new Error(`Error fetching currencies: ${res.status}`);
        }
        const data = await res.json();
        return data.response ?? [];
    } catch (error) {
        console.error(error);
    }
}