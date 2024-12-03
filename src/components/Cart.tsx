import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../Type';

interface CartProps {
  cart: CartItem[];
  addToCart: (item: CartItem['item']) => void;
  removeFromCart: (itemId: number) => void;
  onBackToMenu: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  addToCart,
  removeFromCart,
  onBackToMenu,
}) => {
  const navigate = useNavigate(); // Initialize navigate function

  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.amount,
    0,
  );

  const isCheckoutDisabled = cart.length === 0;

  return (
    <div className="p-6 bg-gray-300 h-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <ul className="flex flex-col">
          {cart.map((cartItem) => (
            <li
              key={cartItem.item.id}
              className="py-2 border-black border-dotted border-b-[1px] border-opacity-50 flex flex-col justify-between items-center w-full"
            >
              <div className="flex justify-between items-center w-full">
                <h2 className="text-xl font-semibold">{cartItem.item.name}</h2>
                <h2>{cartItem.item.price} SEK</h2>
              </div>

              <div className="flex justify-start items-center w-full">
                <button
                  className="bg-gray-400 text-black px-2 rounded-full"
                  onClick={() => removeFromCart(cartItem.item.id)}
                >
                  –
                </button>
                <p className="text-gray-500 mx-1">
                  {cartItem.amount} x {cartItem.item.price} SEK
                </p>
                <button
                  className="bg-gray-400 text-black px-2 rounded-full"
                  onClick={() => addToCart(cartItem.item)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
      <div className="mt-4 text-right flex flex-col">
        <h2 className="text-xl font-bold bg-zinc-400 p-4 flex justify-between rounded">
          Total: <span>{total} SEK</span>
        </h2>

        <button
          className={`mt-2 ${
            isCheckoutDisabled
              ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
              : 'bg-zinc-800 text-white opacity-95'
          } p-4 rounded font-medium text-lg`}
          onClick={() => navigate('/OrderDetails')} // Navigate to OrderDetails page
          disabled={isCheckoutDisabled}
        >
          TAKE MY MONEY!
        </button>
      </div>
    </div>
  );
};

export default Cart;
