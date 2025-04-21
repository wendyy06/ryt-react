import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Slot } from "expo-router";
import { SessionProvider, useSession } from "../ctx";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!session) return;
    // api.defaults.headers.common["Authorization"] = `Bearer ${session}`;
  }, [session]);

  console.log("session", session);

  return (
    <Stack
      screenOptions={{
        headerBackTitle: "<",
        headerShown: false,
        contentStyle: {
          flex: 1,
        },
      }}
    >
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    KalamRegular: require("../assets/fonts/Kalam-Regular.ttf"),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <App />
              {/* <StatusBar style="auto" /> */}
            </ThemeProvider>
          </QueryClientProvider>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SessionProvider>
  );
}
