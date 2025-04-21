import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface ButtonProps {
  type?: "primary" | "secondary" | "warning" | "text";
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  type = "primary",
  label,
  icon,
  onClick,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
}) => {
  const handlePress = (e: GestureResponderEvent) => {
    if (!disabled && !isLoading) {
      onClick?.();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        type === "warning" && styles.warningButton,
        (disabled || isLoading) && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
    >
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.labelText, textStyle]}>{label}</Text>
      </View>

      {isLoading && (
        <View style={styles.spinnerOverlay}>
          <ActivityIndicator color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    position: "relative",
    minHeight: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "blue",
    borderRadius: 8,
  },
  imageButton: {
    width: 300,
  },
  warningButton: {
    backgroundColor: "#FFA500",
    borderRadius: 40,
  },
  textPadding: {
    paddingHorizontal: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textPrimary: {
    color: "#007AFF",
  },
  textWhite: {
    color: "#FFF",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
  spinnerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shadowImage: {
    position: "absolute",
    bottom: "6%",
    left: "50%",
    transform: [{ translateX: -0.5 }],
    resizeMode: "contain",
  },
  primaryImage: {
    position: "relative",
    resizeMode: "contain",
  },
  secondaryImage: {
    position: "relative",
    resizeMode: "contain",
  },
});

export default Button;
