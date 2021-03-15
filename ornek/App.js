import React, {Component} from 'React';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component{
  render(){
    return(

      <View style={styles.bg}>

        <Text style={styles.welcome}>App.js</Text>
        <TouchableOpacity style={styles.touch} onPress={() => {}}>
          <Text style={styles.text}> İkinci Sayfayı aç</Text>
        </TouchableOpacity>

      </View>

    );
  }
}


const styles = StyleSheet.create({

  bg: {flex:1, justifyContent:'center', alignItem:'center'},
  welcome:{fontSize:36, color:'blue'},
  touch:{marginTop:20, backgroundColor: 'red', paddingHorizontal:20, paddingVertical:10, borderRadius:5 },
  text: {fontSize:18, color:'black'}

});
