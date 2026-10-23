// put the Currency type in here as its used multiple places
export interface Currency {
    id: number,
    name: string,
    short_code: string,
    code: string,
    precision: number,
    subunit: number,
    symbol: string,
    symbol_first: boolean,
    decimal_mark: string,
    thousands_separator: string
}

export interface CurrencyHistory {
    amount: number,
    from: string,
    value: number,
    to: string
}