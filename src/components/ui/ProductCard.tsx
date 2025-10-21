import React from "react";
import Button from "./Button.tsx";

export interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  onBuy: () => void;
}

const ProductCard = ({ name, price, image, onBuy }: ProductCardProps) => {
  return (
    <div className="flex-shrink-0 w-[85%] sm:w-[420px] md:w-[700px] bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow snap-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="bg-apple-light-gray rounded-t-xl p-6 h-56 md:h-48 flex items-center justify-center">
          <img src={image} alt={name} className="h-full w-auto object-contain" />
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-center gap-2 items-center">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-apple-gray text-base font-medium">{price}</p>
          <div className="pt-2">
            <Button onBuy={onBuy} label="Buy Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


