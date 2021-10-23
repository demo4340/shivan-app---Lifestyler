import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import CheckFoodScreen from '../screens/checkFood';
import FoodTabNavigator from './foodTabNavigator';
import MenuScreen from '../screens/MenuTab';
import TabNavigator from './tabNavigator';
import News from '../screens/newsScreen';
import CalculatorTabs from './calculatorTabNavigator';
import HomeTabNavigator from './homeTabNavigator';
import Login from '../logIn';
import Logout from '../screens/logout';
import ListNavigator from './listNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Your Lists"
        component={ListNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Health Calculators"
        component={CalculatorTabs}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Food"
        component={FoodTabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Emotions"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="News"
        component={News}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
