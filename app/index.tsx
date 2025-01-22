import { Button, StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import {vw} from "react-native-expo-viewport-units";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant and Pest Diseases</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Plant" onPress={() => router.push("/plant")} color="#39785c" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Pest" onPress={() => router.push("/pest")} color="#39785c" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Prevention" onPress={() => router.push("/prevent")} color="#39785c" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFA500", // Orange background
  },
  buttonContainer: {
    width: "80%", // Adjust the width as needed
    marginBottom: vw(50),
  },
  buttonWrapper: {
    borderRadius: 25, // Rounded corners
    overflow: "hidden", // Ensures the button respects the borderRadius
    marginVertical: 10, // Space between buttons
    backgroundColor: "#FFCC99", // Light orange background for buttons
  },
  title: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: "bold", // Bold text
    color: "#942B2BFF", // Dark red color to match the buttons
    textAlign: "center", // Center the text horizontally
  },
});