import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([
    { id: '1', uri: 'https://picsum.photos/200/200?random=1', date: '2024-01-15', size: '2.4 MB' },
    { id: '2', uri: 'https://picsum.photos/200/200?random=2', date: '2024-01-14', size: '1.8 MB' },
    { id: '3', uri: 'https://picsum.photos/200/200?random=3', date: '2024-01-13', size: '3.1 MB' },
    { id: '4', uri: 'https://picsum.photos/200/200?random=4', date: '2024-01-12', size: '2.7 MB' },
    { id: '5', uri: 'https://picsum.photos/200/200?random=5', date: '2024-01-11', size: '1.9 MB' },
    { id: '6', uri: 'https://picsum.photos/200/200?random=6', date: '2024-01-10', size: '2.2 MB' },
  ]);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesita acceso a la cámara para tomar fotos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newPhoto = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        date: new Date().toISOString().split('T')[0],
      };
      setPhotos(prev => [newPhoto, ...prev]);
    }
  };

  const selectFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesita acceso a la galería para seleccionar fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newPhotos = result.assets.map((asset, index) => ({
        id: (Date.now() + index).toString(),
        uri: asset.uri,
        date: new Date().toISOString().split('T')[0],
      }));
      setPhotos(prev => [...newPhotos, ...prev]);
    }
  };

  const deletePhoto = (id) => {
    Alert.alert(
      'Eliminar Foto',
      '¿Estás seguro de que quieres eliminar esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => 
          setPhotos(prev => prev.filter(photo => photo.id !== id))
        },
      ]
    );
  };

  const openPhotoViewer = (index) => {
    navigation.navigate('PhotoViewer', {
      photos: photos,
      initialIndex: index
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Galería</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
            <MaterialCommunityIcons name="camera" color="white" size={20} />
            <Text style={styles.buttonText}>Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={selectFromGallery}>
            <MaterialCommunityIcons name="image-multiple" color="white" size={20} />
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={photos}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={styles.photoContainer}
            onPress={() => openPhotoViewer(index)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <View style={styles.photoInfo}>
              <Text style={styles.photoDate}>{item.date}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deletePhoto(item.id)}
              >
                <MaterialCommunityIcons name="delete" color="#ff4444" size={16} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="image-off" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No hay fotos aún</Text>
            <Text style={styles.emptySubtext}>Toca los botones para agregar fotos</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#0891b2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  photoContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
  },
  photoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  photoDate: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});