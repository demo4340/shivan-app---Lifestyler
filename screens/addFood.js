import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
//import firebase from 'firebase'

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

class AddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      calories: '',
      type: '',
      description: '',
      url: '',
      link: 'https://i.stack.imgur.com/y9DpT.jpg',
    };
  }

  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  setTypecarbohydrate = () => {
    this.setState({
      type: 'carbohydrate',
    });
  };
  setTypeprotein = () => {
    this.setState({
      type: 'protein',
    });
  };
  setTypefat = () => {
    this.setState({
      type: 'fat',
    });
  };
  setTypefibre = () => {
    this.setState({
      type: 'fibre',
    });
  };

  submitFood = () => {
    if (
      this.state.type !== '' &&
      this.state.name !== '' &&
      this.state.calories !== '' &&
      this.state.description !== '' &&
      this.state.url !== ''
    ) {
      db.collection('food').add({
        name: this.state.name,
        calories: this.state.calories,
        type: this.state.type,
        description: this.state.description,
        url : this.state.url
        //date: firebase.firestore.FieldValue.serverTimestamp().now().toDate()
      });
      this.setState({
        name: '',
        calories: '',
        type: '',
        description: '',
        url: '',
        link: 'https://i.stack.imgur.com/y9DpT.jpg',
      });
      ToastAndroid.show('New Food Item Registered', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Please Fill in Empty Fields', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, marginVertical: 0 }}>
        <ImageBackground
          style={styles.background}
          source={require('../assets/rachel-park-hrlvr2ZlUNk-unsplash.jpg')}
          resizeMode="cover">
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled>
            <View style={styles.header}>
              <SafeAreaView style={styles.safeArea} />
              <View style={styles.logoBox}>
                <Image
                  style={styles.logo}
                  source={require('../assets/LifestylerLogo.png')}
                />
              </View>
              <Text style={styles.title}>LIFESYLER</Text>
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
            <View style = {styles.subHeading}>
            
              <Text style = {styles.subHeadingText}>Add Food</Text>
            
            </View>
            <Image source={{ uri: this.state.link }} style={styles.foodImage} />
            <TextInput
              placeholder="Food Name"
              onChangeText={(text) => {
                this.setState({
                  name: text,
                });
              }}
              value={this.state.name}
              style={styles.name}
            />
            <TextInput
              placeholder="Calories"
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({
                  calories: text,
                });
              }}
              value={this.state.calories}
              style={styles.calories}
            />
            <TextInput
              placeholder="Description"
              onChangeText={(text) => {
                this.setState({
                  description: text,
                });
              }}
              value={this.state.description}
              style={styles.description}
              multiline={true}
            />
            <TextInput
              placeholder="Image Url"
              onChangeText={(text) => {
                this.setState({
                  url: text,
                  link: text,
                });
              }}
              value={this.state.url}
              style={styles.imageUrl}
            />
            <View style={styles.fullType}>
              <Text style={styles.typeTitle}>Type of Food</Text>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={this.setTypecarbohydrate}>
                  <Text style={styles.typeText}>Carbohydrate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={this.setTypeprotein}>
                  <Text style={styles.typeText}>Protein</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={this.setTypefat}>
                  <Text style={styles.typeText}>Fat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={this.setTypefibre}>
                  <Text style={styles.typeText}>Fibre</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.submitFood}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  name: {
    padding: 10,
    margin: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
  },
  calories: {
    padding: 10,
    margin: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
  },
  imageUrl: {
    padding: 10,
    margin: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
  },
  description: {
    margin: 10,
    padding: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
  },
  submitButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#5C7AEA',
    padding: 10,
    width: windowWidth - 20,
    margin: 10,
    borderRadius: 10,
    marginBottom : 75,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  safeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#5C7AEA',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    color: '#E6E6E6',
    fontFamily: 'Times new roman',
    padding: 10,
    textAlign: 'center',
  },
  typeButton: {
    width: windowHeight / 5.4,
    borderRadius: 10,
    backgroundColor: '#5C7AEA',
    padding: 15,
    justifyContent: 'center',
    margin: 5,
  },
  typeContainer: {
    flexDirection: 'row',
  },
  typeText: {
    fontFamily: 'Times New Roman',
    fontSize: 15,
    color: '#E6E6E6',
    textAlign: 'center',
  },
  typeTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  fullType: {
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
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
  logoBox: {
    padding: 5,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#E6E6E6',
    marginTop: windowHeight / 90,
  },
  foodImage: {
    borderRadius: 10,
    width: windowWidth / 1.06,
    height: 250,
    margin: 10,
  },
  subHeading : {

    backgroundColor : 'rgba(255, 255, 255, 0.5)',
    padding : 10,

  },
  subHeadingText : {

    fontSize : 45,
    fontWeight : 'bold',
    color : 'white',
    textAlign : 'center', 

  },
});

export default AddFood;
