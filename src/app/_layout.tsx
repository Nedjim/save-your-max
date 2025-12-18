import { Stack } from "expo-router";
import { DARK_GREY, BLACK } from "../constants/colors";

const TITLE = "Save your max !";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: BLACK,
        },
        headerTintColor: DARK_GREY,
        headerTitle: TITLE,
      }}
    />
  );
}
