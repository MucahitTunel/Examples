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
  Image
} from 'react-native';

import Constants from '../Constants';


export default class Player extends Component{

  constructor(props){
    super(props);

    var player = this.props.playerNumber;
    console.log(player);
    var who = false;
    if(player === 0){
      who = true;
    }

    console.log(who);

    this.state = {
           sayac: 0,
           who: who,
           refreshPlayer : this.props.deger,
     }

  }

  render(){

    if(this.state.refreshPlayer === true){
      this.props.refresh(this.props.playerNumber);
    }


    if(this.state.who === true){
      return(

        <View style={[styles.container,{backgroundColor: 'green'}]}>

          <Text style={styles.text}>OYUNCU {this.props.playerNumber+1}: </Text>
          <View style={styles.sayacBackground}>
          <Text style={styles.text}> {this.state.sayac} </Text>
          </View>

        </View>

      );
    }else {
      return(

        <View style={styles.container}>

          <Text style={styles.text}>OYUNCU {this.props.playerNumber+1}: </Text>
          <View style={styles.sayacBackground}>
          <Text style={styles.text}> {this.state.sayac} </Text>
          </View>

        </View>

      );
    }



  }

}



const styles = StyleSheet.create({

  container: {
    flex:1,
    flexDirection:'row',
    height:40,
    alignItems:'center',
    justifyContent:'center',

  },
  sayacBackground:{
    width: 40,
    height: 30,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25
  },
  text:{
    fontSize: 20,
  },



});
