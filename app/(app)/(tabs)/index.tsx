import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/ctx";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

interface ListItem {
  title: string;
  desc: string;
  href: any;
}

const lists: ListItem[] = [
  {
    title: "Transactions",
    desc: "View your transactions",
    href: "transactions",
  },
  {
    title: "Transfer",
    desc: "Transfer money to another account",
    href: "",
  },
  {
    title: "Pay",
    desc: "Pay your bills",
    href: "",
  },
  {
    title: "Settings",
    desc: "Manage your account settings",
    href: "",
  },
  {
    title: "Help",
    desc: "Get help and support",
    href: "",
  },
];

export default function HomeScreen() {
  const { signOut } = useSession();
  const router = useRouter();
  return (
    <ScrollView style={styles.headerContainer}>
      <ThemedView style={styles.titleContainer}>
        <Text>Welcome,</Text>
        <MaterialCommunityIcons
          name="logout"
          size={15}
          color="black"
          onPress={() => signOut()}
        />
      </ThemedView>
      <ThemedView style={styles.infoContainer}>
        <Text style={{ fontWeight: "400", fontSize: 16, color: "white" }}>
          Saving Account
        </Text>
        <Text style={{ fontWeight: "400", fontSize: 12, color: "grey" }}>
          123 456 7890
        </Text>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            color: "white",
            marginVertical: 10,
          }}
        >
          RM 9999.99
        </Text>
      </ThemedView>
      <ThemedView style={styles.linksContainer}>
        {lists.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.linksWrapper}
              onPress={() => {
                router.push(item.href);
              }}
            >
              <ThemedView>
                <Text>{item.title}</Text>
                <Text style={{ fontSize: 12, color: "grey" }}>{item.desc}</Text>
              </ThemedView>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          );
        })}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "#0000e6",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
  linksContainer: {
    marginTop: 20,
    flexDirection: "column",
  },
  linksWrapper: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
