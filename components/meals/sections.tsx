import { View, StyleSheet } from "react-native";

import { TIMESLOT_LABLES } from "../../utils/meals";
import { Meal } from "../../types/meals";
import MealsSection from "./section";

interface Props {
  meals: Meal[][];
}

function MealsSections({ meals }: Props) {
  return (
    <View style={styles.container}>
      <MealsSection title={TIMESLOT_LABLES.breakfast} meals={meals[0] || []} />
      <MealsSection
        title={TIMESLOT_LABLES.morningSnack}
        meals={meals[1] || []}
      />
      <MealsSection title={TIMESLOT_LABLES.lunch} meals={meals[2] || []} />
      <MealsSection
        title={TIMESLOT_LABLES.afternoonSnack}
        meals={meals[3] || []}
      />
      <MealsSection title={TIMESLOT_LABLES.dinner} meals={meals[4] || []} />
    </View>
  );
}

export default MealsSections;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});
