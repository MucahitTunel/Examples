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
  TouchableOpacity
} from 'react-native';


class Cell extends Component{

  constructor(props){
    super(props);


    this.state = {
      deger : this.props.deger,
      row : this.props.row,
      mainlayout : this.props.layoutxy,
      x:null,
      y:null,
      mainX:this.props.mainX,
      mainY:this.props.mainY,

    }
  }

  onHandler = (e) =>{
    const {x,y} = e.nativeEvent.layout;
    this.setState({
      x:x+this.state.mainX,
      y:y+this.state.mainY,
    })
  }

  render(){

    const {x,y} = this.state;

    console.log("**************************************");
    console.log(this.state.mainX);
    console.log(this.state.mainY);
    console.log("**************************************");

    let tx = Math.floor(x +this.state.mainX);
    let ty = Math.floor(y +this.state.mainY+100);

    return (
      <View style={styles.container} onLayout={this.onHandler}>
        <TouchableOpacity>
          <View style={{width:40, height:40, alignItems:'center', justifyContent:'center', backgroundColor:'lightblue', borderRadius:3}}>
              <Text style={{fontSize:10, fontWeight:'bold'}}>{tx}-{ty}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:40,
    width:40,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#7d7d7d',
    borderBottomColor: '#7d7d7d',
    borderRadius:3,
    marginLeft:3,
  }
});

export default Cell;
