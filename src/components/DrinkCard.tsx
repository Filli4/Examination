import { useState } from "react";
import { DrinkData } from "../Api/DrinkApi";
import {CartItems, Drink } from "../Types";
type DrinkProps = {
    addToCart: (items: CartItems) => void;
  };
  
  export default function DrinkCard({ addToCart }: DrinkProps) {
    const { drinks } = DrinkData();
    const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  
    const handleDrinkClick = (drink: Drink) => {
      setSelectedDrink(selectedDrink === drink.id ? null : drink.id);
      addToCart({
        id: drink.id,
        name: drink.name,
        price: drink.price,
        quantity: 1,
      });
    };
  
    return (
      <div className="bg-[#605858] rounded-lg p-4 text-[#F4F3F1F0] mt-6">
        <div className="flex mb-4">
          <h3 className="text-[22px] font-bold ">DRICKA</h3>
          <div className="border-t-0 border-l-0 border-r-0 border-b-2 border-dotted flex flex-grow items-start" />
          <h3 className="text-[22px] font-bold ">19 SEK</h3>
        </div>
        <div className="flex flex-wrap justify-between">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              onMouseDown={() => {
                setSelectedDrink(drink.id);
                handleDrinkClick(drink); 
              }}
              
              className={`p-2 my-2 text-center rounded cursor-pointer flex items-center justify-center hover:bg-zinc-700 ${
                selectedDrink === drink.id ? "bg-[#353131]" : "bg-[#F1F0EC3D]"
              }`}
            >
              {drink.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
  