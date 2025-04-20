import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as React from "react";
import SignIn from "./sign-in";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";

interface LandingProps {
  title: string;
  desc: string;
  imageLeft: ImageSourcePropType;
  imageRight: ImageSourcePropType;
  style?: ViewStyle;
}

export default function Page() {
  const [pageCount, setPageCount] = React.useState(1);

  const { title, desc, imageLeft, imageRight }: LandingProps =
    React.useMemo(() => {
      switch (pageCount) {
        case 1:
          return {
            title: "Find your table for any occasion",
            desc: "An unrivaled selection of restaurants for whatever you want.",
            imageLeft: require("@/assets/images/onboard-2.jpg"),
            imageRight: require("@/assets/images/onboard-1.jpg"),
          };
        default:
          return {
            title: "",
            desc: "",
            imageLeft: undefined,
            imageRight: undefined,
          };
      }
    }, [pageCount]);
  return (
    // <View style={styles.container}>
    //   <View
    //     style={{
    //       marginBottom: 30,
    //       display: "flex",
    //       flexDirection: "row",
    //       flex: 1,
    //       position: "relative",
    //     }}
    //   >
    //     <View style={styles.imageContainerLeft}>
    //       <Image source={imageLeft} style={styles.imageLeft} />
    //     </View>
    //     <View style={styles.imageContainerRight}>
    //       <Image source={imageRight} style={styles.imageRight} />
    //     </View>
    //   </View>

    //   <View style={{ margin: 20, flex: 1 }}>
    //     <View style={{ width: "80%" }}>
    //       <Text style={styles.title}>{title}</Text>
    //       <Text style={styles.desc}>{desc}</Text>
    //     </View>
    //     <View
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         marginTop: 20,
    //       }}
    //     ></View>
    //   </View>
    // </View>
    <SignIn />
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
    width: "110%",
    height: "110%",
    resizeMode: "cover",
    borderRadius: 20,
    position: "absolute",
    inset: 0,
    transform: [{ rotate: "5deg" }, { translateY: 20 }, { translateX: 10 }],
  },

  imageRight: {
    width: "110%",
    height: "110%",
    resizeMode: "cover",
    borderRadius: 20,
    position: "absolute",
    inset: 0,
    transform: [
      { rotate: "-10deg" },
      { translateX: -120 },
      { translateY: -70 },
    ],
  },

  imageContainerRight: {
    position: "absolute",
    right: 0,
    zIndex: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    width: 250,
    height: 250,
    transform: [{ rotate: "5deg" }, { translateX: 150 }, { translateY: 110 }],
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    lineHeight: 50,
    letterSpacing: 2,
  },
  desc: {
    fontSize: 13,
    color: "black",
    lineHeight: 30,
    letterSpacing: 1,
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
