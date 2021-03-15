/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';


class App extends Component{

  constructor(props){
    super(props);


    this.kaydir = new Animated.Value(0);
    this.kaydir2 = new Animated.Value(0);

  }


  componentDidMount(){

    Animated.sequence([
      Animated.spring(this.kaydir,{
        toValue : 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(this.kaydir2,{
        toValue : 1,
        duration: 1000,
        useNativeDriver: true
      }),
    ]).start();

  }




  render(){

    const left = this.kaydir.interpolate({
      inputRange: [0,1],
      outputRange: [-500,0]
    })

    const left2 = this.kaydir2.interpolate({
      inputRange: [0,1],
      outputRange: [-500,0]
    })

    return(
      <View style={styles.container}>

        <Animated.View style={{width:300, height:100, backgroundColor:'lightblue', marginTop:10, alignItems:'center', transform:[{translateX:left}] }}></Animated.View>
        <Animated.View style={{width:300, height:100, backgroundColor:'lightblue', marginTop:10, alignItems:'center', transform:[{translateX:left2}]}}></Animated.View>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});

export default App;
