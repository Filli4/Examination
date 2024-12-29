/* import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { getMenu } from "./api";
import { Product, CartItem, CurrentView, Wonton, Dip, Drink } from './Types';

const Screen: React.FC = () => {
  const [menu, setMenu] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<CurrentView>("menu");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenu();
        setMenu(menuData); // Directly set menuData to menu state
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item: Wonton | Dip | Drink) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === item.id);
      return existing
        ? prevCart.map((ci) =>
            ci.item.id === item.id
              ? { ...ci, amount: ci.amount + 1, totalPrice: (ci.amount + 1) * ci.item.price }
              : ci
          )
        : [...prevCart, { item, amount: 1, totalPrice: item.price }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((ci) =>
          ci.item.id === itemId
            ? { ...ci, amount: ci.amount - 1, totalPrice: (ci.amount - 1) * ci.item.price }
            : ci
        )
        .filter((ci) => ci.amount > 0)
    );
  };

  const handleOrderCreation = async () => {
    setCurrentView("orderDetails");
  };

  return (
    <div className="relative h-screen">
      <button
        className="absolute top-2 right-2 flex justify-end items-center rounded mt-2"
        onClick={() =>
          setCurrentView((prev) => (prev === "cart" ? "menu" : "cart"))
        }
      >
        <span className="absolute -top-3 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
          {cart.reduce((sum, ci) => sum + ci.amount, 0)}
        </span>
        <img
          src=".//../assets/cartbtn.svg"
          className="bg-gray-300 text-white flex rounded"
          alt="Cart"
        />
      </button>
      {currentView === "menu" ? (
        <div>
          <h2 className="text-2xl font-semibold mt-9 text-white">MENY</h2>
        
          
      

        
        </div>
      ) : (
        <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} onBackToMenu={() => setCurrentView("menu")} />
      )}
    </div>
  );
};

export default Screen;
 */

import { useState } from "react";
import WontonCard from "./components/WontonCard";
import DipCard from "./components/DipCard";
import Drink from "./components/DrinkCard";
import Cart from "./components/Cart";
import { CartItems } from "./Types";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  // Funktion för att lägga till objekt till varukorgen
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
