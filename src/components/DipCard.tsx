import { useState } from "react";
import { DipData } from "../Api/Dipapi";
import { Dip, CartItems } from "../Types";

type DipCardProps = {
  addToCart: (items: CartItems) => void;
};

export default function DipCard({ addToCart }: DipCardProps) {
  const { dips } = DipData();
  const [selectedDip, setSelectedDip] = useState<number | null>(null);

  const handleDipClick = (dip: Dip) => {
    setSelectedDip(selectedDip === dip.id ? null : dip.id);
    addToCart({
      id: dip.id,
      name: dip.name,
      price: dip.price,
      quantity: 1,
    });
  };

  return (
    <div className="bg-[#605858] rounded-lg p-4 text-[#F4F3F1F0] mt-6">
      <div className="flex mb-4">
        <h3 className="text-[22px] font-bold ">DIPSÅS</h3>
        <div className="border-t-0 border-l-0 border-r-0 border-b-2 border-dotted flex flex-grow items-start" />
        <h3 className="text-[22px] font-bold ">19 SEK</h3>
      </div>
      <div className="flex flex-wrap justify-between">
        {dips.map((dip) => (
          <div
            key={dip.id}
            onMouseDown={() => {
              setSelectedDip(dip.id); // Sätt till vald dipsås när musen trycks ner
              handleDipClick(dip); // Lägg till i varukorgen
            }}
            onMouseUp={() => setSelectedDip(null)} // Återställ när musen släpps
            onMouseLeave={() => setSelectedDip(null)} // Återställ när musen lämnar elementet
            className={`p-2 my-2 text-center rounded cursor-pointer flex items-center justify-center hover:bg-zinc-700 ${
              selectedDip === dip.id ? "bg-[#353131]" : "bg-[#F1F0EC3D]"
            }`}
          >
            {dip.name}
          </div>
        ))}
      </div>
    </div>
  );
}
