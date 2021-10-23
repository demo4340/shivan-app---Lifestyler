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
import { ProgressBar, Colors } from 'react-native-paper';
//import firebase from 'firebase'

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

class IDEAL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 0,
      height: 0,
      age: 0,
      progress: 0,
      ideal: 0,
    };
  }

  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  calculate = () => {
    if (this.state.weight !== 0 && this.state.height !== 0) {
      var ideal = Math.floor(
        50+(0.9*(this.state.height-152))
      );
      this.setState({
        ideal,
      });
      ToastAndroid.show('Ideal Weight Calculated', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Please fill in the empty fields!', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.subHeading}>
          <Text style={styles.subHeadingText}>Ideal Weight</Text>
        </View>
        <View style={styles.bmiCalc}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Height in cm"
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({
                  height: text,
                });
              }}
              value={this.state.height}
              style={styles.numberInput}
            />

            <TextInput
              placeholder="Weight in KG"
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({
                  weight: text,
                });
              }}
              value={this.state.weight}
              style={styles.numberInput}
            />

            <TextInput
              placeholder="Age"
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({
                  age: text,
                });
                console.log(this.state.age);
              }}
              value={this.state.age}
              style={styles.numberInput}
            />
          </View>
          <View style={styles.bmiResultContainer}>
            <Text style={styles.bmiText}>Ideal Weight</Text>
            <Text style={styles.bmiText}>{this.state.ideal} kg</Text>
            <Text style={styles.bmiResult}>Using Devine's Formula</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={this.calculate}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <ScrollView vertical style = {{marginBottom : 400}}>
          <ScrollView horizontal>
          <Image
            style={styles.bmiImage}
            source={{
              uri:
                'https://www.weightlossresources.co.uk/img/i/ideal-weight-imperial-uk-men.jpg',
            }}
          />
          </ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
    flex: 50,
  },
  bmiImage: {
    width: 930,
    height: 650,
    borderRadius: 10,
    borderColor: 'white',
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin : 20,
  },
  numberInput: {
    padding: 10,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '85%',
  },
  bmiResultContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '60%',
    margin: 10,
    borderRadius: 10,
    height: '56%',
  },
  bmiCalc: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '-36%',
  },
  bmiResult: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'column',
  },
  bmiText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#5C7AEA',
    padding: 10,
    width: '90%',
    margin: 10,
    borderRadius: 10,
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
  subHeading: {
    backgroundColor: '#14279B',
    padding: 10,
  },
  subHeadingText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default IDEAL;
