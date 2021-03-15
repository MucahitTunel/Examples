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
  Button,
} from 'react-native';
import anneal from './anneal';

import {rand} from "./randnum";
import {genetic} from "./genetics"

class App extends Component <Props>{

  constructor(props){
    super(props);

    this.state={
      temp: "",
      cities: [],
    }

  }


  tikla(){

    console.log("-----------------------------TIKLA------------------------------------------");

    const { cities, temp } = this.state;
    const bestSol = anneal(cities, 100);
    const bestPath = bestSol[0];
    const bestPathLengthArr = bestSol[1];
    const bestPathLength = bestSol[2];
    const tempArr = bestSol[3];


    console.log("-----------------------------------------------------------------------BESTPATH");
    console.log(bestPath);
    console.log("-----------------------------------------------------------------------BESTPATHLENGTHARR");
    console.log(bestPathLengthArr);
    console.log("-----------------------------------------------------------------------BESTPATHLENGTH");
    console.log(bestPathLength);

    console.log("-----------------------------------------------------------------------");
  }




  componentDidMount(){

    var degerx = [];
    var degery = [];
    var x = 0;
    var y = 0;

    var newstate = [];

    for(var i = 0; i< 20;i++){
      newstate = newstate.concat(rand());
    }

    array = newstate[0];

    newstate = newstate.concat(array);

    console.log("*******************DEĞERLER***************************");
    console.log(newstate);
    console.log("*******************DEĞERLER***************************");
    this.setState({
      cities : newstate,
    })

  }

  render(){
    return(
      <View>

        <Button
          onPress={() => {this.tikla()}}
          title="Tıkla"
        />


      </View>
    );
  }


}


export default App;
