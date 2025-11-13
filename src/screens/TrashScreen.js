import React from "react";
import { View, Text, Button } from "react-native";

export default function TrashScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>🗑️ Papelera</Text>
      <Button title="Volver al inicio" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
