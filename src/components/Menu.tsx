import React from "react";
import { Wonton, Dip, Drink, ProductType } from "../Type"; // Import required types

interface MenuProps {
  menu: (Wonton | Dip | Drink)[]; // The menu is now an array of Wonton, Dip, or Drink
  addToCart: (item: Wonton | Dip | Drink) => void; // addToCart accepts an item of type Wonton, Dip, or Drink
}

const Menu: React.FC<MenuProps> = ({ menu, addToCart }) => {
  return (
    <div className="p-6 bg-green-900 bg-opacity-95 h-full">
      <h1 className="text-3xl font-bold mb-4 text-white">MENY</h1>
      <ul className="space-y-4">
        {menu.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-green-100"
            onClick={() => addToCart(item)} // Add item to cart on click
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <span>{item.price} SEK</span>
            </div>
            <p className="text-gray-600">{item.description}</p>

            {/* Display ingredients only for Wonton items */}
            {item.type === ProductType.wonton && (
              <ul className="mt-2 text-gray-500">
                <li><strong>Ingredients:</strong></li>
                {item.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
