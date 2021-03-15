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
  PanResponder,
  Dimensions
} from 'react-native';

import Cell from './Cell';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


class App extends Component{

  constructor(props){
    super(props);
    this.yenileKontrol = 0;
    this.layoutxy = [];
    this.sayac = 0;
    //--------------------------- CELL HÜCRESİ OLUŞTURMA ---------------------------------------
    this.grid = Array.apply(null, Array(8)).map((el, idx) => {
              return Array.apply(null, Array(8)).map((el, idx) => {
                  return null;
              });
          });
    //------------------------------------------------------------------
    this.randNumber();
    this.panResp();

    this.state = {
      mainX:null,
      mainY:null,
      yenile : false,
      kontrol : 0,
    }
  }



  panResp(){
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log(evt.nativeEvent.pageX);
        console.log(evt.nativeEvent.pageY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }




  randNumber = () => {

    var degerler = [];
    for(let i = 0; i< 16; i++){
      let deger = Math.floor(Math.random() * 5) + 1;
      degerler[i] = deger;
    }
    this.random = degerler;

  }



  renderBoard = () =>{
      return Array.apply(null, Array(8)).map((el, rowIdx) => {
              if(rowIdx === 6){
                let cellList = Array.apply(null, Array(8)).map((el, colIdx) => {
                    let sayi = this.random[colIdx];
                    let y = (rowIdx*20+this.state.mainY)+3;
                     return <Cell
                        deger = {sayi}
                        row = {rowIdx}
                        mainX = {this.state.mainX}
                        mainY = {y}
                        layoutxy = {this.layoutxy}
                        ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                    />
                });

                return (
                    <View key={rowIdx} style={{width:344, height:40,flexDirection: 'row', marginBottom:3}}>
                      {cellList}
                    </View>
                )
              }else if (rowIdx === 7) {
                let cellList = Array.apply(null, Array(8)).map((el, colIdx) => {
                    let sayi = this.random[1*8+colIdx];
                    let y = (rowIdx*20+this.state.mainY)+3;
                     return <Cell
                        deger = {sayi}
                        row = {rowIdx}
                        mainX = {this.state.mainX}
                        mainY = {y}
                        layoutxy = {this.layoutxy}
                        ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                    />
                });

                return (
                    <View key={rowIdx} style={{width:344, height:40,flexDirection: 'row', marginBottom:3}} >
                      {cellList}
                    </View>
                )
              }else{
                let cellList = Array.apply(null, Array(8)).map((el, colIdx) => {
                    let sayi = 0;
                    let y = (rowIdx*20+this.state.mainY)+3;
                     return <Cell
                     deger = {sayi}
                     row = {rowIdx}
                     mainX = {this.state.mainX}
                     mainY = {y}
                     layoutxy = {this.layoutxy}
                     ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                    />
                });

                return (
                    <View key={rowIdx} style={{width:344, height:40,flexDirection: 'row', marginBottom:3}} >
                    {cellList}
                    </View>
                )
              }
          });

  }

  onHandler = (e) =>{


    console.log(e);

    if(this.sayac === 0){
      console.log("handler");
      this.sayac = 1;
      this.setState({
        mainX: e.nativeEvent.layout.x,
        mainY: e.nativeEvent.layout.y,
      })
    }else {

    }



  }


  render(){

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={{height:100, backgroundColor:'blue'}}>
          <Text>Merhaba</Text>
        </View>

        <View {...this._panResponder.panHandlers}>
          <View style={{width:WIDTH, alignItems:'center', justifyContent:'center'}} onLayout={this.onHandler} >
            {this.state.mainX !== null && this.state.mainY !== null ?
              <View>
                {this.renderBoard()}
              </View>
              :
              null
            }
          </View>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

export default App;
