import { create } from "zustand";

import { MealStoreState } from "./types";

const today = new Date().toISOString().split("T");

const initialState = {
  selectedDate: today[0],
  selectedTime: today[1],
};

const useMealsStore = create<MealStoreState>((set, get) => ({
  ...initialState,

  actions: {
    prevDay: () => {
      const date = new Date(get().selectedDate);
      date.setDate(date.getDate() - 1);
      const dateString = date.toISOString().split("T")[0];

      set({ selectedDate: dateString });
    },

    nextDay: () => {
      const date = new Date(get().selectedDate);
      date.setDate(date.getDate() + 1);
      const dateString = date.toISOString().split("T")[0];

      set({ selectedDate: dateString });
    },

    selectTime: (time: string) => {
      set({ selectedTime: time });
    },
  },
}));

export default useMealsStore;
