import { View, StyleSheet } from "react-native";

import { TIMESLOT_LABELS } from "../../constants/timeslots";
import { Meal } from "../../types/meals";
import MealsSection from "./section";

interface Props {
  meals: Meal[][];
}

function MealsSections({ meals }: Props) {
  return (
    <View style={styles.container}>
      <MealsSection title={TIMESLOT_LABELS[0]} meals={meals[0] || []} />
      <MealsSection title={TIMESLOT_LABELS[1]} meals={meals[1] || []} />
      <MealsSection title={TIMESLOT_LABELS[2]} meals={meals[2] || []} />
      <MealsSection title={TIMESLOT_LABELS[3]} meals={meals[3] || []} />
      <MealsSection title={TIMESLOT_LABELS[4]} meals={meals[4] || []} />
    </View>
  );
}

export default MealsSections;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});
