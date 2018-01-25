export class ProductImage {
    $key: string;
    file: File;
    location: string;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
}
