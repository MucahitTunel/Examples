import React, {Component} from 'react'
import { View,
    Dimensions,
     StyleSheet, Animated, FlatList, Text, SafeAreaView,StatusBar } from 'react-native'

import Svg, {Line} from 'react-native-svg';
import { GameEngine, dispatch } from "react-native-game-engine";
import Constants from './Constants';
import { Head } from "./head";
import { Beden } from "./beden";
import { Parmak } from "./parmak";
import { GameLoop } from "./systems";

let {width:W,height:H} = Dimensions.get("window");
const DEGERY = Math.floor((Constants.MAX_HEIGHT - 400) / 2);
const DEGERX = Math.floor((Constants.MAX_WIDTH - 400) / 2);



export default class test0123 extends React.Component{

    constructor(props){
        super(props);

        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.engine = null;


        this.state={
            deger : 5,
            noktalar : "",
            running: true,
            xdegeri: 0,
            ydegeri: 0,
            headx:0,
            heady:0,
            ciz: "0",
        }

      }


      randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onEvent = (e) => {

      if(e.type==="ciz"){

        this.setState({

          headx:e.headx,
          heady:e.heady,
          ciz:"1",
        })

      }



    }


    render(){

      console.log(this.state.headx);
      console.log(this.state.heady);
      console.log(this.state.xdegeri);
      console.log(this.state.ydegeri);
      console.log(this.state.running);

      return(
        <View style = {styles.container}>

          <View style={{width:400, height:400}}>

          <GameEngine
                    ref={(ref) => { this.engine = ref;console.log(ref); }}
                    style={[{ width: this.boardSize, height: this.boardSize, backgroundColor: '#ffffff', flex: null, clickable:true }]}
                    entities={{
                          head: { position: [this.randomBetween(0, 19), this.randomBetween(0, 19)], size: 20, renderer: <Head />},
                          1 : {position: [this.randomBetween(0, 19), this.randomBetween(0, 19)], size: 20,backgroundColor:"green",degisim: 0,renderer: <Beden />},
                          2 : {position: [this.randomBetween(0, 19), this.randomBetween(0, 19)], size: 20,backgroundColor:"green",degisim: 0, renderer: <Beden />},
                          3 : {position: [this.randomBetween(0, 19), this.randomBetween(0, 19)], size: 20,backgroundColor:"green",degisim: 0, renderer: <Beden />},
                          4 : {position: [this.randomBetween(0, 19), this.randomBetween(0, 19)], size: 20,backgroundColor:"green",degisim: 0, renderer: <Beden />},

                      }}

                    systems={[ GameLoop ]}
                    running={this.state.running}
                    onEvent={this.onEvent}>

                    <StatusBar hidden={true}/>

                    {this.state.ciz === "1" ?

                       <Line x1={this.state.headx} y1={this.state.heady} x2={this.state.xdegeri} y2={this.state.ydegeri} stroke="red" strokeWidth="2" />
                    :

                    null
                    }




          </GameEngine>
          </View>

        </View>
      );

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
