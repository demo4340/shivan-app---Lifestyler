import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './drawer';
import Login from '../logIn';
import LoadingScreen from '../screens/loading'

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading" 
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="SignIn" component={Login} />
      <Stack.Screen name='DashBoard'component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
