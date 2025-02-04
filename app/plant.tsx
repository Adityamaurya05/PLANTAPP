import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';

const Plant = () => {
  const [selectedVegetable, setSelectedVegetable] = useState(null);

  const vegetables = [
    { label: 'Potato', value: 'potato' },
    { label: 'Onion', value: 'onion' },
    { label: 'Radish', value: 'radish' },
    { label: 'Carrot', value: 'carrot' },
    { label: 'Cabbage', value: 'cabbage' },
    { label: 'Tomato', value: 'tomato' },
  ];

  const handleVegetableSelect = (value) => {
    setSelectedVegetable(value);
  };

  const handleUpload = () => {
    // Open the gallery
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        Alert.alert('Selected Image', JSON.stringify(selectedImage));
        // You can now use the selectedImage.uri to display or upload the image
      }
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/plant1.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Text for Plant Detection */}
        <Text style={styles.title}>Plant Detection</Text>

        {/* Dropdown for Vegetable Selection */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={handleVegetableSelect}
            items={vegetables}
            placeholder={{ label: 'Select a vegetable...', value: null }}
            style={pickerSelectStyles}
          />
        </View>

        {/* Conditional Render for Upload Button */}
        {selectedVegetable && (
          <TouchableOpacity
            style={styles.customButton}
            onPress={handleUpload}
          >
            <Text style={styles.customButtonText}>Upload {selectedVegetable}</Text>
          </TouchableOpacity>
        )}
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
    color: '#FAF3F3FF', // Dark red color to match the buttons
    textAlign: 'center', // Center the text horizontally
    marginBottom: 20, // Space between the text and the button
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#39785c',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#39785c',
    borderRadius: 4,
    color: '#39785c',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#39785c',
    borderRadius: 8,
    color: '#39785c',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Plant;