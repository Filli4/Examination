import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrderDetails from "./components/OrderDetails";
import { getMenu, createOrder } from "./api"; // Replace with actual API
import { Wonton, Dip, Drink, CartItem, OrderDetailsData, ProductType } from './Type'; // Import types from Type.tsx

// Define the types for the component state
type CurrentView = "menu" | "cart" | "eta" | "orderDetails"; // Possible views

const Screen = () => {
  // State variables with types
  const [menu, setMenu] = useState<(Wonton | Dip | Drink)[]>([]); // State for menu items
  const [cart, setCart] = useState<CartItem[]>([]); // State for cart items
  const [currentView, setCurrentView] = useState<CurrentView>("menu"); // Current view (menu/cart/eta/orderDetails)
  const [orderId, setOrderId] = useState<string | null>(null); // Tracks the order ID
  const [loading, setLoading] = useState<boolean>(false); // Loading state for order creation
  const [error, setError] = useState<string | null>(null); // Error state for order creation

  // Fetch menu on load
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenu();
        setMenu(menuData.items); // Assuming `menuData.items` is an array of `Wonton | Dip | Drink`
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Add an item to the cart
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

  // Remove an item from the cart
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
      // Calculate the total order value
      const orderValue = cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.amount, 0);
  
      // Transform the cart items to match the API format
      const formattedItems = cart.map((cartItem) => {
        const { item } = cartItem;
  
        // Ensure correct type assignment
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
          type: itemType,  // Correct item type as string
          name: item.name,
          description: item.description,
          price: item.price,
          ingredients: item.ingredients || [], // Only Wonton has ingredients, so it’s optional
        };
      });
  
      // Construct the order payload with the correct format (no id field here)
      const orderPayload = {
        items: formattedItems,  // Ensure 'items' is an array
        orderValue, // Use calculated order value instead of total
      };
  
      // Log the order payload before sending to the API for debugging
      console.log("Order payload:", JSON.stringify(orderPayload));
  
      // Make the API request
      const tenantId = "your-tenant-id"; // Replace with actual tenant ID
      const newOrder = await createOrder(tenantId, orderPayload);
  
      // Set the order ID and navigate to ETA view
      setOrderId(newOrder.id);  // Assuming the API returns an 'id' field for the created order
      setCurrentView("eta"); // Navigate to ETA view
    } catch (error) {
      console.error("Failed to create order:", error);
      setError("There was an issue creating your order. Please try again.");
    }
    setLoading(false);
  };
  
  

  // Handle new order
  const handleNewOrder = () => {
    setCart([]);
    setOrderId(null);
    setCurrentView("menu"); // Navigate back to menu
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.amount, 0);

  return (
    <div className="relative h-screen">
      {/* Cart Button in the Top Right */}
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCurrentView(currentView === "cart" ? "menu" : "cart")}
      >
        🛒 Cart ({totalItems})
      </button>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="text-white text-xl">Processing Order...</div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-10 left-0 w-full text-center text-red-600 bg-white p-2">
          {error}
        </div>
      )}

      {/* Current View */}
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
