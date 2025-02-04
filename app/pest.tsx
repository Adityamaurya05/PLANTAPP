import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const Pest = () => {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [videoVisible, setVideoVisible] = useState(true);

  const initWebSocket = () => {
    const socket = new WebSocket('ws://192.168.1.4:2525/pest');

    socket.onopen = () => console.log('WebSocket connected');
    socket.onerror = (error) => console.log('WebSocket error: ', error);
    socket.onclose = () => console.log('WebSocket closed');

    socket.onmessage = async (event) => {
      console.log('Received video data type:', typeof event.data);

      const videoUri = FileSystem.documentDirectory + 'annotated_video.mp4';

      try {
        if (typeof event.data === 'string') {
          await FileSystem.writeAsStringAsync(videoUri, event.data, {
            encoding: FileSystem.EncodingType.Base64,
          });
        } else {
          const byteArray = new Uint8Array(event.data);
          await FileSystem.writeAsStringAsync(videoUri, byteArray.toString(), {
            encoding: FileSystem.EncodingType.UTF8,
          });
        }

        const fileInfo = await FileSystem.getInfoAsync(videoUri);
        if (!fileInfo.exists) {
          console.error('Saved video file not found:', videoUri);
          return;
        }

        console.log('Video saved to:', videoUri);
        setVideoUri(null);
        setTimeout(() => setVideoUri(videoUri), 100);
      } catch (error) {
        console.error('Error saving video:', error);
      }
    };

    setWs(socket);
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const uploadVideo = async () => {
    if (!videoUri || !ws) return;
    if (ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not open yet');
      return;
    }
    setVideoVisible(false);

    try {
      const response = await fetch(videoUri);
      const videoBlob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        const hexString = Array.from(byteArray)
          .map(byte => byte.toString(16).padStart(2, '0'))
          .join('');

        const message = `VIDEO:${hexString}`;
        ws.send(message);
        console.log('Video sent to server as hex string');
      };

      reader.onerror = (error) => console.error('FileReader error: ', error);
      reader.readAsArrayBuffer(videoBlob);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  useEffect(() => {
    initWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/pestscreen.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Pest Detection</Text>

        {!videoUri && (
          <TouchableOpacity style={styles.customButton} onPress={pickVideo}>
            <Text style={styles.customButtonText}>Select Video</Text>
          </TouchableOpacity>
        )}

        {videoUri && (
          <>
            {videoVisible && (
              <View style={styles.videoContainer}>
                <Video
                  source={{ uri: videoUri }}
                  shouldPlay
                  useNativeControls
                  isLooping
                  style={styles.video}
                />
              </View>
            )}

            <TouchableOpacity style={styles.customButton} onPress={uploadVideo}>
              <Text style={styles.customButtonText}>Upload Video</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#942B2BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#39785c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 10,
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    marginTop: 20,
    width: '100%',
    height: 250,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Pest;
