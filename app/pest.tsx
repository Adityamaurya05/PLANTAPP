import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../Config';

const Pest = () => {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [serverVideoUri, setServerVideoUri] = useState<string | null>(null);
  const [loadingServerVideo, setLoadingServerVideo] = useState(false);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
      setServerVideoUri(null);
    }
  };

  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert('NO VIDEO SELECTED', 'Please select a video first.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const response = await fetch(videoUri);
      const blob = await response.blob();

      const storageRef = ref(storage, `APP${new Date().toISOString().replace(/\D/g, '')}.mp4`);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
          Alert.alert('ERROR', 'Failed to upload video.');
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Video available at:', downloadURL);
            setUploading(false);
            setUploadProgress(0);
            checkForServerVideo();
          });
        }
      );
    } catch (error) {
      console.error(error);
      Alert.alert('ERROR', 'Failed to upload video.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const checkForServerVideo = async () => {
    setLoadingServerVideo(true);

    const checkInterval = 5000;

    const fetchServerVideo = async () => {
      try {
        const storageRef = ref(storage, '/');
        const result = await listAll(storageRef);

        const serverVideo = result.items.find((item) => item.name.startsWith('SERVER'));

        if (serverVideo) {
          const downloadURL = await getDownloadURL(serverVideo);
          setServerVideoUri(downloadURL);
          setVideoUri(null);

          await deleteObject(serverVideo);
          console.log('SERVER video deleted successfully.');

          setLoadingServerVideo(false);
          return;
        }

        console.log('No SERVER video found, retrying...');
        setTimeout(fetchServerVideo, checkInterval);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to check for SERVER video.');
        setLoadingServerVideo(false);
      }
    };

    fetchServerVideo();
  };

  return (
    <ImageBackground
      source={require('../assets/images/pestscreen.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Pest Detection</Text>

        {!videoUri && !serverVideoUri && (
          <TouchableOpacity style={styles.customButton} onPress={pickVideo}>
            <Text style={styles.customButtonText}>Select Video</Text>
          </TouchableOpacity>
        )}

        {(videoUri || serverVideoUri) && !uploading && !loadingServerVideo && (
          <>
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: videoUri || serverVideoUri || "" }}
                shouldPlay
                style={styles.video}
                useNativeControls
              />
            </View>

            {!serverVideoUri && (
              <TouchableOpacity style={styles.customButton} onPress={uploadVideo}>
                <Text style={styles.customButtonText}>Upload Video</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {(uploading || loadingServerVideo) && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.progressText}>
              {uploading ? `Uploading: ${uploadProgress.toFixed(2)}%` : 'Checking for SERVER video...'}
            </Text>
          </View>
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
  loaderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default Pest;