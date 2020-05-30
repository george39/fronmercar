export class Product {

    constructor(
        public _id: string,
        public providerId: string,
        public name: string,
        public code: string,
        public quantity: number,
        public priceHigher: number,
        public priceClient: number,
        public image?: string
    ) {}
}