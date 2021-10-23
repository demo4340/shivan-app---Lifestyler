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
import Logout from './logout';
import firebase from 'firebase';
import Login from '../logIn';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      emailId: '',
      profile_image: '',
      lastName: '',
    };
  }
  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };
  componentDidMount() {
    this.fetchUser();
  }
  logout = () => {
    firebase
      .auth()
      .signOut() 
      .then(firebase.auth().currentUser.reload())
      
  };
  async fetchUser() {
    let theme, name, image, gmail, lastName;
    await firebase

      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        name = snapshot.val().first_name;
        lastName = snapshot.val().last_name;
        image = snapshot.val().profile_picture;
        gmail = snapshot.val().gmail;
      });

    this.setState({
      name: name,
      profile_image: image,
      emailId: gmail,
      lastName: lastName,
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} elevation={3}>
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={{ uri: this.state.profile_image }}
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

        <View>
          <Image
            source={{ uri: this.state.profile_image.slice(0, -4) + '1080-c' }}
            style={styles.mainImage}
          />
          <Text style={styles.profileTitle}>Your Profile</Text>
          <Text style={styles.text}>Name : {this.state.name}</Text>
          <Text style={styles.text}>Last Name : {this.state.lastName}</Text>
          <Text style={styles.text}>Email : {this.state.emailId}</Text>

          <TouchableOpacity
            onPress={() => {
              this.logout();
            }}
            style={styles.logoutBox}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
    flex: 1,
  },
  text: {
    fontSize: 17,
    textAlign: 'left',
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  mainImage: {
    width: RFValue(200),
    height: RFValue(200),
    borderRadius: 500,
    margin: 10,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#5C7AEA',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30,
  },
  profileTitle: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  logoutBox: {
    margin: 10,
    backgroundColor: '#5C7AEA',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    marginBottom: 80,
  },
  logoutText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
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
    borderRadius: 50,
    backgroundColor: '#E6E6E6',
    marginTop: windowHeight / 90,
  },
});
