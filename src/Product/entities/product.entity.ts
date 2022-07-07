import { User } from "src/User/entities/user.entity"
import{Category} from"src/Category/entities/category.entity"
<<<<<<< HEAD
import {Bag} from "src/"
=======
import {Bag} from "src/Bag/entities/bag.entity"
//import {bag} from ""
>>>>>>> c9d2a9a705b2a2b566da33c12fc9f568f40c4034

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

