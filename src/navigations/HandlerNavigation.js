import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from './AppNavigation';

export function HandlerNavigation() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}