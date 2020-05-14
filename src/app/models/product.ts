export class Product {

    constructor(
        public id: string,
        public providerId: string,
        public name: string,
        public priceHiger: number,
        public priceClient: number
    ) {}
}