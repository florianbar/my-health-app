import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../../constants/colors";

interface Props {
  children: string | JSX.Element;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
}

function TextButton({ children, onPress, iconName }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {iconName && <Ionicons name={iconName} size={18} style={styles.icon} />}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginVertical: 12,
    paddingVertical: 6,
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
