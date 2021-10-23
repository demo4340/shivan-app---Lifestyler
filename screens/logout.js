import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import auth from '@react-native-firebase/auth';

export default class Logout extends Component {
  componentDidMount() {
    firebase 
      .auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then(firebase.auth().currentUser.getIdToken(true))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Logout</Text>
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
});
