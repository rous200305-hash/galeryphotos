import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function FiltersScreen() {
  const [selectedImage, setSelectedImage] = useState('https://picsum.photos/300/300?random=20');
  const [selectedFilter, setSelectedFilter] = useState('original');

  const sampleImages = [
    { id: '1', uri: 'https://picsum.photos/200/200?random=21' },
    { id: '2', uri: 'https://picsum.photos/200/200?random=22' },
    { id: '3', uri: 'https://picsum.photos/200/200?random=23' },
    { id: '4', uri: 'https://picsum.photos/200/200?random=24' },
  ];

  const filters = [
    { id: 'original', name: 'Original', icon: 'image' },
    { id: 'vintage', name: 'Vintage', icon: 'camera-vintage' },
    { id: 'blackwhite', name: 'B&N', icon: 'format-color-fill' },
    { id: 'sepia', name: 'Sepia', icon: 'palette' },
    { id: 'bright', name: 'Brillante', icon: 'brightness-6' },
    { id: 'contrast', name: 'Contraste', icon: 'contrast' },
    { id: 'blur', name: 'Desenfoque', icon: 'blur' },
    { id: 'sharpen', name: 'Nitidez', icon: 'crystal-ball' },
  ];

  const applyFilter = (filterId) => {
    setSelectedFilter(filterId);
    // Aquí se aplicaría el filtro real a la imagen
  };

  const saveFilteredImage = () => {
    // Aquí se guardaría la imagen con el filtro aplicado
    alert(`Imagen guardada con filtro: ${selectedFilter}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filtros</Text>
        <Text style={styles.subtitle}>Aplica filtros a tus fotos</Text>
      </View>

      {/* Imagen principal */}
      <View style={styles.imagePreview}>
        <Image 
          source={{ uri: selectedImage }} 
          style={[
            styles.mainImage,
            selectedFilter !== 'original' && styles[selectedFilter]
          ]} 
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveFilteredImage}>
          <MaterialCommunityIcons name="download" color="white" size={20} />
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.selectedFilter
            ]}
            onPress={() => applyFilter(filter.id)}
          >
            <MaterialCommunityIcons 
              name={filter.icon} 
              color={selectedFilter === filter.id ? 'white' : '#666'} 
              size={24} 
            />
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.selectedFilterText
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Galería de imágenes */}
      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Selecciona una imagen</Text>
        <FlatList
          data={sampleImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.galleryImageContainer,
                selectedImage === item.uri && styles.selectedGalleryImage
              ]}
              onPress={() => setSelectedImage(item.uri)}
            >
              <Image source={{ uri: item.uri }} style={styles.galleryImage} />
            </TouchableOpacity>
          )}
        />
      </View>
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
  imagePreview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#0891b2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedFilter: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectedFilterText: {
    color: 'white',
  },
  gallerySection: {
    marginTop: 20,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  galleryImageContainer: {
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGalleryImage: {
    borderColor: '#0891b2',
  },
  galleryImage: {
    width: 80,
    height: 80,
  },
  // Filtros simulados (en una app real se usarían librerías como react-native-image-filter)
  vintage: {
    opacity: 0.8,
  },
  blackwhite: {
    opacity: 0.7,
  },
  sepia: {
    opacity: 0.9,
  },
  bright: {
    opacity: 1.2,
  },
  contrast: {
    opacity: 0.8,
  },
  blur: {
    opacity: 0.6,
  },
  sharpen: {
    opacity: 1.1,
  },
});




