import React from "react";
import { View, Text, Button } from "react-native";

export default function CollageScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>🎨 Collage de fotos</Text>
      <Button title="Volver al inicio" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
