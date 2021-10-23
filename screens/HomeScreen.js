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
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

import { Header, SearchBar, Icon } from 'react-native-elements';
import WeatherScreen from '../components/weather';
import QuoteContainer from '../components/quoteContainer';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };
  foodTabNavigate = () => {
    this.props.navigation.navigate('Food');
  };
  newsTabNavigate = () => {
    this.props.navigation.navigate('News');
  };
  emotionsTabNavigate = () => {
    this.props.navigation.navigate('Emotions');
  };
  calculatorTabNavigate = () => {
    this.props.navigation.navigate('Calculator');
  };  
  calendarTabNavigate = () => {
    this.props.navigation.navigate('Home', { screen: 'Calendar' });
  };
  listTabNavigate = () => {
    this.props.navigation.navigate('Your Lists');
  };
  getInfo = () => {};
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text></Text>
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require('../assets/LifestylerLogo.png')}
            />
          </View>
          <Text style={styles.title}>LIFESTYLER</Text>
          <TouchableOpacity
            onPress={() => {
              this.menuTabNavigate();
            }}>
            <Image
              style={styles.menu}
              source={require('../assets/hamburger.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView vertical style={{marginBottom : 150}}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.inputBox}
              placeholder="Search Coming Soon..."
            />
            <TouchableOpacity style={styles.searchButton}>
              <Icon
                name="search"
                iconStyle={{ marginTop: 5 }}
                color={'#14279B'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal style={styles.scrollView}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.foodTabNavigate();
              }}>
              <Image
                source={require('../assets/clipart295550.png')}
                style={styles.image}></Image>
              <Text style={styles.buttonText}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.newsTabNavigate();
              }}>
              <Image
                source={require('../assets/newspaper.png')}
                style={styles.image}></Image>
              <Text style={styles.buttonText}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.emotionsTabNavigate();
              }}>
              <Image
                source={require('../assets/emotions.png')}
                style={styles.image}></Image>
              <Text style={styles.buttonText}>Emotions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.calculatorTabNavigate();
              }}>
              <Image
                source={require('../assets/calculator.png')}
                style={styles.image}></Image>
              <Text style={styles.buttonText}>Calculators</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.props.navigation.navigate('Calendar');
              }}>
              <Image
                source={require('../assets/caldenar.png')}
                style={styles.image}></Image>
              <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.listTabNavigate();
              }}>
              <Image
                source={require('../assets/list.png')}
                style={styles.image}></Image>
              <Text style={styles.buttonText}>Lists</Text>
            </TouchableOpacity>
          </ScrollView>

          <View>
            <WeatherScreen />
          </View>
          <View style={{ marginBottom: 20 }}>
            <QuoteContainer />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
  },
  inputBox: {
    backgroundColor: '#E6E6E6',
    color: 'black',
    padding: 7,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: '75%',
  },

  searchBar: {
    backgroundColor: '#3D56B2',
    padding: 7,
    flexDirection: 'row',
    width: '100%',
  },
  searchButton: {
    backgroundColor: '#E6E6E6',
    width: '24%',
    marginLeft: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5,
  },
  button1: {
    backgroundColor: '#3D56B2',
    width: 150,
    height: 170,
    margin: 10,
    borderRadius: 5,
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
  },
  header: {
    backgroundColor: '#5C7AEA',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30,
  },
  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
    marginTop: -5,
  },
  logo: {
    width: 30,
    height: 25,
    marginTop: 5,
  },
  menu: {
    width: 35,
    height: 25,
    marginTop: windowHeight / 40,
    marginLeft: 25,
  },
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
});
