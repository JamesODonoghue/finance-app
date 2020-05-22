export interface ITransactionItem {
    accountId: string;
    accountOwner: null;
    amount: number;
    authorized_date: null;
    category: string[];
    category_id: string;
    date: string;
    isoCurrencyCode: ISOCurrencyCode;
    location: Location;
    name: string;
    paymentChannel: PaymentChannel;
    paymentMeta: PaymentMeta;
    pending: boolean;
    pending_transaction_id: null;
    transactionCode: null;
    transactionId: string;
    transactionType: TransactionType;
    unofficialCurrencyCode: null;
}

export enum ISOCurrencyCode {
    Usd = 'USD',
}

export interface Location {
    address: null;
    city: null;
    country: null;
    lat: null;
    lon: null;
    postal_code: null;
    region: null;
    store_number: null | string;
}

export enum PaymentChannel {
    InStore = 'in store',
    Other = 'other',
}

export interface PaymentMeta {
    by_order_of: null;
    payee: null;
    payer: null;
    payment_method: null | string;
    payment_processor: null;
    ppd_id: null;
    reason: null;
    reference_number: null;
}

export enum TransactionType {
    Place = 'place',
    Special = 'special',
}
