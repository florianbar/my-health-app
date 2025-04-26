import { View, Text, StyleSheet } from "react-native";

import { Meal } from "../../types/meals";
import MealsItem from "./item";
import TextButton from "../ui/buttons/text-button";

interface Props {
  title?: string;
  meals: Meal[];
}

function MealsSection({ title, meals }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TextButton iconName="add-outline" onPress={() => {}}>
          Add
        </TextButton>
      </View>
      <View style={styles.mealsContainer}>
        {meals.length > 0 &&
          meals.map((meal) => <MealsItem key={meal.id} meal={meal} />)}

        {meals.length === 0 && <Text style={styles.noMealsText}>No meals</Text>}
      </View>
    </View>
  );
}

export default MealsSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  mealsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },
  noMealsText: {
    fontSize: 14,
    color: "gray",
  },
});
