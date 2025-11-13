import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function CollageScreen() {
  const [selectedImages, setSelectedImages] = useState([]);

  const sampleImages = [
    { id: '1', uri: 'https://picsum.photos/200/200?random=1' },
    { id: '2', uri: 'https://picsum.photos/200/200?random=2' },
    { id: '3', uri: 'https://picsum.photos/200/200?random=3' },
    { id: '4', uri: 'https://picsum.photos/200/200?random=4' },
  ];

  const toggleImageSelection = (imageId) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const createCollage = () => {
    if (selectedImages.length < 2) {
      alert('Selecciona al menos 2 imágenes para crear un collage');
      return;
    }
    alert(`Creando collage con ${selectedImages.length} imágenes`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Collage</Text>
        <Text style={styles.subtitle}>Selecciona las fotos que quieres combinar</Text>
      </View>

      <FlatList
        data={sampleImages}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.imageContainer,
              selectedImages.includes(item.id) && styles.selectedImage
            ]}
            onPress={() => toggleImageSelection(item.id)}
          >
            <Image source={{ uri: item.uri }} style={styles.image} />
            {selectedImages.includes(item.id) && (
              <View style={styles.checkIcon}>
                <MaterialCommunityIcons name="check" color="white" size={20} />
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {selectedImages.length > 0 && (
        <TouchableOpacity style={styles.createButton} onPress={createCollage}>
          <MaterialCommunityIcons name="view-grid" color="white" size={24} />
          <Text style={styles.createButtonText}>
            Crear Collage ({selectedImages.length})
          </Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImage: {
    borderColor: '#0891b2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#0891b2',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#0891b2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});




