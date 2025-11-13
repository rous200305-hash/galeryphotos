import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export function PhotoViewerScreen({ route, navigation }) {
  const { photos, initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderPhoto = ({ item, index }) => (
    <View style={styles.photoContainer}>
      <View style={styles.imageWrapper}>
        <Text style={styles.photoText}>📸 Foto {index + 1}</Text>
        <Text style={styles.photoInfo}>
          {item.date} • {item.size || '2.4 MB'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Header con controles */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentIndex + 1} de {photos.length}
        </Text>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialCommunityIcons name="share" color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Visor de fotos */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        style={styles.photoList}
        contentOffset={{ x: currentIndex * width, y: 0 }}
      >
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: photo.uri }} style={styles.photoImage} />
            <View style={styles.photoOverlay}>
              <Text style={styles.photoText}>📸 Foto {index + 1}</Text>
              <Text style={styles.photoInfo}>
                {photo.date} • {photo.size || '2.4 MB'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Controles de navegación */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, currentIndex === 0 && styles.disabledButton]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <MaterialCommunityIcons 
            name="chevron-left" 
            color={currentIndex === 0 ? "#666" : "white"} 
            size={32} 
          />
        </TouchableOpacity>

        <View style={styles.centerControls}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="heart" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="download" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="delete" color="#ff4444" size={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.controlButton, currentIndex === photos.length - 1 && styles.disabledButton]}
          onPress={goToNext}
          disabled={currentIndex === photos.length - 1}
        >
          <MaterialCommunityIcons 
            name="chevron-right" 
            color={currentIndex === photos.length - 1 ? "#666" : "white"} 
            size={32} 
          />
        </TouchableOpacity>
      </View>

      {/* Indicadores de puntos */}
      <View style={styles.dotsContainer}>
        {photos.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoList: {
    flex: 1,
  },
  photoContainer: {
    width: width,
    height: height,
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  photoText: {
    fontSize: 48,
    marginBottom: 20,
  },
  photoInfo: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  centerControls: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeDot: {
    backgroundColor: 'white',
  },
});
