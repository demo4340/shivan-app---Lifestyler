import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'firebase';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.push('DashBoard', { screen: 'Home' });
      } else {
        this.props.navigation.push('SignIn');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/LifestylerLogo.png')}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: RFValue(200),
    height: RFValue(148),
  },
});
