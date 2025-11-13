import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a GaleryPhoto</Text>
      <Text style={styles.subtitle}>Tu app de galería está funcionando 🚀</Text>

      <View style={styles.buttons}>
        <Button title="Ir a Galería" onPress={() => navigation.navigate("Gallery")} />
        <Button title="Ir a Collage" onPress={() => navigation.navigate("Collage")} />
        <Button title="Ver Selfies" onPress={() => navigation.navigate("Selfies")} />
        <Button title="Aplicar Filtros" onPress={() => navigation.navigate("Filters")} />
        <Button title="Papelera" onPress={() => navigation.navigate("Trash")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  buttons: {
    gap: 10,
  },
});
