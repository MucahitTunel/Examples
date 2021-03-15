/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
      data:"",
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch('http://192.168.1.107:4545/Kullanici',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:'Muco',
      })
    }
  );

    const user = await response.json();
    console.log(user.message);
    this.setState({data:user.message})
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.font}>{this.state.data}</Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  font:{
    fontSize:50,
    fontWeight:'bold',
    color:'rgba(0,0,0,1)',
  }
});

export default App;
