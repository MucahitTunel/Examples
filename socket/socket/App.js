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
  TextInput,
  AppState,
  TouchableOpacity,
} from 'react-native';
import io from "socket.io-client";
import { YellowBox } from 'react-native'


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

class App extends Component{

  constructor(props){
    super(props);
    this.count = 0;

    this.state = {
      chatMessage : '',
      name:"phone",
      number:0,
      appState: AppState.currentState,
    }


    this.socket = io("http://192.168.1.104:3000",{ forceNode: true });
    this.socket.on("playerNumber", number =>{
      this.setState({
        number,
      })
      console.log(number);

    })

    this.socket.on('conversation private post', function(data) {
      console.log("*********************");
        console.log(data);
        console.log(data.message);
      console.log("***********************");
    });



    this.socket.emit('subscribe', 6);





  }


  submitChatMessage(){

    this.socket.emit('send message', {
        room: 6,
        message: this.state.chatMessage
    });



    this.socket.emit("chat message", this.state.chatMessage)
    this.setState({chatMessage:''})
  }






  render(){

    return(

      <View style={styles.container}>
        <TextInput
          style={{height:50, borderWidth:2}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={ chatMessage =>{
            this.setState({
              chatMessage
            })
          }}
        />


        <Text>{this.state.number}</Text>

      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },




});

export default App;
