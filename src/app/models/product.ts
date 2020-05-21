export class Product {

    constructor(
        public _id: string,
        public providerId: string,
        public name: string,
        public priceHigher: number,
        public priceClient: number,
        public image?: string
    ) {}
}