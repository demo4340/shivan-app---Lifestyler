import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BMI from '../calculatorScreens/bmi';
import BodyFat from '../calculatorScreens/bodyFat';
import IDEAL from '../calculatorScreens/idealWeight'

const Tab = createBottomTabNavigator();
const CalculatorTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'BMI') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Body fat') {
            iconName = focused ? 'body' : 'body-outline';
          }else if (route.name === 'Ideal Weight') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
        }
      )}
      tabBarOptions={{
        activeTintColor: '#5C7AEA',
        inactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="BMI"
        component={BMI}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Body fat"
        component={BodyFat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ideal Weight"
        component={IDEAL}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default CalculatorTabs;
