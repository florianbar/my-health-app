import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

import { api } from "../utils/api";
import Meals from "../components/meals";
import IconButton from "../components/ui/buttons/icon-button";
import useMealsStore from "../stores/meals";

function MealsScreen({ navigation }) {
  const { selectedDate } = useMealsStore((state) => state);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["meals", selectedDate],
    queryFn: () => api.fetchMeals(selectedDate),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      {isPending && <Text>Loading...</Text>}

      {!isPending && <Meals meals={data} />}

      <View style={styles.buttonContainer}>
        <IconButton
          onPress={() => navigation.navigate("add-meal", { name: "" })}
        >
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
