import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export function SelfiesScreen() {
  const [selfies, setSelfies] = useState([
    { id: '1', uri: 'https://picsum.photos/200/200?random=10', date: '2024-01-15' },
    { id: '2', uri: 'https://picsum.photos/200/200?random=11', date: '2024-01-14' },
    { id: '3', uri: 'https://picsum.photos/200/200?random=12', date: '2024-01-13' },
  ]);

  const takeSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesita acceso a la cámara para tomar selfies');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newSelfie = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        date: new Date().toISOString().split('T')[0],
      };
      setSelfies(prev => [newSelfie, ...prev]);
    }
  };

  const deleteSelfie = (id) => {
    Alert.alert(
      'Eliminar Selfie',
      '¿Estás seguro de que quieres eliminar esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => 
          setSelfies(prev => prev.filter(selfie => selfie.id !== id))
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Selfies</Text>
        <TouchableOpacity style={styles.cameraButton} onPress={takeSelfie}>
          <MaterialCommunityIcons name="camera" color="white" size={24} />
          <Text style={styles.cameraButtonText}>Tomar Selfie</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selfies}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.selfieContainer}>
            <Image source={{ uri: item.uri }} style={styles.selfieImage} />
            <View style={styles.selfieInfo}>
              <Text style={styles.dateText}>{item.date}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteSelfie(item.id)}
              >
                <MaterialCommunityIcons name="delete" color="#ff4444" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="camera-off" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No tienes selfies aún</Text>
            <Text style={styles.emptySubtext}>Toca el botón para tomar tu primera selfie</Text>
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
  cameraButton: {
    backgroundColor: '#0891b2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  selfieContainer: {
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
  selfieImage: {
    width: '100%',
    aspectRatio: 1,
  },
  selfieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  dateText: {
    fontSize: 14,
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




