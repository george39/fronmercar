export class Product {

    constructor(
        public id: string,
        public providerId: string,
        public name: string,
        public priceHigher: number,
        public priceClient: number
    ) {}
}