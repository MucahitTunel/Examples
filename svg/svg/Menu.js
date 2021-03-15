import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from './constants';

class Menu extends Component{
  constructor(props){
    super(props);


  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.panel}>
          <Text style={{fontSize:30, fontWeight:"bold"}}>MENÜ</Text>

          <TouchableOpacity
            style={{width:200, height:50, alignItems:'center', justifyContent:'center', marginTop:20, backgroundColor:"yellow"}}
            onPress = {this.props.devam}
          >
          <Text style={{fontSize:20}}> DEVAM ET</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width:200, height:50, alignItems:'center', justifyContent:'center', marginTop:20, backgroundColor:"yellow"}}
            onPress = {this.props.tekrar}
          >
          <Text style={{fontSize:20}}> TEKRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width:200, height:50, alignItems:'center', justifyContent:'center', marginTop:20, backgroundColor:"yellow"}}
            onPress = {this.props.anaSayfa}
          >
          <Text style={{fontSize:20}}> ANA MENÜ</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
  },
  panel:{
    width:300,
    height:300,
    backgroundColor:'pink',
    borderColor:"white",
    alignItems:'center',
    borderWidth:3
  }
})

export default Menu;
