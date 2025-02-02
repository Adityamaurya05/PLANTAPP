import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Menu, Provider } from 'react-native-paper';
import { Buffer } from 'buffer';

const WS_URL = 'ws://192.168.1.10:2525/prevent-data';

const PlantDiseases = () => {
  type Disease = {
    "Disease Name": string;
    Description: string;
    "Affected Plants": string;
    Symptoms: string;
    Prevention: string;
    percentage: string;
    Fact: string;
    Images: string;
    image_hex?: string;
  };

  const [visible, setVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState('Select a Plant Disease');
  const [diseaseInfo, setDiseaseInfo] = useState<Disease | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = event.data;
      try {
        const parsedData = JSON.parse(data);

        if (parsedData.image_hex) {
          const imageBuffer = Buffer.from(parsedData.image_hex, 'hex');
          const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
          parsedData.image_hex = base64Image;
        }

        setDiseaseInfo(parsedData);
      } catch (error) {
        setDiseaseInfo(data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleSelect = (disease: string) => {
    setSelectedDisease(disease);
    setVisible(false);

    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = `PLANT:${disease}`;
      ws.send(message);
    }
  };

  return (
    <Provider>
      <View style={styles.scene}>
        <Text style={styles.text}>Plant Diseases</Text>

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
          <Menu.Item onPress={() => handleSelect('Root Rot')} title="Root Rot" />
          <Menu.Item onPress={() => handleSelect('Damping-Off')} title="Damping-Off" />
          <Menu.Item onPress={() => handleSelect('Mosaic Viruses')} title="Mosaic Viruses" />
          <Menu.Item onPress={() => handleSelect('Bacterial Blights')} title="Bacterial Blights" />
          <Menu.Item onPress={() => handleSelect('Fire Blight')} title="Fire Blight" />
          <Menu.Item onPress={() => handleSelect('Panama Disease')} title="Panama Disease" />
          <Menu.Item onPress={() => handleSelect('Citrus Greening')} title="Citrus Greening" />
          <Menu.Item onPress={() => handleSelect('Dutch Elm Disease')} title="Dutch Elm Disease" />
          <Menu.Item onPress={() => handleSelect('Chestnut Blight')} title="Chestnut Blight" />
        </Menu>

        {selectedDisease !== 'Select a Plant Disease' && diseaseInfo && (
          <ScrollView style={styles.content}>
            <Text style={styles.subText}>Information for {selectedDisease}:</Text>

            {typeof diseaseInfo === 'string' ? (
              <Text>{diseaseInfo}</Text>
            ) : (
              <>
                <Text>{`Description: ${diseaseInfo.Description}`}</Text>
                <Text>{`Affected Plants: ${diseaseInfo['Affected Plants']}`}</Text>
                <Text>{`Symptoms: ${diseaseInfo.Symptoms}`}</Text>
                <Text>{`Prevention: ${diseaseInfo.Prevention}`}</Text>
                <Text>{`Percentage: ${diseaseInfo.percentage}`}</Text>
                <Text>{`Fact: ${diseaseInfo.Fact}`}</Text>
                {diseaseInfo.image_hex && (
                  <Image
                    source={{ uri: diseaseInfo.image_hex }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
              </>
            )}
          </ScrollView>
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
          <Menu.Item onPress={() => handleSelect('Thirps')} title="Thirps" />
          <Menu.Item onPress={() => handleSelect('Wireworms')} title="Wireworms" />
          <Menu.Item onPress={() => handleSelect('Whitefly')} title="Whitefly" />
          <Menu.Item onPress={() => handleSelect('Sawfly')} title="Sawfly" />
          <Menu.Item onPress={() => handleSelect('Grasshopper')} title="Grasshopper" />
          <Menu.Item onPress={() => handleSelect('Mites')} title="Mites" />
          <Menu.Item onPress={() => handleSelect('Cutworms')} title="Cutworms" />
          <Menu.Item onPress={() => handleSelect('Aphides')} title="Aphides" />
          <Menu.Item onPress={() => handleSelect('Caterpillar')} title="Caterpillar" />
          <Menu.Item onPress={() => handleSelect('Flea Beetle')} title="Flea Beetle" />
          <Menu.Item onPress={() => handleSelect('Army Worms')} title="Army Worms" />
          <Menu.Item onPress={() => handleSelect('Snails')} title="Snails" />
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
          <Menu.Item onPress={() => handleSelect('Monitoring and Early Detection')} title="Monitoring and Early Detection" />
          <Menu.Item onPress={() => handleSelect('Plant Resistance')} title="Plant Resistance" />
          <Menu.Item onPress={() => handleSelect('Sanitation')} title="Sanitation" />
          <Menu.Item onPress={() => handleSelect('Quarantine')} title="Quarantine" />
          <Menu.Item onPress={() => handleSelect('Companion Planting')} title="Companion Planting" />
          <Menu.Item onPress={() => handleSelect('Diversify Your Garden')} title="Diversify Your Garden" />
          <Menu.Item onPress={() => handleSelect('Water Wisely')} title="Water Wisely" />
          <Menu.Item onPress={() => handleSelect('Fertilize Properly')} title="Fertilize Properly" />
          <Menu.Item onPress={() => handleSelect('Stay Informed')} title="Stay Informed" />
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
        headerShown: false, // Hide the header for all screens
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
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default Prevent;