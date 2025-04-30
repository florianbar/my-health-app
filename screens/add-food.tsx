import { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button as RNButton,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";

import { api, queryClient } from "../utils/api";
import Input from "../components/ui/form/input";

interface Props {
  navigation: NativeStackNavigationProp<any>;
  route: {
    params: {
      name: string;
    };
  };
}

function AddFoodScreen({ navigation, route }: Props) {
  const [name, setName] = useState<string>(route.params?.name);
  const [isHealthy, setIsHealthy] = useState<boolean>(true);

  const {
    mutate: addFood,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: api.addFood,
    onSuccess: () => {
      resetState();
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      navigation.goBack();
    },
  });

  function resetState() {
    setName("");
    setIsHealthy(true);
  }

  function handleHealthyChange() {
    setIsHealthy((prevValue: boolean) => !prevValue);
  }

  function handleSubmit(name: string, healthy = true): void {
    if (name.trim() === "") {
      Alert.alert("Failed to Add Food", "The food name cannot be empty.", [
        { text: "OK", onPress: () => {} },
      ]);
    }

    addFood({ name, healthy });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RNButton title="Save" onPress={() => handleSubmit(name, isHealthy)} />
      ),
    });
  }, [navigation, name, isHealthy]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Food Name"
            autoFocus
            value={name}
            onChangeText={setName}
          />
        </View>
        <Pressable onPress={handleHealthyChange}>
          <Text>{isHealthy ? "Is healthy" : "Not healthy"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AddFoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
});
