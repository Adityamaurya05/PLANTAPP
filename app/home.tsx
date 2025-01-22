import { Button, StyleSheet, View, Text, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { vw } from "react-native-expo-viewport-units";

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/Landingpage.png')} // Replace with your image path
      style={styles.backgroundImage}
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Changed to flex-start to align items at the top
    alignItems: "center",
    paddingTop: vw(20), // Add padding to move the title lower
    backgroundColor: "rgba(255, 165, 0, 0.0)", // Semi-transparent orange overlay
  },
  buttonContainer: {
    width: "80%", // Adjust the width as needed
    marginTop: vw(40), // Add space above the buttons
    marginBottom: vw(40),
  },
  buttonWrapper: {
    borderRadius: 25, // Rounded corners
    overflow: "hidden", // Ensures the button respects the borderRadius
    marginVertical: 10, // Space between buttons
    backgroundColor: "#FFCC99", // Light orange background for buttons
  },
  title: {
    fontSize: 30, // Adjust the font size as needed
    fontWeight: "bold", // Bold text
    color: "#942B2BFF", // Dark red color to match the buttons
    textAlign: "center", // Center the text horizontally
    marginTop: vw(30), // Additional margin to move the title lower
  },
});