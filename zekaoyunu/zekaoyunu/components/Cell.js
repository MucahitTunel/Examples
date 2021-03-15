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


export default class Cell extends Component{

  constructor(props){
    super(props);

    this.state = {
           click:false,
           deger: this.props.deger,
     }

  }


  onClick = (userInitiated) => {
         this.props.onClick(this.props.x, this.props.y)
   }




  render(){


    if(this.state.click === true){
      return(
        <TouchableOpacity onPress={() => { this.onClick() }}>
            <View style={[ styles.clickcell, { width: this.props.width, height: this.props.height }]}>
              <Text style={{fontSize:this.props.size, fontWeight:'bold'}}> {this.props.deger} </Text>
            </View>
        </TouchableOpacity>

      );
    }else {
      return(
        <TouchableOpacity onPress={() => { this.onClick() }}>
            <View style={[ styles.cell, { width: this.props.width, height: this.props.height }]}>
              <Text style={{fontSize:this.props.size, fontWeight:'bold'}}> {this.props.deger} </Text>
            </View>
        </TouchableOpacity>

      );
    }


    }

}



const styles = StyleSheet.create({

  container: {
    flex:1,
  },
  cell:{
    backgroundColor: '#83f43d',
    borderWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#7d7d7d',
    borderBottomColor: '#7d7d7d',
    alignItems:'center',
    justifyContent:'center'
  },
  clickcell:{
    backgroundColor: '#f6a9bf',
    borderWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#7d7d7d',
    borderBottomColor: '#7d7d7d',
    alignItems:'center',
    justifyContent:'center'
  },
  done:{
    backgroundColor: '#b29995',
    borderWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#7d7d7d',
    borderBottomColor: '#7d7d7d'
  },
  revealed:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#b29995',
    borderWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#7d7d7d',
    borderBottomColor: '#7d7d7d',


  }


});
