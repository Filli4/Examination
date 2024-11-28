import React from "react";
import { CartItem } from "../Type"; // Import CartItem type

interface CartProps {
  cart: CartItem[]; // Array of CartItem objects
  addToCart: (item: CartItem) => void; // Function to add item to cart
  removeFromCart: (itemId: number) => void; // Function to remove item from cart
  onCheckout: () => void; // Function to handle checkout
  onBackToMenu: () => void; // Function to navigate back to the menu
}

const Cart: React.FC<CartProps> = ({
  cart,
  addToCart,
  removeFromCart,
  onCheckout,
  onBackToMenu,
}) => {
  // Calculate total price of items in the cart
  const total = cart.reduce(
    (sum, item) => sum + item.item.price * item.amount, // Adjust calculation based on amount (quantity)
    0
  );

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <ul className="space-y-4">
          {cart.map((cartItem) => (
            <li
              key={cartItem.item.id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{cartItem.item.name}</h2>
                <p className="text-gray-500">
                  {cartItem.amount} x {cartItem.item.price} SEK
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removeFromCart(cartItem.item.id)}
                >
                  -
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => addToCart(cartItem)} // Ensure `addToCart` adds a CartItem
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
      <div className="mt-4 text-right">
        <h2 className="text-xl font-bold">Total: {total} SEK</h2>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onCheckout}
        >
          Checkout
        </button>
        <button
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onBackToMenu}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Cart;
