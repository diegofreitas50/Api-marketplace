import {Product} from"src/Product/entities/product.entity"
import { User } from "src/User/entities/user.entity";

export class Transaction {
  id?: string;
  UserID?:User;
  methodOfPayment:string;
  installments:number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
