import * as React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import DailyList from '../lists/dailyList';
import MonthlyList from '../lists/monthlyList';

const Tab = createMaterialTopTabNavigator();
const ListNavigator = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor : '#5C7AEA' }}
      />
      <Tab.Navigator
        labeled={false}
        backgroundColor={'red'}
        barStyle={styles.bottomTabStyles}
        tabBarOptions={{
          showlabel: false,
        }} 
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: 12, color : 'white' },
          tabBarStyle: { backgroundColor: '#5C7AEA', justifyContent : 'center' },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Daily') {
              iconName = focused ? 'today' : 'today-outline';
              color = focused ? 'white' : '#DDDDDD' 
            } else if (route.name === 'Monthly') {
              iconName = focused ? 'calendar' : 'calendar-outline';
              color = focused ? 'white' : '#DDDDDD' 
            }

            return (
              <Ionicons
                name={iconName}
                size={RFValue(20)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}>
        <Tab.Screen name="Daily" component={DailyList} />
        <Tab.Screen name="Monthly" component={MonthlyList} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
});

export default ListNavigator;
