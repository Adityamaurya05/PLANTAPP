import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="prevent"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="pest"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="plant"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}