import { ActivityIndicator, View, StyleSheet } from "react-native";

import { COLORS } from "../../../constants/colors";

interface Props {
  size?: "small" | "large";
  color?: string;
}

function LoadingSpinner({ size = "large", color = COLORS.blue }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
