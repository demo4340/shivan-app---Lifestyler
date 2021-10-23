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
import * as Linking from 'expo-linking';
import AppLoading from 'expo-app-loading';

export default class NewsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    Linking.openURL(this.props.item.url);
    this.props.onPress && this.props.onPress();
  };

  render() {
    if (this.props.item.author === '') {
      
      return <Image source = {require('../assets/weatherloading.gif')} style = {{width : 100, height : 100}}/>

    } else {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.props.item.urlToImage }}
            style={styles.image}
          />
          <Text style={styles.title}>{this.props.item.title} </Text>
          <Text style={styles.text} numberOfLines={5}>
            {this.props.item.description}
          </Text>
          <Text
            style={styles.readMore}
            onPress={() => {
              this.handlePress();
            }}>
            Read More
          </Text>
          <Text style={styles.author}> - {this.props.item.author} </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 300,
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  author: {
    textAlign: 'right',
    margin: 10,
  },
  readMore: {
    color: 'red',
    margin: 10,
  },
});
