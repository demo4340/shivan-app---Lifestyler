import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Emotions from '../emotionScreens/emotions';
import Happy from '../emotionScreens/happy';
import Sad from '../emotionScreens/sad';
import Angry from '../emotionScreens/angry';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Emotions') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Happy') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Sad') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Angry') {
            iconName = focused ? 'create' : 'create-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor:  '#5C7AEA',  
        inactiveTintColor: 'gray',
      }}>
      
      <Tab.Screen name="Emotions" component={Emotions} options={{ headerShown: false }}/>
      <Tab.Screen name="Happy" component={Happy} options={{ headerShown: false }}/>
      <Tab.Screen name="Sad" component={Sad} options={{ headerShown: false }}/>
      <Tab.Screen name="Angry" component={Angry} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
