import { Product } from "src/Product/entities/product.entity";
import { User } from "src/User/entities/user.entity";

export class Bag {
  userId: User;
  productId: Product;
}
