import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm";


@Entity('produtos')
export class ProdutoEntity {
    @PrimaryColumn()
    id: string;

    @Column('json', { nullable: true })
    imagesSsl: string[];
    @Column({ type: 'json', nullable: true })
    skus: Object[];
    @Column({ nullable: true })
    apiKey: string;
    @Column({ nullable: true })
    description: string;
    @Column({ nullable: true })
    type: string;
    @Column('json', { nullable: true })
    auditInfo: {
        updatedBy: string;
        updatedThrough: string;
    };
    @Column('json', { nullable: true })
    specs: string[];
    @Column({ nullable: true })
    eanCode: String;
    @Column({ nullable: true })
    price: String;
    @Column('json', { nullable: true })
    details: {
        name: string;
        brand: string;
        rating: string;
        cod_venda: string;
        precoavista: string;
    }
    @Column({ nullable: true })
    remoteUrl: string;
    @Column('json', { nullable: true })
    categories: Object[];
    @Column({ nullable: true })
    stock: number;
    @Column({ nullable: true })
    brand: string;
    @Column('json', { nullable: true })
    customBusiness: string[];
    @Column({ nullable: true })
    basePrice: number;
    @Column('json', { nullable: true })
    images: {
        imagem1: string;
        default: string;
    };
    @Column('text', { nullable: true, array: true })
    kitProducts: String[];
    @Column({ nullable: true })
    created: Date;
    @Column({ nullable: true })
    oldPrice: string;
    @Column({ nullable: true })
    published: Boolean;
    @Column({ nullable: true })
    version: string;
    @Column({ nullable: true })
    url: string;
    @Column('text', { nullable: true, array: true })
    tags: string[];
    @Column({ nullable: true })
    unit: number;
    @Column('json', { nullable: true })
    installment: {
        count: number,
        price: number
    };
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    clientLastUpdated: Date;
    @Column('json', { nullable: true })
    extraInfo: {
        hash: string;
    };
    @Column({ nullable: true })
    status: String;
    @Column({ nullable: true })
    ungroupedId: String;

}
