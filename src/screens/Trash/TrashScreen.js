import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function TrashScreen() {
  const [deletedPhotos, setDeletedPhotos] = useState([
    { 
      id: '1', 
      uri: 'https://picsum.photos/200/200?random=30', 
      name: 'IMG_001.jpg',
      deletedDate: '2024-01-15',
      size: '2.4 MB'
    },
    { 
      id: '2', 
      uri: 'https://picsum.photos/200/200?random=31', 
      name: 'IMG_002.jpg',
      deletedDate: '2024-01-14',
      size: '1.8 MB'
    },
    { 
      id: '3', 
      uri: 'https://picsum.photos/200/200?random=32', 
      name: 'IMG_003.jpg',
      deletedDate: '2024-01-13',
      size: '3.1 MB'
    },
  ]);

  const restorePhoto = (id) => {
    Alert.alert(
      'Restaurar Foto',
      '¿Quieres restaurar esta foto a la galería?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Restaurar', onPress: () => {
          setDeletedPhotos(prev => prev.filter(photo => photo.id !== id));
          alert('Foto restaurada exitosamente');
        }},
      ]
    );
  };

  const permanentlyDelete = (id) => {
    Alert.alert(
      'Eliminar Permanentemente',
      'Esta acción no se puede deshacer. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          setDeletedPhotos(prev => prev.filter(photo => photo.id !== id));
          alert('Foto eliminada permanentemente');
        }},
      ]
    );
  };

  const clearAllTrash = () => {
    Alert.alert(
      'Vaciar Papelera',
      '¿Estás seguro de que quieres eliminar permanentemente todas las fotos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Vaciar', style: 'destructive', onPress: () => {
          setDeletedPhotos([]);
          alert('Papelera vaciada');
        }},
      ]
    );
  };

  const getTotalSize = () => {
    return deletedPhotos.reduce((total, photo) => {
      const size = parseFloat(photo.size);
      return total + size;
    }, 0).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Papelera</Text>
          <Text style={styles.subtitle}>
            {deletedPhotos.length} fotos • {getTotalSize()} MB
          </Text>
        </View>
        {deletedPhotos.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAllTrash}>
            <MaterialCommunityIcons name="delete-sweep" color="#ff4444" size={20} />
            <Text style={styles.clearButtonText}>Vaciar</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={deletedPhotos}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <View style={styles.photoInfo}>
              <Text style={styles.photoName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.photoDate}>{item.deletedDate}</Text>
              <Text style={styles.photoSize}>{item.size}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.restoreButton}
                onPress={() => restorePhoto(item.id)}
              >
                <MaterialCommunityIcons name="restore" color="#0891b2" size={18} />
                <Text style={styles.restoreText}>Restaurar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => permanentlyDelete(item.id)}
              >
                <MaterialCommunityIcons name="delete-forever" color="#ff4444" size={18} />
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="delete-empty" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Papelera vacía</Text>
            <Text style={styles.emptySubtext}>
              Las fotos eliminadas aparecerán aquí por 30 días
            </Text>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  clearButtonText: {
    color: '#ff4444',
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
    padding: 12,
  },
  photoName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  photoDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  photoSize: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 12,
    paddingTop: 0,
  },
  restoreButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 4,
  },
  restoreText: {
    color: '#0891b2',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 4,
  },
  deleteText: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
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
    paddingHorizontal: 20,
  },
});




