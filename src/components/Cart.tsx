
import { useState, useEffect, useRef } from "react";
import { CartItems } from "../Types";
import ETAcard from "./ETAcard";

const API_KEY = "yum-7BTxHCyHhzI";
const BASE_URL =
  "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/y0l0/orders";

export default function Cart({
  cartItems,
  clearCart,
}: {
  cartItems: CartItems[];
  clearCart: () => void;
}) {
  const [items, setItems] = useState<CartItems[]>(cartItems);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [eta, setEta] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

 
  const cartRef = useRef<HTMLDivElement>(null);


  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setShowCart(false); 
    }
  };

  
  const handleClose = () => {
    setShowCart(false);
  };

  
  const handleOpen = () => {
    setShowCart(true);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setItems(cartItems);
    }
  }, [cartItems]);

  const increaseQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
    );
  };

  const handleOrder = async () => {
    setOrderSuccess(false);

    const orderItems = items.flatMap((item) =>
      Array(item.quantity).fill(item.id)
    );

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": API_KEY,
        },
        body: JSON.stringify({ items: orderItems }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setEta(
        Math.round((new Date(data.order.eta).getTime() - Date.now()) / 6000)
      );
      setOrderId(data.order.id);
      setOrderSuccess(true);
      setItems([]);
    } catch (error) {
      console.error("order error: could not place order", error);
    }
  };

  const handleNewOrder = () => {
    setOrderSuccess(false);
    setShowCart(false);
    setItems([]);
    clearCart();
  };

  return (
    <div>
      {/* Cart button */}
      <button
        onClick={handleOpen}
        className="fixed top-4 right-4 bg-[#F4F3F1F0] text-white p-2 rounded border-none"
      >
        <img src=".//../../assets/cartbtn.svg" alt="Cart Button" />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#EB5757] text-[#F4F3F1F0] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Cart modal */}
      {showCart && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full"
        >
          <div
            ref={cartRef}
            className={`w-full max-w-md relative flex flex-col items-center justify-center h-full ${
              orderSuccess ? "bg-[#605858]" : "bg-[#EEEEEE] pt-16 p-6"
            }`}
          >
            {!orderSuccess && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-[#EEEEEE] text-white p-2 rounded border-none"
              >
                <img src=".//../../assets/cartbtn.svg" alt="close Button" />
              </button>
            )}

            {orderSuccess ? (
              <ETAcard eta={eta!} orderId={orderId!} onNewOrder={handleNewOrder} />
            ) : (
              <div className="flex flex-col justify-end items-center w-full gap-4">
                {items.length === 0 ? (
                  <div>
                    <p className="text-gray-500 flex justify-center">
                      Din varukorg är tom.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-2 max-h-72 overflow-y-auto ">
                    {items.map((item, index) => (
                      <li
                        key={item.id}
                        className={`border-t-0 border-l-0 border-r-0 ${
                          items.length - 1 !== index && "border-b border-dotted "
                        } flex-grow flex justify-between items-center py-2`}
                      >
                        <div className="w-full">
                          <div className="flex justify-between w-full gap-2">
                            <p className="text-[#353131] text-[22px] font-bold flex uppercase">
                              {item.name}
                            </p>
                            <div className="border-t-0 border-l-0 border-r-0 border-b-2 border-dotted flex flex-grow flex-stretch" />
                            <p className="text-[22px] text-[#353131] font-bold flex items-center">
                              {item.price * item.quantity} SEK
                            </p>
                          </div>
                          <div className="w-full flex items-center text-left pt-2">
                            <button
                              className="border-none px-2 py-1"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <img src="./../../assets/Plus.svg" alt="+" />
                            </button>
                            <p className="pb-1 text-[#353131]">
                              {item.quantity} stycken
                            </p>
                            <button
                              className="border-none px-2 py-1"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <img src="./../../assets/minus.svg" alt="-" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {items.length > 0 && (
                  <div className="flex flex-col justify-center items-center ">
                    <div className="mt-4 bg-[#3531313D] p-4 gap-2 rounded flex justify-between w-full">
                      <div className="flex-col font-bold">
                        <h3 className="text-[22px] text-[#353131]">TOTALT</h3>
                        <h3 className="text-[16px] text-[#353131]">inkl 20% moms</h3>
                      </div>
                      <h3 className="text-[#353131] text-[32px] flex items-center">
                        {total} SEK
                      </h3>
                    </div>
                    <button
                      onClick={handleOrder}
                      className="text-[24px] font-bold w-full mt-4 bg-[#353131] text-white py-6 px-4 rounded shadow-"
                    >
                      TAKE MY MONEY!
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
