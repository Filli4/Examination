export enum ProductType {
  Wonton = "wonton",
  Dip = "dip",
  Drink = "drink",
}

export type Wonton = {
  id: number;
  type: ProductType.Wonton; // Ensures type is "wonton"
  name: string;
  description: string;
  price: number;
  ingredients: string[]; // Only Wonton has ingredients
};

export type Dip = {
  id: number;
  type: ProductType.Dip; // Ensures type is "dip"
  name: string;
  description: string;
  price: number;
};

export type Drink = {
  id: number;
  type: ProductType.Drink; // Ensures type is "drink"
  name: string;
  description: string;
  price: number;
};

export type CartItem = {
  item: Wonton | Dip | Drink;
  amount: number;
};

export interface OrderDetailsData {
  id: string;
  items: Array<{
    id: number;
    item: Wonton | Dip | Drink;  // Item could be of type Wonton, Dip, or Drink
    quantity: number;
    totalPrice?: number;  // Optional total price if provided by API
  }>;
  orderValue: number;
  eta: string;
}
