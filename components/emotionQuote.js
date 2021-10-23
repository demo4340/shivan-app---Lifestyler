import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class EmotionQuote extends Component {
  constructor() {
    super();
    this.state = {
      quote: '',
    };
  }

  getQuote = async () => {
    //change latitude and longitude

    var url = 'https://zenquotes.io/api/random';
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          quote: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getQuote();
  };

  render() {
    if (this.state.quote === '') {
      return (
        <View style={styles.loadContainer}>
          <View style={styles.loadContainer}>
            <Image
              source={require('../assets/loading.gif')}
              style={styles.loading}></Image>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}> Guiding Quote </Text>
            <Text style={styles.info}>{this.state.quote[0].q}</Text>
            <Text style={styles.author}>- {this.state.quote[0].a}</Text>
          </View>
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
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius : 10,
  },
  title: {
    fontSize: 25,
    padding: 10,
    fontWeight : 'bold',
    color : '#5C7AEA',
  },
  info: {
    fontSize: 20,
    padding: 10,
  },
  author: {
    textAlign: 'right',
    padding: 10,
    fontSize: 20,
  },
});
