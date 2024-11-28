import axios from 'axios';
import { OrderDetailsData, CartItem, Wonton, Dip, Drink } from './Type'; // Import the relevant types

const API_BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';
const API_KEY = 'yum-toeJ8M4AzH5F1cFK'; // Your API key

// Function to get the menu
export const getMenu = async (): Promise<(Wonton | Dip | Drink)[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menu`, {
      headers: { 'x-zocom': API_KEY },
    });
    console.log("Menu fetched:", response.data);
    return response.data; // Assuming the response contains the menu items in the expected format
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    throw new Error('Failed to fetch menu.');
  }
};

// Function to create an order
export const createOrder = async (tenantId: string, orderData: CartItem[]): Promise<any> => {
  if (!tenantId) {
    console.error("Tenant ID is required.");
    throw new Error("Tenant ID is required.");
  }

  if (!orderData || orderData.length === 0) {
    console.error("Order data is required and cannot be empty.");
    throw new Error("Order data is required and cannot be empty.");
  }

  try {
    console.log("Sending order data:", JSON.stringify(orderData, null, 2)); // Log the full order data for inspection

    const response = await axios.post(
      `${API_BASE_URL}/${tenantId}/orders`, // Adjust the URL if necessary
      { items: orderData },
      {
        headers: {
          'x-zocom': API_KEY, // Custom header for authorization or API key
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Order created successfully:", response.data);
    return response.data; // Return the response for further use
  } catch (error: any) {
    if (error.response) {
      console.error(`Error creating order: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error("Error in request:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    throw new Error("Failed to create order.");
  }
};

// Function to get orders for a tenant
export const getOrders = async (tenantId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${tenantId}/orders`,
      {
        headers: { 
          'x-zocom': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Returns a list of orders
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error('Failed to fetch orders.');
  }
};

// Function to get details of a specific order
export const getOrderDetails = async (orderId: string): Promise<OrderDetailsData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
      headers: { 'x-zocom': API_KEY },
    });
    return response.data; // Assuming response contains the order data in the expected structure
  } catch (error) {
    console.error('Failed to fetch order details:', error);
    throw new Error('Failed to fetch order details.');
  }
};
