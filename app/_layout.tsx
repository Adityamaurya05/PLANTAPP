import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // This is the initial route (landing page)
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home" // Home page with buttons
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="prevent"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pest"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="plant"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}