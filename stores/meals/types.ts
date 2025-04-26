interface MealStoreProperties {
  selectedDate: string | null;
  selectedTime: string | null;
}

interface MealStoreActions {
  actions: {
    prevDay: () => void;
    nextDay: () => void;
    selectTime: (time: string) => void;
  };
}

export interface MealStoreState extends MealStoreProperties, MealStoreActions {}
