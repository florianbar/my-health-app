import { API_URL } from "@env";
import { Platform } from "react-native";
import { QueryClient } from "@tanstack/react-query";

import { Meal } from "../types/meals";
import { Food } from "../types/foods";

const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  "X-API-KEY": process.env.API_KEY,
};

const getApiUrl = () => {
  if (Platform.OS === "android") {
    // Replace localhost or 127.0.0.1 with 10.0.2.2
    return API_URL.replace(/localhost|127\.0\.0\.1/, "10.0.2.2");
  }
  return API_URL;
};

const BASE_URL = `${getApiUrl()}/api`;

const ENDPOINTS = {
  MEALS: `${BASE_URL}/meals`,
  FOODS: `${BASE_URL}/foods`,
};

export const queryClient = new QueryClient();

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(
      `Error: ${res.status} - ${res.statusText}. Details: ${errorDetails}`
    );
  }

  // Check if the response has a body before parsing as JSON
  const contentType = res.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return undefined;
};

export const api = {
  fetchMeals: async (date: string): Promise<Meal[]> => {
    const res = await fetch(`${ENDPOINTS.MEALS}?date=${date}`, {
      method: "GET",
      headers: REQUEST_HEADERS,
    });
    const data = await handleResponse(res);
    return data.meals;
  },

  addMeals: async (
    meals: { food_id: string; quantity: number; consumed_at: string }[]
  ): Promise<Meal[]> => {
    const res = await fetch(ENDPOINTS.MEALS, {
      method: "POST",
      headers: REQUEST_HEADERS,
      body: JSON.stringify({ meals }),
    });
    const data = await handleResponse(res);
    return data.meals;
  },

  removeMeal: async (id: string): Promise<void> => {
    const res = await fetch(`${ENDPOINTS.MEALS}?id=${id}`, {
      method: "DELETE",
      headers: REQUEST_HEADERS,
    });
    await handleResponse(res);
  },

  fetchFoods: async (): Promise<Food[]> => {
    const res = await fetch(ENDPOINTS.FOODS, {
      method: "GET",
      headers: REQUEST_HEADERS,
    });
    const data = await handleResponse(res);
    return data.foods;
  },

  addFood: async (food: { name: string; healthy: boolean }): Promise<Food> => {
    const res = await fetch(ENDPOINTS.FOODS, {
      method: "POST",
      headers: REQUEST_HEADERS,
      body: JSON.stringify(food),
    });
    const data = await handleResponse(res);
    return data.food;
  },
};
