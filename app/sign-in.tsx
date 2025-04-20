import * as React from "react";
import { router } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Button from "@/components/Button";
import { Entypo } from "@expo/vector-icons";

import { useSession } from "../ctx";
import { useForm, Controller } from "react-hook-form";
import * as LocalAuthentication from "expo-local-authentication";

interface PhoneInputValue {
  countryCode: string;
  phoneNumber: string;
}

interface FormValues {
  username: string;
  password: string;
}

export default function SignIn() {
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    // defaultValues: { mobile: { countryCode: "MY", phoneNumber: "" } },
  });

  const validatePhoneNumber = (value: String) => {
    if (!value) {
      return "This field is required";
    }
    if (value.startsWith("0")) {
      return "Phone number should not start with '0'";
    }
    return true;
  };

  const isEnrolled = async () => {
    await LocalAuthentication.isEnrolledAsync().then((data) => {
      if (data) {
        LocalAuthentication.authenticateAsync({
          promptMessage: "Login with your Biometric!",
          cancelLabel: "Cancel",
          disableDeviceFallback: true,
        })
          .then((data) => {
            if (data.success) {
              signIn();
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    });
  };

  React.useEffect(() => {
    isEnrolled();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        position: "relative",
      }}
    >
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <View style={{ width: "100%" }}>
              <TextInput
                {...field}
                placeholder="Username"
                style={{
                  borderWidth: 1,
                  borderColor: fieldState.error ? "red" : "grey",
                  padding: 10,
                }}
              />
            </View>
          );
        }}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <View style={{ marginTop: 10, width: "100%" }}>
              <TextInput
                {...field}
                placeholder="Password"
                style={{
                  borderWidth: 1,
                  borderColor: fieldState.error ? "red" : "grey",
                  padding: 10,
                }}
              />
            </View>
          );
        }}
      />

      <Button
        label="Sign In"
        type="primary"
        isLoading={false}
        disabled={!isValid}
        style={{ marginTop: 20 }}
        textStyle={{ color: "white" }}
        onClick={() => {
          signIn();
        }}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
        }}
        onPress={() => {
          isEnrolled();
        }}
      >
        <Entypo
          name={Platform.OS === "android" ? "fingerprint" : "emoji-happy"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}
