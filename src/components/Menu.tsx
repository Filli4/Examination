import React from "react";
import { Wonton, Dip, Drink, ProductType } from "../Type"; // Import required types

interface MenuProps {
  menu: (Wonton | Dip | Drink)[]; // The menu is now an array of Wonton, Dip, or Drink
  addToCart: (item: Wonton | Dip | Drink) => void; // addToCart accepts an item of type Wonton, Dip, or Drink
}

const Menu: React.FC<MenuProps> = ({ menu, addToCart }) => {
  // Filter menu items into separate categories
  const wontons = menu.filter((item) => item.type === ProductType.Wonton);
  const dips = menu.filter((item) => item.type === ProductType.Dip);
  const drinks = menu.filter((item) => item.type === ProductType.Drink);

  return (
    <div className="p-4 bg-green-900 bg-opacity-80 min-h-svh flex flex-col gap-3">
    <h2 className="text-2xl font-semibold mt-4">MENY</h2>
      {/* Wonton Section */}
      <div className="bg-zinc-700 rounded-lg text-white w-full mt-2">
        
        <ul>
          {wontons.map((item) => (
            <li
              key={item.id}
              className="hover:bg-zinc-900 hover:opacity-90 "
              onClick={() => addToCart(item)}
            >
              <div className="flex justify-between items-center  p-2 ">
                <h3 className="text-lg font-semibold">{item.name}</h3><span>................</span>
                <span>{item.price} SEK</span>
              </div>
              <div className="m-2 text-sm flex flex-wrap text-gray-300">
                {item.ingredients.map((ingredient, index) => (
                  <p key={index} className="ml-1 list-disc">{ingredient}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Dip Section */}
      <div className="bg-zinc-700 rounded-lg text-white p-2">
        <h2 className="text-2xl font-semibold mb-4 flex justify-between">Dips <span>.................</span> <span>19 SEK</span></h2>
        <ul className="flex flex-wrap justify-between">
          {dips.map((item) => (
            <li
              key={item.id}
              className="hover:bg-zinc-900 hover:opacity-90 bg-zinc-600 bg-opacity-50 m-1 p-2 rounded-md w-fit sm:w-auto text-center"
              onClick={() => addToCart(item)}
            >
              <h3 className="text-lg font-semibold  ">{item.name}</h3>
              
            </li>
          ))}
        </ul>
      </div>

      {/* Drink Section */}
      <div className="bg-zinc-700 rounded-lg text-white p-4">
        <h2 className="text-2xl font-semibold mb-4 flex justify-between">Drinks <span>.............</span> <span>19 SEK</span></h2>
        <ul className="flex flex-wrap justify-between ">
          {drinks.map((item) => (
            <li
              key={item.id}
              className="hover:bg-zinc-900 hover:opacity-90 bg-zinc-600 bg-opacity-50 m-1 p-2 rounded-md w-fit sm:w-auto text-center"
              onClick={() => addToCart(item)}
            >
              <h3 className="text-lg font-semibold">{item.name}</h3>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
