
import { useEffect, useState } from "react";
import { Drink } from "../Types";

const API_KEY = "yum-7BTxHCyHhzI";
const BASE_URL ="https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=drink";



export const DrinkData = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrinkData = async () => {
      try {
        const response = await fetch(BASE_URL, {
          headers: {
            accept: "application/json",
            "x-zocom": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch wonton data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("fetched drink:", data);
        setDrinks(data.items);
      } catch (error) {
        console.error("Error fetching drink data:", error);
        setError("Failed to fetch drink data");
      }
    };

    fetchDrinkData();
  }, []);

  return { drinks, error };
};
