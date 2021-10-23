import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddFood from '../screens/addFood';
import CheckFoodScreen from '../screens/checkFood';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();
const FoodTabNavigator = () => {
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
          if (route.name === 'Add') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
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
      <Tab.Screen name="Add" component={AddFood} />
      <Tab.Screen name="Search" component={CheckFoodScreen} /> 
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

export default FoodTabNavigator;
