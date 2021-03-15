/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SeviyeSayfası from './seviye.js';
import GamePage from './game.js';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Constants from './Constants';


class App extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(


        <ImageBackground
          source={require("./assets/img/background.png")}
          resize="stretch"
          style={{width:Constants.MAX_WIDTH, height:Constants.MAX_HEIGHT}}
        >
        <StatusBar hidden={true}/>

        <View style={styles.container}>

          <View style={{alignItems:'center', justifyContent:'center', marginTop:100, flex:2}}>

            <Text style={{fontSize:40, fontWeight:"bold"}}> EŞİNİ BUL </Text>

          </View>

          <View style={{alignItems:'center', marginTop:50, flex:5}}>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Seviye',{numplayer: 1})}
            >

            <Text style={{fontSize:23}}> 1 OYUNCULU</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Seviye', {numplayer:2})}
            >

            <Text style={{fontSize:23}}> 2 OYUNCULU</Text>

            </TouchableOpacity>

          </View>

          <View style={{flexWrap:'wrap'}}>

          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2213986178919906/2709174574"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
            />

          </View>


        </View>

        </ImageBackground>



    );
  }



}



const styles = StyleSheet.create({

  container: {
    flex:1,
  },
  button:{
    width:250,
    height:75,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'yellow',
    borderRadius:25,
    marginTop:10
  }
});

const MainNavigator = createStackNavigator({
  App: {screen: App},
  Seviye: {screen:SeviyeSayfası},
  Game:{screen:GamePage},
},
{
  initialRouteName: 'App',
  headerMode:'none'
});

const Appp = createAppContainer(MainNavigator);

export default Appp;
