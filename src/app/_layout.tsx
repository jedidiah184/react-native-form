import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="confirmation"
        options={{
          title: "Confirmation",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
