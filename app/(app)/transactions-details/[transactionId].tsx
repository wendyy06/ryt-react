import { useLocalSearchParams, Stack } from "expo-router";
import * as React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useQuery } from "@tanstack/react-query";
import { type TransactionDetailsProps, getTransactionById } from "@/services";

export default function TransactionDetails() {
  const { transactionId } = useLocalSearchParams();
  const [reveal, setReveal] = React.useState<boolean>(false);

  const {
    data: transaction = {} as TransactionDetailsProps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransactionById(transactionId as string),
    refetchOnWindowFocus: false,
  });

  const isEnrolled = async () => {
    await LocalAuthentication.isEnrolledAsync().then((data) => {
      if (data) {
        LocalAuthentication.authenticateAsync({
          cancelLabel: "Cancel",
          disableDeviceFallback: true,
        })
          .then((data) => {
            if (data.success) {
              setReveal(true);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    });
  };

  React.useEffect(() => {
    if (reveal) return;
    isEnrolled();
  }, [reveal]);

  const amount =
    transaction.type === "debit"
      ? `- RM${transaction.amount}`
      : `+ RM${transaction.amount}`;

  const transactionData = {
    "Transaction No.": transaction.id,
    "Payment Details": transaction.desc,
    "Payment Method": transaction.method,
    "Transaction Time": transaction.createdAt,
    Status: transaction.status,
    Ref: transaction.ref,
  };

  if (isLoading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Details",
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#0000e6",
                flex: 1,
              }}
            />
          ),
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        {reveal ? (
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                fontSize: 30,
                color: "#0000e6",
                marginVertical: 10,
                borderColor: "grey",
              }}
            >
              {amount}
            </Text>

            {Object.entries(transactionData).map(([label, value], index) => (
              <View
                key={label}
                style={{
                  borderTopWidth: index === 0 ? 0.5 : 0,
                  borderBottomWidth: 0.5,
                  borderColor: "grey",
                  flexDirection: "row",
                  paddingVertical: 15,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "semibold", color: "grey" }}>
                  {label}
                </Text>
                <Text
                  style={{
                    maxWidth: "60%",
                    wordWrap: "break-word",
                    textAlign: "right",
                  }}
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Authenticate to view transaction details</Text>
          </View>
        )}
      </View>
    </>
  );
}
