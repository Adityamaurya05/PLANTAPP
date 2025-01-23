import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Pest = () => {
  return (
    <ImageBackground
      source={require('../assets/images/pestscreen.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Text for Pest Detection */}
        <Text style={styles.title}>Pest Detection</Text>

        {/* Custom Button */}
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => alert('Button pressed!')}
        >
          <Text style={styles.customButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: 'bold', // Bold text
    color: '#942B2BFF', // Dark red color to match the buttons
    textAlign: 'center', // Center the text horizontally
    marginBottom: 20, // Space between the text and the button
  },
  customButton: {
    backgroundColor: '#39785c', // Green color from your description
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5, // Adjust for rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  customButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold', // Bold text
  },
});

export default Pest;