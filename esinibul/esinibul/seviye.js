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

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import Constants from './Constants';


export default class App extends Component{

  constructor(props){
    super(props);

    var numplayer = this.props.navigation.getParam('numplayer');
    this.state = {
      numplayer: numplayer,
    }

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
              onPress={() => this.props.navigation.navigate('Game',{numplayer: this.state.numplayer, level: 1})}
            >

            <Text style={styles.text}> 4 x 4</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Game',{numplayer: this.state.numplayer, level: 2})}
            >

            <Text style={styles.text}> 6 x 6</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Game',{numplayer: this.state.numplayer, level: 3})}
            >

            <Text style={styles.text}> 8 x 8</Text>

            </TouchableOpacity>

          </View>


        </View>


        <View style={{flexWrap:'wrap'}}>

        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-2213986178919906/2709174574"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
          />

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
  },
  text:{
    fontSize:30,
  }
});
