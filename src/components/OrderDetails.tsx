import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../api"; // Replace with actual API
import { Wonton, Dip, Drink } from "../Type"; // Import the relevant item types

interface OrderDetailsProps {
  orderId: string | null; // Ensure orderId can be null
  onNewOrder: () => void; // Function that triggers new order creation
}

interface OrderDetailsData {
  id: string;
  items: Array<{
    id: number;
    item: Wonton | Dip | Drink;
    quantity: number;
    totalPrice?: number; // Optional total price if provided
  }>;
  orderValue: number;
  eta: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onNewOrder }) => {
  const [order, setOrder] = useState<OrderDetailsData | null>(null); // Typing the order state
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  // Fetch order details on orderId change
  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true); // Start loading
        const details = await getOrderDetails(orderId);
        setOrder(details); // Set the fetched order
        setError(null); // Clear error if successful
      } catch (error: any) {
        console.error("Failed to fetch order details:", error);
        setError("Failed to load order details. Please try again."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchOrder();

  }, [orderId]);

  return (
    <div className="p-6 bg-gray-800 text-white h-full">
      <h1 className="text-3xl font-bold mb-4">Din Order</h1>

      {loading && (
        <div className="text-center">
          <div className="loader">Loading...</div> {/* You can replace this with a spinner */}
        </div>
      )}

      {error && !loading && (
        <div className="text-red-500 text-center mt-4">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()} // Allow retry on error
            className="mt-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {order && !loading && !error && (
        <div>
          <h2 className="text-lg">Order ID: {order.id}</h2>
          <ul className="mt-4">
            {order.items.map((item) => (
              <li key={item.id} className="mb-2">
                {/* Show item details */}
                {item.quantity} x {item.item.name} -{" "}
                {item.totalPrice ? item.totalPrice : item.item.price * item.quantity} SEK

                {/* Show ingredients for Wonton items */}
                {item.item.type === "wonton" && (
                  <ul className="mt-2 text-gray-500">
                    <li><strong>Ingredients:</strong></li>
                    {item.item.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg">Total: {order.orderValue} SEK</p>
          <p className="text-sm text-gray-400">ETA: {order.eta}</p>
          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded"
              onClick={() => console.log("Show Receipt")}
            >
              SE KVITTO
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onNewOrder}
            >
              NY BESTÄLLNING
            </button>
          </div>
        </div>
      )}

      {/* Fallback UI for no order */}
      {!order && !loading && !error && (
        <p className="text-center text-gray-400">No order found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
