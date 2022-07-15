import {Product} from"src/Product/entities/product.entity"
import { Bag } from "src/Bag/entities/bag.entity";
import { User } from "src/User/entities/user.entity";

export class Transaction {
  id?: string;
  userID?:User;
  bagID?:Bag;
  methodOfPayment:string;
  installments:number;
  totalPayable?:number;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
