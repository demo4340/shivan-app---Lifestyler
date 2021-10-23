import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import HomeScreen from '../screens/HomeScreen';
import Calendar from '../screens/calendarScreen';
import Profile from '../screens/profile';


const Tab = createMaterialBottomTabNavigator();
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyles}
      tabBarOptions = {{

        showlabel : false,
        elevation: 10,
        left : 10,
        right : 30,

      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'man' : 'man-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}

              style={styles.icons}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabStyles: {
    backgroundColor: '#170055',
    borderRadius : 10,
    overflow: 'hidden',
    position: 'absolute',
    margin : 10,
  },

  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});

export default HomeTabNavigator;
