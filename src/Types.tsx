export enum OrderType {
  Wonton = "wonton",
  Dip = "dip",
  Drink = "drink",
}

//types for the wonton items
export type MenuItems = {
  id: number;
  type: OrderType.Wonton;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
};

//types for the dip items
export type Dip = {
  id: number;
  type: OrderType.Dip;
  name: string;
  description: string;
  price: number;
};

//types for the drinks items
export type Drink = {
  id: number;
  type: OrderType.Drink;
  name: string;
  description: string;
  price: number;
};


//types for the orders
export type Order = {
  id: string;
  items: string[];
  orderValue: number;
  eta: number;
  timestamp: number;
 
};

//types for the cart items
export type CartItems = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
