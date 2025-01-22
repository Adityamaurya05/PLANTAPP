import { Button, StyleSheet, View, Text, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { vw } from "react-native-expo-viewport-units";

export default function Landing() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/Homescreen.png')} // Replace with your image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Plant and Pest Diseases Detections & Prevention Tips</Text>
        <View style={styles.buttonWrapper}>
          <Button title="Click to Start" onPress={() => router.push("/home")} color="#39785c" />
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
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "rgba(255, 165, 0, 0.0)", // Semi-transparent orange overlay
  },
  title: {
    fontSize: 30, // Adjust the font size as needed
    fontWeight: "bold", // Bold text
    color: "#942B2BFF", // Dark red color to match the buttons
    textAlign: "center", // Center the text horizontally
    marginBottom: vw(20), // Reduced space below the title to move the button up
    paddingHorizontal: vw(10), // Add padding to prevent text overflow
  },
  buttonWrapper: {
    borderRadius: 30, // Rounded corners
    overflow: "hidden", // Ensures the button respects the borderRadius
    paddingHorizontal: vw(30), // Increase horizontal padding to make the button wider
    paddingVertical: vw(15), // Increase vertical padding to make the button taller
    marginTop: vw(-20), // Move the button slightly upward
  },
});