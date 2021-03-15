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

    this.food = [Images.food1,Images.food2,Images.food3,Images.food4,Images.food5,Images.food6,Images.food7,Images.food8,Images.food9,Images.food10,Images.food11,Images.food12,Images.food13,Images.food14,Images.food15,Images.food16,Images.food17,Images.food18,Images.food19,Images.food20,Images.food21,Images.food22,Images.food23,Images.food24,Images.food25,Images.food26,Images.food27,Images.food28,Images.food29,Images.food30,Images.food31,Images.food32, Images.food33];
    this.state = {
           revealed: false,
           done: false,
           deger: this.props.deger,
           activated: true,
           valueswap:this.props.swapdurum,

     }

  }


  onReveal = (userInitiated) => {

       this.setState({
           revealed: true
       }, () => {
         this.props.onReveal(this.props.x, this.props.y)
       });
   }




  render(){

    if(this.state.valueswap === true){
      this.props.valueChange(this.props.x,this.props.y,this.props.deger);
    }

    if(this.state.activated){
      if(!this.state.revealed && !this.state.done){
        return(

          <TouchableOpacity onPress={() => { this.onReveal(true); }}>
              <View style={[ styles.cell, { width: this.props.width, height: this.props.height }]}>

              </View>
          </TouchableOpacity>

        );
      }else if(this.state.revealed){

        return(
          <View style={[ styles.revealed, {width: this.props.width,height: this.props.height}]}>
            <Image
              source={this.food[this.props.deger]}
            />
          </View>
        );
      }else if(this.state.done) {
        let content = null;
        return(
          <View style={[ styles.done, { width: this.props.width, height: this.props.height }]}>
              {content}
          </View>
        );
      }
    }else {
      if(!this.state.revealed && !this.state.done){
        return(

          <TouchableOpacity >
              <View style={[ styles.cell, { width: this.props.width, height: this.props.height }]}>

              </View>
          </TouchableOpacity>

        );
      }else if(this.state.revealed){

        return(
          <View style={[ styles.revealed, {width: this.props.width,height: this.props.height}]}>
            <Image
              source={this.food[this.props.deger]}
            />
          </View>
        );
      }else if(this.state.done) {
        let content = null;
        return(
          <View style={[ styles.done, { width: this.props.width, height: this.props.height }]}>
              {content}
          </View>
        );
      }
    }

  }



}



const styles = StyleSheet.create({

  container: {
    flex:1,
  },
  cell:{
    backgroundColor: '#f8543b',
    borderWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#7d7d7d',
    borderBottomColor: '#7d7d7d'
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
