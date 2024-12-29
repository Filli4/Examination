import { useState } from "react";
import {CartItems,} from "../Types";
import { WontonData } from './../Api/WontonApi';


type WontonCardProps = {
  addToCart: (item: CartItems) => void;
};

export default function WontonCard({ addToCart }: WontonCardProps) {
  const { wontons } = WontonData();
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // Uppdatera till selectedItem

  const handleItemClick = (
    event: React.MouseEvent<HTMLLIElement>,
    wontonId: number
  ) => {
    event.preventDefault();
    setSelectedItem(wontonId);
    addToCart({
      id: wontonId,
      name: wontons.find((w) => w.id === wontonId)?.name || "",
      price: wontons.find((w) => w.id === wontonId)?.price || 0,
      quantity: 1,
    });
    setTimeout(() => {
      setSelectedItem(null);
    }, 100);
  };

  return (
    <div className="relative">
      <ul>
        {wontons.map((wonton, index) => (
          <div
            key={index}
            className={`text-[#F4F3F1F0] border-t-0 border-l-0 border-r-0 ${
              wontons.length - 1 !== index && "border-b border-dotted "
            } flex-grow`}
          >
            <li
              key={wonton.id}
              className={`p-4 flex text-[#F4F3F1F0] cursor-pointer hover:bg-zinc-700 ${
                selectedItem === wonton.id ? "bg-[#353131]" : "bg-[#605858]"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === wontons.length - 1 ? "rounded-b-lg" : ""
              }`}
              onClick={(event) => handleItemClick(event, wonton.id)}
            >
              <div className=" w-full ">
                <div className="flex justify-between w-full gap-2 ">
                  <p className="text-[22px] font-bold flex uppercase ">
                    {wonton.name}
                  </p>
                  <div className="border-t-0 border-l-0 border-r-0 border-b-2 border-dotted flex flex-grow flex-stretch" />
                  <p className="text-[22px] font-bold">{wonton.price} SEK</p>
                </div>
                <div className=" w-full flex text-left pt-2">
                  <p className="text-[#F4F3F1F0] text-sm ">
                    {wonton.ingredients.join(", ")}
                  </p>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
