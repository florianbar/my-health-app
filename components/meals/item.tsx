import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../utils/api";
import { api } from "../../utils/api";
import { COLORS } from "../../constants/colors";
import { Meal } from "../../types/meals";

function MealsItem({ meal }: { meal: Meal }) {
  const [editing, setEditing] = useState(false);

  const {
    mutate: removeMeal,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: api.removeMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onSettled: () => {
      setEditing(false);
    },
  });

  function handleLongPress(): void {
    setEditing(true);

    Alert.alert("Remove Meal", "Are you sure you want to remove this meal?", [
      { text: "Cancel", onPress: () => setEditing(false) },
      {
        text: "Remove",
        onPress: () => {
          removeMeal(meal.id);
        },
      },
    ]);
  }

  return (
    <Pressable
      style={[styles.container, editing && styles.containerEditable]}
      onLongPress={handleLongPress}
    >
      {!meal.food.healthy && (
        <View style={[styles.label, styles.labelUnhealthy]} />
      )}

      <Text style={styles.text}>
        {meal.food.name}
        {meal.quantity > 1 && <Text> x {meal.quantity}</Text>}
      </Text>
    </Pressable>
  );
}

export default MealsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: "#eee", // light grey
    borderRadius: 16,
  },
  containerEditable: {
    backgroundColor: "#ddd",
  },
  label: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
  labelUnhealthy: {
    backgroundColor: COLORS.red,
  },
  text: {
    fontSize: 14,
  },
});
