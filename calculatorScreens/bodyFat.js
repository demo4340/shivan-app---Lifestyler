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

class BodyFat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 0,
      height: 0,
      age: 0,
      progress: 0,
      bodyFat: 0,
      color: 'black',
      result: 'Not Calculated',
    };
  }

  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  calculate = () => {
    if (this.state.weight !== 0 && this.state.height !== 0) {
      var bodyFat = Math.floor(
        1.2 * (this.state.weight / (this.state.height * this.state.height)) +
          0.23 * this.state.age -
          16.2
      );
      this.setState({
        bodyFat,
        progress: ((bodyFat * 2) / 100) * 0.7,
      });
      ToastAndroid.show('Body Fat % Calculated', ToastAndroid.SHORT);
      if (this.state.age > 61) {
        if (bodyFat > 30) {
          this.setState({
            result: 'Obese',
            color: 'red',
          });
        } else if (bodyFat > 25) {
          this.setState({
            result: 'OverWeight',
            color: 'orange',
          });
        } else if (bodyFat > 13) {
          this.setState({
            result: 'Normal',
            color: 'green',
          });
        } else {
          this.setState({
            result: 'UnderWeight',
            color: 'blue',
          });
        }
      } else if (this.state.age > 41) {
        if (bodyFat > 27) {
          this.setState({
            result: 'Obese',
            color: 'red',
          });
        } else if (bodyFat > 22) {
          this.setState({
            result: 'OverWeight',
            color: 'orange',
          });
        } else if (bodyFat > 11) {
          this.setState({
            result: 'Normal',
            color: 'green',
          });
        } else {
          this.setState({
            result: 'UnderWeight',
            color: 'blue',
          });
        }
      } else if (this.state.age > 0) {
        if (bodyFat > 25) {
          this.setState({
            result: 'Obese',
            color: 'red',
          });
        } else if (bodyFat > 19) {
          this.setState({
            result: 'OverWeight',
            color: 'orange',
          });
        } else if (bodyFat > 8) {
          this.setState({
            result: 'Normal',
            color: 'green',
          });
        } else {
          this.setState({
            result: 'UnderWeight',
            color: 'blue',
          });
        }
      }
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
          <Text style={styles.subHeadingText}>Body Fat</Text>
        </View>
        <View style={styles.bmiCalc}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Height in m"
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
            <Text style={styles.bmiText}>BodyFat : {this.state.bodyFat}</Text>
            <Text style={styles.bmiResult}>{this.state.result}</Text>
            <ProgressBar
              style={styles.progressBar}
              progress={this.state.progress}
              color={this.state.color}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={this.calculate}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={styles.bmiImage}
            source={{
              uri:
                'https://www.topendsports.com/testing/images/bodyfat-visual-reference-men.gif',
            }}
          />
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
    width: 300,
    height: 150,
    borderRadius: 10,
    borderColor: 'white',
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
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
    height: '53.5%',
  },
  progressBar: {
    width: '70%',
    height: '25%',
    alignSelf: 'center',
    borderRadius: 20,
    margin: 10,
    marginBottom: -20,
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

export default BodyFat;
