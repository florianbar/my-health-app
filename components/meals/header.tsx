import { useMemo } from "react";
import { View, StyleSheet, Button, Text } from "react-native";

import useMealsStore from "../../stores/meals";

const MealsHeader = () => {
  const { selectedDate, actions } = useMealsStore((state) => state);
  const { prevDay, nextDay } = actions;

  const isToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return selectedDate === today;
  }, [selectedDate]);

  return (
    <View style={styles.dateButtonsContainer}>
      <Button title="Prev" onPress={prevDay} />
      <Text style={styles.title}>{isToday ? "Today" : selectedDate}</Text>
      <Button title="Next" onPress={nextDay} />
    </View>
  );
};

export default MealsHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
