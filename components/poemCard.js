import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class PoemCard extends Component {
  constructor() {
    super();
    this.state = {
      poem: '',
      poet : '',
      url : '',
    };
  }

  getPoem = async () => {
    //change latitude and longitude

    var url = 'https://www.poemist.com/api/v1/randompoems';
    return await fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          poem: responseJson[0],
          poet : responseJson[0].poet.name
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getPoem();
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
            <Text style={styles.title}> {this.state.poem.title} </Text>
            <Text style={styles.info}>{this.state.poem.content}</Text>
            <Text style={styles.author}>{this.state.poet}</Text>
          </View>
        </View>
      ); 
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
    marginBottom : 100
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
    fontSize: 15,
    padding: 10,
  },
  author: {
    textAlign: 'right',
    padding: 10,
    fontSize: 20,
  },
  loading : {

    width : '100%',
    height : 200,

  },
});
