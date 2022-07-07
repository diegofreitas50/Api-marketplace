import { User } from "src/User/entities/user.entity"
import{Category} from"src/Category/entities/category.entity"
import {Bag} from "src/"

export class Product {
  id?: string;
  title:string;
  description:string;
  imgURL:string
  new:Boolean;
  price:number;
  sold:Boolean;
  user?:User;
  category?:Category;
  bag?:Bag;
  createdAt?: Date;
  updatedAt?: Date;
}

