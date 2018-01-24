export class IFeature {

    constructor(name: string, shortDescription: string,
        longDescription: string, price: number,
        priceForPersons: number, enabled: boolean) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.price = price;
        this.priceForPersons = priceForPersons;
        this.enabled = enabled;
    }
    $key: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    priceForPersons: number;
    enabled: boolean;
}
