import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../../constants/colors";

interface Props {
  children?: string | JSX.Element;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
}

function TextButton({ children, onPress, iconName }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {iconName && <Ionicons name={iconName} size={20} style={styles.icon} />}
      {children && <Text style={styles.text}>{children}</Text>}
    </Pressable>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    paddingVertical: 2,
  },
  icon: {
    color: COLORS.blue,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.blue,
  },
});
