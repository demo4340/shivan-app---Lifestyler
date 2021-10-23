import React from 'react';
import Pedometer from 'react-native-pedometer';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { Header, SearchBar, Icon } from 'react-native-elements';
import WeatherScreen from '../components/weather';

export default class MenuScreen extends React.Component {
  homeScreenNavigate = () => {
    this.props.navigation.navigate('HomeScreen');
  };
  foodTabNavigate = () => {
    this.props.navigation.navigate('AddFood');
  };
  checkFoodNavigate = () => {
    this.props.navigation.navigate('CheckFoodScreen');
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.homeScreenNavigate();
          }}
          style={styles.button}>
          <Text style = {styles.text}> Home Screen </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.foodTabNavigate();
          }}
          style={styles.button}>
          <Text style = {styles.text}> Add Food </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.checkFoodNavigate();
          }}
          style={styles.button}>
          <Text style = {styles.text}> Check Food </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    padding: 10,
    alignSelf : 'center',
    margin : 10,
  },
  text : {

    fontSize : 20, 
    color : 'white',
    textAlign : 'center',
    fontWeight : 'bold',
    backgroundColor: '#14279B',
    borderRadius : 5,
    padding :10,

  },
});
