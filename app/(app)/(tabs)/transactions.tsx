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
import { getTransaction } from "@/services";
import { useQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Transactions() {
  const {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransaction,
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

  const [revealAmount, setRevealAmount] = React.useState<boolean>(false);

  return (
    <FlatList
      data={transactions}
      contentContainerStyle={{ paddingBottom: 100, backgroundColor: "#fff" }}
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
        const amount = item.type === "debit" ? item.amount : `+${item.amount}`;
        return (
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              // shadowColor: "#fff",
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,

              // elevation: 5,
              // backgroundColor: "rgba(0, 0, 0, 0.8)",
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
                style={{ fontSize: 12, fontWeight: "400", color: "#000" }}
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
        );
      }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.5, backgroundColor: "grey" }} />
      )}
      ListHeaderComponent={() => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
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
              if (revealAmount) {
                setRevealAmount(false);
              } else {
                biometicMutate();
              }
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
          <Text style={{ fontWeight: "600", marginTop: 20 }}>No results</Text>
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
