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
import EmotionsQuote from '../components/emotionQuote';
import PoemCard from '../components/poemCard';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default class Emotions extends React.Component {
  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  constructor() {
    super();
    this.state = {};
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
        <ScrollView style = {styles.scrollView}>
          <Text style={styles.emotiontext}>Emotions</Text>
        
        <Image
          source={require('../assets/vanessa-bucceri-X1gTLgWMDKg-unsplash.jpg')}
          style={styles.image}></Image>

        
          <EmotionsQuote />
          <PoemCard />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
  },
  scrollView : {

    marginVertical : 10,

  },
  image: {
    margin: 10,
    width: windowWidth / 1.09,
    height: 250,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 10,
  },
  emotiontext: {
    fontFamily: 'Calibri',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
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
