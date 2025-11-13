import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HandlerNavigation } from './src/navigations/HandlerNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HandlerNavigation />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
