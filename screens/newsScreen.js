import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

import NewsCard from '../components/newsCard';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default class News extends React.Component {
  constructor() {
    super();

    this.state = {
      news: [],
    };
  }

  componentDidMount = async () => {
    await this.date();
    this.getNews();
  };

  menuTabNavigate = () => {
    this.props.navigation.openDrawer();
  };

  date() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var cDate = year + '-' + month + '-' + date;
    var stringCDate = String(cDate);
    this.setState({
      date: stringCDate,
    });
  }

  getNews = async () => {
    //change latitude and longitude

    var url =
      'https://newsapi.org/v2/top-headlines?country=in&apiKey=7780e634fb1144d3bebb1dc3dc477498';
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          news: responseJson,
        });
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderItem = ({ item }) => {
    return <NewsCard item={item} />;
  };

  keyExtractor = (item, index) => index.toString();

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
        <ScrollView>
          <View style={styles.subHeading}>
            <Text style={styles.newsTitle}>BREAKING NEWS</Text>
          </View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.news.articles}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
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
  subHeading: {
    backgroundColor: '#14279B',
  },
  newsTitle: {
    fontSize: 45,
    color: '#E6E6E6',
    fontFamily: 'Times new roman',
    textAlign: 'center',
    padding: 10,
  },
});
