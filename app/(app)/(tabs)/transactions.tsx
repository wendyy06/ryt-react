import * as React from "react";
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getTransactions } from "@/services";
import { useQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Transactions() {
  const [revealAmount, setRevealAmount] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    refetchOnWindowFocus: false,
  });

  const { mutate: biometicMutate } = useMutation({
    mutationKey: ["biometric"],
    mutationFn: async () => {
      return await LocalAuthentication.isEnrolledAsync().then((data) => {
        if (data) {
          LocalAuthentication.authenticateAsync({
            promptMessage: "Reveal Amount",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
          })
            .then((data) => {
              if (data.success) {
                setRevealAmount(true);
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      });
    },
    onSuccess: (data) => {
      console.log("biometric success", data);
    },
    onError: (error) => {
      console.log("biometric error", error);
    },
  });

  return (
    <FlatList
      data={transactions}
      contentContainerStyle={{
        paddingBottom: 50,
        backgroundColor: "#fff",
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            console.log("refreshing");
            refetch();
          }}
        />
      }
      renderItem={({ item, index }) => {
        const color = item.type === "debit" ? "#EC2224" : "#039855";
        const amount =
          item.type === "debit" ? `- RM${item.amount}` : `+ RM${item.amount}`;
        return (
          <TouchableOpacity
            onPress={() => {
              router.push(`/transactions-details/${item.id}`);
            }}
          >
            <View
              style={{
                padding: 12,
                borderRadius: 10,
                flexDirection: "row",
                shadowColor: "#fff",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderBottomWidth: 1,
                borderColor: "#EFEFEF",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#000" }}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  {item.desc}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                    color: "#3C3C3C",
                  }}
                  numberOfLines={1}
                >
                  {dayjs(item.createdAt).format("HH:mm  @  DD MMM, YYYY")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  flex: 0.3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: color,
                    paddingBottom: 2,
                  }}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {revealAmount ? amount : "****"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.1, backgroundColor: "grey" }} />
      )}
      ListHeaderComponent={() => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            paddingRight: 20,
            elevation: 2,
            shadowColor: "black",
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Transactions
          </Text>
          <TouchableOpacity
            onPress={() => {
              revealAmount ? setRevealAmount(false) : biometicMutate();
            }}
          >
            <MaterialCommunityIcons
              name={revealAmount ? "eye" : "eye-off"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600", marginTop: 20 }}>
            No transaction
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
