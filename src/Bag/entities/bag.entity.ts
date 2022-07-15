import { Product } from "src/Product/entities/product.entity";
import { User } from "src/User/entities/user.entity";

export class Bag {
  id?: string;
  user?:User;
  product?:Product[];
  methodOfPayment?:string;
  installments?:number;
  totalPayable?:number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
