import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default class Login extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  lat : 0,
                  lon : 0,
                  current_theme: 'dark',
                })
                .then(function (snapshot) {})
                .then(firebase.auth().currentUser.getIdToken(true)).then(firebase.auth().currentUser.reload())
            }
          })
          .catch((error) => {   
            // Handle Errors here. 
            var errorCode = error.code; 
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });

        this.props.navigation.navigate('Home', {screen : 'Home'});
      } else {
        console.log('User already signed-in Firebase.');
        this.props.navigation.navigate('Home');
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '754252579999-hv9uqe9ca96n1q85uuai8hqae4htb6fn.apps.googleusercontent.com',
        iosClientId:
          '72696421845-osrvc36bjie4264j4c0812sp5a2egqhj.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        this.onSignIn(result);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={require('./assets/LifestylerLogo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.subContainer}>
          <Image
            source={require('./assets/google.png')}
            style={styles.googleLogo}
          />
          <TouchableOpacity
            onPress={() => this.signInWithGoogleAsync()}
            style={styles.button}>
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
  },
  subContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    margin: 10,
    width: '80%',
  },
  text: {
    textAlign: 'center',
    backgroundColor: '#5C7AEA',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    width: 200,
    margin: 10,
  },
  googleLogo: {
    width: 200,
    height: 66,
    margin: 10,
  },
  logo: {
    width: 200,
    height: 148,
  },
});
