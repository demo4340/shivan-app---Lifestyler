import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Locate from './locate';
import firebase from 'firebase';
class WeatherScreen extends Component {
  constructor() {
    super();
    this.state = {
      weather: '',
      link: '',
    };
  }

  getWeather = async () => {
    await firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(firebase.auth().currentUser.reload());
    let lat, lon;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        lat = snapshot.val().lat;
        lon = snapshot.val().lon;
      });
      console.log(lat);
      console.log(lon)

    //change latitude and longitude
    var url;
    if(lat === undefined){

      this.props.navigation.navigate('Loading')
 
    } else {

      url =
      'https://fcc-weather-api.glitch.me/api/current?lat=' +
      lat +
      '&lon=' +
      lon;

    }
    
 
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.getWeather();
  }

  render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.loadContainer}>
          <Image
            source={require('../weatherloading.gif')}
            style={styles.loading}></Image>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.topWeatherBar}>
              <View style={styles.imageAndDescription}>
                <Image
                  source={{ uri: this.state.weather.weather[0].icon }}
                  style={styles.weatherImage}
                />
                <Text style={styles.weatherDescription}>
                  {this.state.weather.weather[0].description}
                </Text>
              </View>
              <Text style={styles.tempStyle}>
                {Math.floor(this.state.weather.main.temp)}&deg;
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>
                Humidity : {this.state.weather.main.humidity}%
              </Text>
              <Text style={styles.textStyle}>
                Feels Like : {this.state.weather.main.feels_like}
              </Text>
            </View>
            <View style={styles.secondtextContainer}>
              <Text style={styles.textStyle}>
                Pressure : {this.state.weather.main.pressure}
              </Text>
              <Text style={styles.textStyle}>
                Wind Speeds : {this.state.weather.wind.speed}
              </Text>
            </View>
          </View>
          <Locate />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
  },
  subContainer: {
    margin: 10,
  },
  textContainer: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#203864',
    padding: 5,
  },
  secondtextContainer: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#203864',
    padding: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  loading: {
    width: '100%',
    height: 200,
  },
  textStyle: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    fontFamily: 'Bahnschrift',
  },
  tempStyle: {
    fontSize: 90,
    fontFamily: 'Bahnschrift',
    padding: 10,
    marginTop: 10,
    color: 'white',
    textShadowColor: '#202050',
    textShadowOffset: { width: 2, height: 2 },
  },
  imageAndDescription: {
    padding: 10,
    alignItems: 'center',
  },
  weatherDescription: {
    fontFamily: 'Times New Roman',
    fontSize: 20,
    color: 'white',
  },
  topWeatherBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5C76A5',
    justifyContent: 'center',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  weatherImage: {
    width: 100,
    height: 70,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 2 },
    elevation: 10,
  },
});

export default WeatherScreen;
