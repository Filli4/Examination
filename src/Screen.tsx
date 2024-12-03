import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrderDetails from "./components/OrderDetails";
import { getMenu, createOrder } from "./api"; // Replace with actual API
import { Wonton, Dip, Drink, CartItem, OrderDetailsData, ProductType } from './Type'; // Import types from Type.tsx

type CurrentView = "menu" | "cart" | "eta" | "orderDetails"; // Possible views

const Screen = () => {
  const [menu, setMenu] = useState<(Wonton | Dip | Drink)[]>([]); // Menu items state
  const [cart, setCart] = useState<CartItem[]>([]); // Cart state
  const [currentView, setCurrentView] = useState<CurrentView>("menu"); // Current view
  const [orderId, setOrderId] = useState<string | null>(null); // Order ID
  const [loading, setLoading] = useState<boolean>(false); // Loading state for order
  const [error, setError] = useState<string | null>(null); // Error state for order

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenu();
        setMenu(menuData.items); // Assuming menuData.items is an array of Wonton | Dip | Drink
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Add item to the cart
  const addToCart = (item: Wonton | Dip | Drink) => {
    setCart((prevCart) => {
      const exists = prevCart.find((cartItem) => cartItem.item.id === item.id);
      return exists
        ? prevCart.map((cartItem) =>
            cartItem.item.id === item.id
              ? { ...cartItem, amount: cartItem.amount + 1 }
              : cartItem
          )
        : [...prevCart, { item, amount: 1 }];
    });
  };

  // Remove item from the cart
  const removeFromCart = (itemId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, amount: cartItem.amount - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.amount > 0)
    );
  };

  // Handle order creation
  const handleOrderCreation = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const orderValue = cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.amount, 0);
  
      const formattedItems = cart.map((cartItem) => {
        const { item } = cartItem;
  
        // Ensure correct type assignment based on item type
        let itemType: string;
        if (item.type === ProductType.Wonton) {
          itemType = "wonton";
        } else if (item.type === ProductType.Dip) {
          itemType = "dip";
        } else if (item.type === ProductType.Drink) {
          itemType = "drink";
        }
  
        return {
          id: item.id,
          type: itemType,
          name: item.name,
          description: item.description,
          price: item.price,
          ingredients: item.ingredients || [], // Only Wonton has ingredients
        };
      });
  
      const orderPayload = {
        items: formattedItems,
        orderValue,
      };
  
      const tenantId = "your-tenant-id"; // Replace with actual tenant ID
      const newOrder = await createOrder(tenantId, orderPayload);
  
      setOrderId(newOrder.id); // Assuming the API returns an 'id' field for the created order
      setCurrentView("eta");
    } catch (error) {
      console.error("Failed to create order:", error);
      setError("There was an issue creating your order. Please try again.");
    }
    setLoading(false);
  };

  const handleNewOrder = () => {
    setCart([]);
    setOrderId(null);
    setCurrentView("menu"); // Navigate back to menu
  };

  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.amount, 0);

  return (
    <div className="relative h-screen">
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCurrentView(currentView === "cart" ? "menu" : "cart")}
      >
        🛒 Cart ({totalItems})
      </button>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="text-white text-xl">Processing Order...</div>
        </div>
      )}

      {error && (
        <div className="absolute top-10 left-0 w-full text-center text-red-600 bg-white p-2">
          {error}
        </div>
      )}

      {currentView === "menu" && <Menu menu={menu} addToCart={addToCart} />}
      {currentView === "cart" && (
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          onCheckout={handleOrderCreation}
          onBackToMenu={() => setCurrentView("menu")}
        />
      )}
      {currentView === "eta" && (
        <OrderDetails orderId={orderId} onNewOrder={handleNewOrder} />
      )}
    </div>
  );
};

export default Screen;
