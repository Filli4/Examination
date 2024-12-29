/* import axios from 'axios';
import { Product, CartItem, Wonton, Dip, Drink } from './Types'; // Import the relevant types

const API_BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';
const API_KEY = 'yum-toeJ8M4AzH5F1cFK'; // Your API key

// Function to get the menu
export const getMenu = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menu`, {
      headers: { 'x-zocom': API_KEY },
    });
    
    return response.data.items; // Assuming the response contains the menu items in the expected format
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    throw new Error('Failed to fetch menu.');
  }
};

// Function to create an order
export const createOrder = async (tenantId: string, orderData: { items: CartItem[]; orderValue: number }): Promise<any> => {
  
  
  

  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/y0l0/orders`,
     
      {
        headers: {
          'x-zocom': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Order created successfully:", response.data);
    return response.data;
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
 */