export class Venta {
    
    constructor(
       public id: string,
       public name: string,
       public code: string,
       public quantityClient: number,
       public priceClient: number
    ) {}
}