export class CreateProdutosDto {
    id: string;

    imagesSsl: string[];
    skus: Object[];
    apiKey: string;
    description: string;
    type: string;
    auditInfo: {
        updatedBy: string;
        updatedThrough: string;
    };
    specs: string[];
    eanCode: String;
    price: String;
    details: {
        name: string;
        brand: string;
        rating: string;
        cod_venda: string;
        precoavista: string;
    }
    remoteUrl: string;
    categories: string[];
    stock: number;
    brand: string;
    customBusiness: string[];
    basePrice: number;
    images: {
        imagem1: string;
        default: string;
    };
    kitProducts: String[];
    created: Date;
    oldPrice: string;
    published: Boolean;
    version: string;
    url: string;
    tags: string[];
    unit: number;
    installment: {
        count: number,
        price: number
    };
    name: string;
    clientLastUpdated: Date;
    extraInfo: {
        hash: string;
    };
    status: String;
    ungroupedId: String;

}
