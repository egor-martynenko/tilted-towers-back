import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface AccountModel extends Base {
}
export declare class AccountModel extends TimeStamps {
    name: string;
    slug: string;
    images: string[];
    tags: string[];
    price: number;
}
