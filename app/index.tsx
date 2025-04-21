import Button from "@/components/Button";
import { useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 30,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          position: "relative",
        }}
      >
        <View style={styles.imageContainerLeft}>
          <Image
            source={require("@/assets/images/onboard.webp")}
            style={[
              styles.imageLeft,
              { height: height * 0.4, width: width * 0.8 },
            ]}
          />
        </View>
      </View>

      <View style={{ margin: 20, flex: 1 }}>
        <View style={{ width: "100%" }}>
          <Text style={styles.title}>Effortless Bank Simplified</Text>
          <Text style={styles.desc}>
            Experience seamless financial management makes managing your
            finances easy and intuitive.
          </Text>
        </View>
        <Button
          label="Starts Now!"
          type="primary"
          onClick={() => {
            router.push("/sign-in");
          }}
          textStyle={{ color: "white" }}
          style={{
            marginTop: 20,
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "left",
    marginTop: 30,
  },

  imageContainerLeft: {
    position: "absolute",
    left: 0,
    zIndex: 20,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    width: 250,
    height: 250,
    transform: [{ rotate: "5deg" }, { translateX: -40 }],
  },

  imageLeft: {
    resizeMode: "cover",
    borderRadius: 20,
    position: "absolute",
    inset: 0,
    transform: [{ rotate: "5deg" }, { translateY: 20 }, { translateX: 10 }],
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  desc: {
    fontSize: 13,
    color: "black",
    lineHeight: 30,
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
