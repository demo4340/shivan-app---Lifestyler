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
} from 'react-native';
import { SearchBar, Header } from 'react-native-elements';
import db from '../config';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default class CheckFoodScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allFood: [],
      dataSource: [],
      search: '',
    };
  }
  componentDidMount() {
    this.retriveFood();
  }

  componentDidUpdate(){

    this.retriveFood

  }

  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  retriveFood = () => {
    try {
      var allFood = [];
      var food = db
        .collection('food')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            allFood.push(doc.data());
          });
          this.setState({ allFood });
        });
    } catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.allFood.filter((item) => {
      const itemData = item.name | item.type? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require('../assets/LifestylerLogo.png')}
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
        <View styles={{ height: 20, width: '100%' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Type Here..."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.search}
          />
        </View>

        <FlatList
          data={
            this.state.search === ''
              ? this.state.allFood
              : this.state.dataSource
          }
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source = {{uri : item.url}} style = {styles.image}/>
              <Text style={styles.containerTitle}>{item.name}</Text>
              <Text style={styles.containerText}>
                Calories : {item.calories} Calories Per 100 Gram
              </Text>
              <Text style={styles.containerText}>Type : {item.type}</Text>
              <Text style={styles.containerText}>
                Description : {item.description}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style = {styles.flat}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
  },
  itemContainer: {
    width: '90%',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 20,
  },
  flat : {

    marginBottom : '60%',    

  },
  image : {

    width : '95%',
    height : 250,
    borderRadius : 10,
    margin : 10,
    alignSelf : 'center'

  },
  containerText: {
    fontSize: 15,
    margin: 10,
    fontFamily: 'Times New Roman',
  },
  containerTitle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#5C7AEA',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#5C7AEA',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30,
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
  title: {
    fontSize: 30,
    color: '#E6E6E6',
    fontFamily: 'Times new roman',
    marginTop: 10,
    marginLeft: 25,
  },
  logoBox: {
    padding: 5,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#E6E6E6',
    marginTop: windowHeight / 90,
  },
});
