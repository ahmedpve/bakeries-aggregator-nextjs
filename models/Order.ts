import { Bakery } from "./Bakery";
import { CartProduct } from "./CartProduct";

export type OrderType = {
  id: string;
  date: string;
  products: CartProduct[];
  isCompleted: boolean;
  rating: number;
  bakery: Bakery;
  user: string;
};
