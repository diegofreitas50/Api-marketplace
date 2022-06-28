

export class User {
  id?: string;
  name: string;
  cpf: bigint;
  email: string;
  password: string;
  isAdmin: boolean;
  // product: Product[];
  // bag: Bag[];
  createdAt?: Date;
  updatedAt?: Date;
}
