import React, {
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, StyleSheet } from "react-native";

import useMealsStore from "../../stores/meals";
import { Meal, OrganizedMeals } from "../../types/meals";
import { getMealsByDateAndTime } from "../../utils/meals";
import MealsHeader from "./header";
import MealsSections from "./sections";

interface Props {
  meals: Meal[] | null;
}

const Meals = forwardRef(({ meals }: Props, ref) => {
  const listRef = useRef(null);

  const { selectedDate } = useMealsStore((state) => state);

  const organizedMeals = useMemo<OrganizedMeals[]>(() => {
    if (meals && meals.length === 0) {
      return [];
    }

    const organizedMeals = getMealsByDateAndTime(meals);
    return organizedMeals;
  }, [meals]);

  useImperativeHandle(ref, () => ({
    // Expose a scrollToEnd method to the parent through the ref
    scrollToEnd: () => {
      listRef.current.scrollToEnd({ animated: true });
    },
  }));

  useEffect(() => {
    // Wait for the component to mount and the list to render
    if (listRef.current && organizedMeals.length > 0) {
      setTimeout(() => {
        listRef.current.scrollToEnd({ animated: false });
      }, 10);
    }
  }, [listRef, organizedMeals]);

  return (
    <View style={styles.container}>
      <MealsHeader />
      <MealsSections
        key={selectedDate}
        meals={organizedMeals[0]?.meals || []}
      />
    </View>
  );
});

export default Meals;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
