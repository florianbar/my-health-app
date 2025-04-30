import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

import { api } from "../utils/api";
import Meals from "../components/meals";
import IconButton from "../components/ui/buttons/icon-button";
import LoadingSpinner from "../components/ui/loading-spinner";
import useMealsStore from "../stores/meals";

function MealsScreen({ navigation }) {
  const { selectedDate, actions } = useMealsStore((state) => state);
  const { setTimeToNow } = actions;

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["meals", selectedDate],
    queryFn: () => api.fetchMeals(selectedDate),
    staleTime: Infinity,
  });

  function handleAddMeal() {
    setTimeToNow();
    navigation.navigate("add-meal", { name: "" });
  }

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      {isPending && <LoadingSpinner />}

      {!isPending && <Meals meals={data} />}

      <View style={styles.buttonContainer}>
        <IconButton onPress={handleAddMeal}>
          <Ionicons name="add" size={36} color="white" />
        </IconButton>
      </View>
    </View>
  );
}

export default MealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 14,
    right: 14,
  },
});
