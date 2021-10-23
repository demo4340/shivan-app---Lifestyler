import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, createAppContainer } from '@react-navigation/native-stack';

import StackNavigator from './navigation/stack';
 
export default function App() {
  return (
    <NavigationContainer> 
      
      <StackNavigator  />    

    </NavigationContainer>     
  );
}