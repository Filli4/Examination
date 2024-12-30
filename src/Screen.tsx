import { useState } from "react";
import WontonCard from "./components/WontonCard";
import DipCard from "./components/DipCard";
import Drink from "./components/DrinkCard";
import Cart from "./components/Cart";
import { CartItems } from "./Types";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  
  const addToCart = (item: CartItems) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="bg-[#489078] min-h-screen grid grid-rows justify-items-center py-20 gap-16">
      <main className=" p-8  flex flex-col gap-1 w-full max-w-md text-center">
        <h1 className="text-[32px] font-bold text-white flex">MENY</h1>
        <WontonCard addToCart={addToCart} />
        <DipCard addToCart={addToCart} />
        <Drink addToCart={addToCart} />
      </main>
      <Cart cartItems={cartItems} clearCart={clearCart} />
    </div>
  );
}