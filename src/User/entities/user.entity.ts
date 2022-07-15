import {Product} from"src/Product/entities/product.entity"
import { Bag } from "src/Bag/entities/bag.entity";
import {Transaction} from "src/Transaction/entities/transaction.entity"

export class User {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  product?:Product[];
  bag?:Bag;
  transactions?:Transaction[]
  createdAt?: Date;
  updatedAt?: Date;
}
