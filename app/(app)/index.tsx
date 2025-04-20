import { Redirect } from "expo-router";

export default function AppIndex() {
  console.log("AppIndex");
  return <Redirect href={"/(app)/(tabs)"} />;
}
