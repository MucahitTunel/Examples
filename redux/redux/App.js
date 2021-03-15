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
  Button
} from 'react-native';


class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
      state:0,
    }


  }

    render(){
      return(
          <View style={styles.container}>
            <Text>Selam</Text>
          </View>
      );
    }

}



const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});



export default App;
