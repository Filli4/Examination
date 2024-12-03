import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderDetails } from "../api"; // Replace with actual API
import { Wonton, Dip, Drink } from "../Type"; // Import types

interface OrderDetailsProps {
  orderId: string | null;
  onNewOrder: () => void;
}

interface OrderDetailsData {
  id: string;
  items: Array<{
    id: number;
    item: Wonton | Dip | Drink;
    quantity: number;
  }>;
  orderValue: number;
  eta: string;
  timestamp: string;
  state: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onNewOrder }) => {
  const [order, setOrder] = useState<OrderDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigate to redirect to the homepage

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const details = await getOrderDetails(orderId); // Assuming API response matches the structure
        setOrder(details);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleNewOrder = () => {
    // Navigate to the homepage and trigger a new order
    navigate("/"); // Redirect to the homepage
    onNewOrder(); // Trigger the function passed via props to reset any necessary state
  };

  return (
    <div className="p-6 bg-zinc-600 text-white min-h-svh">
      <div className="flex flex-col justify-around items-center gap-8">
        <img src="./../../assets/boxtop.png" alt="Box Top" />

        {loading && (
          <div className="text-center">
            <div className="loader">Loading...</div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-lg font-semibold p-4">
            Dina BESTÄLLNING TILLAGAS!
          </h1>
          <p>5 Min</p>
        </div>

        <div className="flex flex-col w-full mt-4 gap-4 text-center">
          <button className="border-[1px] text-white text-opacity-55 text-lg font-semibold p-4 rounded">
            SE KVITTO
          </button>
          <button
            onClick={handleNewOrder} // Call handleNewOrder when the button is clicked
            className="bg-zinc-800 text-white text-opacity-95 text-lg font-semibold p-4 rounded">
            GÖR NY BESTÄLLNING
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
