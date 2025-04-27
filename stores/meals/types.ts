interface MealStoreProperties {
  selectedDate: string | null;
  selectedTime: string | null;
}

interface MealStoreActions {
  actions: {
    prevDay: () => void;
    nextDay: () => void;
    setTime: (time: string) => void;
    setTimeToNow: () => void;
  };
}

export interface MealStoreState extends MealStoreProperties, MealStoreActions {}
