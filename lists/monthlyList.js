import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { SearchBar, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

var customFonts = {
  'Cursive-Font': require('../fonts/cursive.ttf'),
};

export default class MonthlyList extends React.Component {
  constructor() {
    super();
    this.state = {
      allLists: [],
      dataSource: [], 
      search: '',
      list: '',
      importance: '',
      time: '',
      color: '',
      fontsLoaded: false,
    };
  }
  componentDidMount() {
    this.retriveLists();
    this._loadFontsAsync();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidUpdate() {
    this.retriveLists();
  }

  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  addItemToList = (list) => {
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection(String(new Date().getMonth()) +' '+ String(new Date().getFullYear()))
      .add({
        list: list,
        time: new Date().getDay() + ' , ' + new Date().getHours() + ' H',
        timeToFinish: this.state.time,
        importance: this.state.importance,
        color: this.state.color,
      });
  };

  retriveLists = () => {
    try {
      var allLists = [];
      var list = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection(String(new Date().getMonth()) +' '+ String(new Date().getFullYear()))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            allLists.push(doc.data());
          });
          this.setState({ allLists });
        });
    } catch (error) {
      console.log(error);
    }
  };

  setNotImportant = () => {
    this.setState({
      importance: 'Not Important',
      color: '#007000',
    });
  };

  setSlightlyImportant = () => {
    this.setState({
      importance: 'Slightly Important',
      color: '#238823',
    });
  };

  setImportant = () => {
    this.setState({
      importance: 'Important',
      color: '#FFBF00',
    });
  };

  setVeryImportant = () => { 
    this.setState({
      importance: 'Very Important',
      color: '#D2222D',
    }); 
  };

  updateList = (list) => {
    if (
      this.state.list !== '' &&  
      this.state.importance !== '' &&
      this.state.time !== ''
    ) {
      this.addItemToList(list);
      ToastAndroid.show('Item added to Daily List', ToastAndroid.SHORT);
      this.setState({

        list : '',
        color : '',
        importance : '',
        time : '',

      })
    } else {
      ToastAndroid.show('Fill in Empty Fields', ToastAndroid.SHORT);
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subHeading}>
              <Text style={styles.subHeadingTitle}>My Monthly List</Text>
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

            <View styles={{ height: 20, width: '100%' }}></View>
            <TextInput
              placeholder="Note to Make"
              onChangeText={(list) => {
                this.setState({ list: list });
              }}
              style={styles.name}
            />
            <TextInput
              placeholder="Time to Finish"
              onChangeText={(time) => {
                this.setState({ time });
              }}
              style={styles.name}
            />

            <View style={styles.fullType}>
              <Text style={styles.typeTitle}>Level of Importance</Text>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={styles.type1Button}
                  onPress={this.setNotImportant}>
                  <Text style={styles.typeText}>Not Important</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.type2Button}
                  onPress={this.setSlightlyImportant}>
                  <Text style={styles.typeText}>Slightly Important</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={styles.type3Button}
                  onPress={this.setImportant}>
                  <Text style={styles.typeText}>Important</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.type4Button}
                  onPress={this.setVeryImportant}>
                  <Text style={styles.typeText}>Very Important</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                this.updateList(this.state.list);
              }}>
              <Text style={styles.submitText}>Add To Your Monthly List</Text>
            </TouchableOpacity>

            <FlatList
              data={this.state.allLists}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={[styles.containerText, { color: item.color }]}>
                    {item.time}
                  </Text>
                  <Text style={[styles.containerText, { color: item.color }]}>
                    - {item.list}, by {item.timeToFinish}, as it is{' '}
                    {item.importance}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flat}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
  },
  itemContainer: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 20,
    flexDirection: 'row',
  },
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#5C7AEA',
    padding: 10,
    width: windowWidth - 20,
    margin: 10,
    borderRadius: 10,
  },
  flat: {
    marginBottom: '10%',
  },
  name: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  containerText: {
    fontSize: 25,
    fontFamily: 'Cursive-Font',
  },
  menu: {
    width: 35,
    height: 25,
    marginTop: windowHeight / 40,
    marginLeft: 25,
  },
  type1Button: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: '#007000',
    padding: 15,
    justifyContent: 'center',
    margin: 5,
  },
  type2Button: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: '#238823',
    padding: 15,
    justifyContent: 'center',
    margin: 5,
  },
  type3Button: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: '#FFBF00',
    padding: 15,
    justifyContent: 'center',
    margin: 5,
  },
  type4Button: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: '#D2222D',
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
    margin: 10,
  },
  fullType: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeading: {
    backgroundColor: '#14279B',
    flexDirection: 'row',
    justifyContent: 'center',
    padding : 10,
  },
  subHeadingTitle: {
    fontSize: 45,
    color: '#E6E6E6',
    fontFamily: 'Cursive-Font',
    textAlign: 'center',
    padding: 10,
  },
});
