import { IFeature } from './feature';

export class IProduct {
    $key: string;
    name: boolean;
    shortDescription: string;
    longDescriptions: string;
    features: IFeature[];

    currency: string;
    price = 0.0;
    taxPer = 0.0;
    discount = 0.0;
    discountPrice = 0.0;
    finalPrice = 0.0;

    includes: string;
    isHot: boolean;
    enabled: boolean;

}
