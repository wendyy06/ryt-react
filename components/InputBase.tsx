import type { PropsWithChildren } from "react";
import { View, TextInput, Text } from "react-native";

export interface InputProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  errormsg?: string;
  field?: any;
}

const Input = ({
  label,
  required,
  errormsg,
  field,
}: PropsWithChildren<InputProps>) => {
  return (
    <View style={{ marginVertical: 5, width: "100%" }}>
      <View className="flex flex-col gap-1">
        {label && (
          <View style={{ display: "flex", gap: 2 }}>
            <Text>{label}</Text>
            {required && <Text className="text-red-600">*</Text>}
          </View>
        )}
        <TextInput></TextInput>
      </View>
      <Text style={errormsg && { marginTop: 2, color: "red", fontSize: 12 }}>
        {errormsg}
      </Text>
    </View>
  );
};

export default Input;
