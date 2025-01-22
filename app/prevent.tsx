import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Menu, Provider } from 'react-native-paper';

// Define the content for each tab
const PlantDiseases = () => {
  const [visible, setVisible] = useState(false); // State to manage dropdown visibility
  const [selectedDisease, setSelectedDisease] = useState('Select a Plant Disease'); // State to store selected disease

  // Function to handle menu item selection
  const handleSelect = (disease: string) => {
    setSelectedDisease(disease);
    setVisible(false);
  };

  return (
    <Provider>
      <View style={styles.scene}>
        <Text style={styles.text}>Plant Diseases</Text>

        {/* Dropdown Menu */}
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Text style={styles.dropdown} onPress={() => setVisible(true)}>
              {selectedDisease}
            </Text>
          }
        >
          <Menu.Item onPress={() => handleSelect('Powdery Mildew')} title="Powdery Mildew" />
          <Menu.Item onPress={() => handleSelect('Downy Mildew')} title="Downy Mildew" />
          <Menu.Item onPress={() => handleSelect('Rusts')} title="Rusts" />
          <Menu.Item onPress={() => handleSelect('Blights')} title="Blights" />
          <Menu.Item onPress={() => handleSelect('Cankers')} title="Cankers" />
          <Menu.Item onPress={() => handleSelect('Wilts')} title="Wilts" />
        </Menu>

        {/* Display Content Based on Selected Disease */}
        {selectedDisease !== 'Select a Plant Disease' && (
          <View style={styles.content}>
            <Text style={styles.subText}>Information for {selectedDisease}:</Text>
            <Text>- This is a common plant disease.</Text>
            <Text>- Use fungicides for treatment.</Text>
            <Text>- Maintain proper plant hygiene.</Text>
          </View>
        )}
      </View>
    </Provider>
  );
};

const PestDiseases = () => {
  const [visible, setVisible] = useState(false); // State to manage dropdown visibility
  const [selectedPest, setSelectedPest] = useState('Select a Pest'); // State to store selected pest

  // Function to handle menu item selection
  const handleSelect = (pest: string) => {
    setSelectedPest(pest);
    setVisible(false);
  };

  return (
    <Provider>
      <View style={styles.scene}>
        <Text style={styles.text}>Pest Diseases</Text>

        {/* Dropdown Menu */}
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Text style={styles.dropdown} onPress={() => setVisible(true)}>
              {selectedPest}
            </Text>
          }
        >
          <Menu.Item onPress={() => handleSelect('Aphids')} title="Aphids" />
          <Menu.Item onPress={() => handleSelect('Whiteflies')} title="Whiteflies" />
          <Menu.Item onPress={() => handleSelect('Spider Mites')} title="Spider Mites" />
          <Menu.Item onPress={() => handleSelect('Caterpillars')} title="Caterpillars" />
          <Menu.Item onPress={() => handleSelect('Thrips')} title="Thrips" />
          <Menu.Item onPress={() => handleSelect('Mealybugs')} title="Mealybugs" />
        </Menu>

        {/* Display Content Based on Selected Pest */}
        {selectedPest !== 'Select a Pest' && (
          <View style={styles.content}>
            <Text style={styles.subText}>Information for {selectedPest}:</Text>
            <Text>- This is a common pest.</Text>
            <Text>- Use insecticides for treatment.</Text>
            <Text>- Introduce natural predators.</Text>
          </View>
        )}
      </View>
    </Provider>
  );
};

const PreventionTips = () => {
  const [visible, setVisible] = useState(false); // State to manage dropdown visibility
  const [selectedTip, setSelectedTip] = useState('Select a Prevention Tip'); // State to store selected tip

  // Function to handle menu item selection
  const handleSelect = (tip: string) => {
    setSelectedTip(tip);
    setVisible(false);
  };

  return (
    <Provider>
      <View style={styles.scene}>
        <Text style={styles.text}>Prevention Tips</Text>

        {/* Dropdown Menu */}
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Text style={styles.dropdown} onPress={() => setVisible(true)}>
              {selectedTip}
            </Text>
          }
        >
          <Menu.Item onPress={() => handleSelect('Plant Health Management')} title="Plant Health Management" />
          <Menu.Item onPress={() => handleSelect('Cultural Practices')} title="Cultural Practices" />
          <Menu.Item onPress={() => handleSelect('Soil Management')} title="Soil Management" />
          <Menu.Item onPress={() => handleSelect('Physical Barriers')} title="Physical Barriers" />
          <Menu.Item onPress={() => handleSelect('Biological Control')} title="Biological Control" />
          <Menu.Item onPress={() => handleSelect('Chemical Control')} title="Chemical Control" />
        </Menu>

        {/* Display Content Based on Selected Tip */}
        {selectedTip !== 'Select a Prevention Tip' && (
          <View style={styles.content}>
            <Text style={styles.subText}>Prevention Tips for {selectedTip}:</Text>
            <Text>- Use organic pesticides.</Text>
            <Text>- Rotate crops regularly.</Text>
            <Text>- Maintain proper soil health.</Text>
          </View>
        )}
      </View>
    </Provider>
  );
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const Prevent = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F2F0F0FF', // Active tab text color
        tabBarInactiveTintColor: '#555', // Inactive tab text color
        tabBarStyle: { backgroundColor: '#7eaca2' }, // Tab bar background color
        tabBarLabelStyle: { fontSize: 15 }, // Font size for tab labels
      }}
    >
      <Tab.Screen name="Plant Diseases" component={PlantDiseases} />
      <Tab.Screen name="Pest Diseases" component={PestDiseases} />
      <Tab.Screen name="Prevention Tips" component={PreventionTips} />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e9ffd8', // Background color for the content
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#041713FF',
  },
  dropdown: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#942B2B',
    borderRadius: 5,
    color: '#942B2B',
    marginBottom: 20,
  },
  content: {
    marginTop: 10,
  },
  subText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Prevent;

// COMMITED