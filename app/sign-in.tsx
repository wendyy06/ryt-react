import Button from "@/components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "../ctx";

interface FormValues {
  username: string;
  password: string;
}

export default function SignIn() {
  const { session, signIn } = useSession();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

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
              signIn("biometric");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    });
  };

  React.useEffect(() => {
    if (session) return;
    isEnrolled();
  }, [session]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} />
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
                  borderRadius: 10,
                }}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
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
                  borderRadius: 10,
                }}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
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
        style={{ marginTop: 20, backgroundColor: "#000" }}
        textStyle={{ color: "white" }}
        onClick={handleSubmit((data) => {
          console.log("data", data);
          signIn({ username: data.username, password: data.password });
        })}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50,
        }}
        onPress={() => {
          isEnrolled();
        }}
      >
        <MaterialCommunityIcons
          name={Platform.OS === "android" ? "fingerprint" : "face-recognition"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});
