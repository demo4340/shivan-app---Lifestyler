import * as React from 'react';
import { WebView } from 'react-native-webview';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Header, SearchBar, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default function Calendar({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Image
            style={styles.logo}
            source={require('../assets/LifestylerLogo.png')}
          />
        </View>
        <Text style={styles.title}>LIFESTYLER</Text>
        <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              style={styles.menu} 
              source={require('../assets/hamburger.png')}
            />
          </TouchableOpacity>
      </View>
      <WebView
        style={styles.calendar}
        source={{ uri: 'https://calendar.google.com/calendar/' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: '#5C7AEA',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,  
  },
  logo: {
    width: 30,
    height: 25,
    marginTop: 5,
  },
  calendar: {},
  title: {
    fontSize: 30,
    color: '#E6E6E6',
    fontFamily: 'Times new roman',
    marginTop: 10,
    marginLeft: 25,
  },
  logoBox: {
    padding: 5,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#E6E6E6',
    marginTop: windowHeight / 90,
  },
  menu: {
    width: 35,
    height: 25,
    marginTop: windowHeight / 40,
    marginLeft: 25,
  },
});
