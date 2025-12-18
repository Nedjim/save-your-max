import { Stack } from "expo-router";
import { BACKGROUND, DARK_GREY } from "../constants/colors";

const TITLE = "Save your max !";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: BACKGROUND,
        },
        headerTintColor: DARK_GREY,
        headerTitle: TITLE,
      }}
    />
  );
}
