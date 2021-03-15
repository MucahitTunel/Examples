
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
  BackHandler,
} from 'react-native';


import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import Constants from './Constants';
import Cell from './components/Cell';
import Images from './assets/Image';
import {shuffle} from './components/utils';
import Player from './components/Player';
import Pause from './Pause';
import Tebrikler from './Tebrikler';


export default class Game extends Component{

  constructor(props){
    super(props);

    numplayer = this.props.navigation.getParam('numplayer');
    level = this.props.navigation.getParam('level')
    this.counter = 0;
    this.pausevalue = null;
    this.swapDurum = false;
    this.refreshPlayer = false;


    this.kolay = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    this.orta = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    this.zor = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]

    if(level === 1){
      this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
      this.grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, idx) => {
              return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, idx) => {
                  return null;
              });
          });
    }else if(level === 2) {
      this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE_ORTA;
      this.grid = Array.apply(null, Array(Constants.BOARD_SIZE_ORTA)).map((el, idx) => {
              return Array.apply(null, Array(Constants.BOARD_SIZE_ORTA)).map((el, idx) => {
                  return null;
              });
          });
    }else {
      this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE_ZOR;
      this.grid = Array.apply(null, Array(Constants.BOARD_SIZE_ZOR)).map((el, idx) => {
              return Array.apply(null, Array(Constants.BOARD_SIZE_ZOR)).map((el, idx) => {
                  return null;
              });
          });
    }


    if(numplayer === 1){

        this.player = Array.apply(null, Array(1)).map((el, index) =>{
          return null;
        });

    }else {
        this.player = Array.apply(null, Array(2)).map((el, index) =>{
          return null;
        });
    }




    this.sayac = 0;
    this.x = null;
    this.y = null;


    this.state = {
      food : [Images.food1,Images.food2,Images.food3,Images.food4,Images.food5,Images.food6,Images.food7,Images.food8,Images.food9],
      numplayer:numplayer,
      level:level,
      retry: false,
      pause:false,
      tebrikler : false,
      kazanan: 0,
    }


    this.onButtonPress = this.onButtonPress.bind(this);
    this.onPause = this.onPause.bind(this);

  }//constructor

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    return true;
  }


  onReveal = (x, y) => {
    if(this.sayac === 0){
      this.sayac = 1;
      this.x = x;
      this.y = y;

    }else {

      if(this.grid[this.x][this.y].state.deger === this.grid[x][y].state.deger){

        this.sayac = 0;
        this.onWho();
        this.count();

        if(this.player.length === 1){
          this.player[0].setState({
            sayac: this.player[0].state.sayac + 1,
          })
        }else {
          if(this.player[0].state.who){
            this.player[0].setState({
              sayac: this.player[0].state.sayac + 1,
            })
          }else {
            this.player[1].setState({
              sayac: this.player[1].state.sayac + 1,
            })
          }
        }
        this.activate(0);
        setTimeout(() => {
          this.grid[x][y].setState({
            done:true,
            revealed:false,
          })
          this.grid[this.x][this.y].setState({
            done:true,
            revealed:false,
          })

          this.activate(1);
        },1000)

      }else {
        this.sayac = 0;
        this.grid[x][y].setState({
          revealed:true,
        })
        this.grid[this.x][this.y].setState({
          revealed:true,
        })
        this.activate(0);
        this.onSwapPlayer();
        setTimeout(() => {
          this.grid[x][y].setState({
            revealed:false,
          })
          this.grid[this.x][this.y].setState({
            revealed:false,
          })

          this.activate(1)
        },1000)

      }

    }
  }//reveal

  activate = (a) => {
    if(a === 0){
      if(this.state.level === 1){
        for(let i = 0; i < Constants.BOARD_SIZE; i++){
          for(let k = 0; k< Constants.BOARD_SIZE; k++){
            this.grid[i][k].setState({
              activated: false,
            })
          }
        }
      }else if (level === 2) {
        for(let i = 0; i < Constants.BOARD_SIZE_ORTA; i++){
          for(let k = 0; k< Constants.BOARD_SIZE_ORTA; k++){
            this.grid[i][k].setState({
              activated: false,
            })
          }
        }
      }else {
        for(let i = 0; i < Constants.BOARD_SIZE_ZOR; i++){
          for(let k = 0; k< Constants.BOARD_SIZE_ZOR; k++){
            this.grid[i][k].setState({
              activated: false,
            })
          }
        }
      }
    }else {
      if(this.state.level === 1){
        for(let i = 0; i < Constants.BOARD_SIZE; i++){
          for(let k = 0; k< Constants.BOARD_SIZE; k++){
            this.grid[i][k].setState({
              activated: true,
            })
          }
        }
      }else if (level === 2) {
        for(let i = 0; i < Constants.BOARD_SIZE_ORTA; i++){
          for(let k = 0; k< Constants.BOARD_SIZE_ORTA; k++){
            this.grid[i][k].setState({
              activated: true,
            })
          }
        }
      }else {
        for(let i = 0; i < Constants.BOARD_SIZE_ZOR; i++){
          for(let k = 0; k< Constants.BOARD_SIZE_ZOR; k++){
            this.grid[i][k].setState({
              activated: true,
            })
          }
        }
      }
    }
  }


  onFinish = () => {
    if(this.state.numplayer === 1){
      AdMobInterstitial.setAdUnitID('ca-app-pub-2213986178919906/4401530194');
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      this.setState({
        tebrikler:true,
        kazanan: 1,
      })

    }else {
      if(this.player[0].state.sayac > this.player[1].state.sayac){
          AdMobInterstitial.setAdUnitID('ca-app-pub-2213986178919906/4401530194');
          AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

        this.setState({
          tebrikler:true,
          kazanan: 1,
        })

      }else if(this.player[0].state.sayac < this.player[1].state.sayac) {
        AdMobInterstitial.setAdUnitID('ca-app-pub-2213986178919906/4401530194');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        this.setState({
          tebrikler:true,
          kazanan: 2,
        })

      }else {
        AdMobInterstitial.setAdUnitID('ca-app-pub-2213986178919906/4401530194');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        this.setState({
          tebrikler:true,
          kazanan: 0,
        })

      }
    }
  }//onFinish

  onButtonPress = () =>{
    this.props.navigation.navigate("App");
  }



  count = () => {
    if(this.state.level === 1){
      this.counter = this.counter + 1;
      if (this.counter === 8) {
        this.onWho();
        this.onFinish();
      }
    }else if(this.state.level === 2){
      this.counter = this.counter + 1;
      if (this.counter === 18) {
        this.onWho();
        this.onFinish();
      }
    }else {
      this.counter = this.counter + 1;
      if (this.counter === 32) {
        this.onWho();
        this.onFinish();
      }
    }
  }

  onSwapPlayer = () => {
    if(this.player.length > 1){

      if(this.player[0].state.who){
        this.player[0].setState({
          who: false,
        })
        this.player[1].setState({
          who: true,
        })
      }else {
        this.player[1].setState({
          who: false,
        })
        this.player[0].setState({
          who: true,
        })
      }
    }
  }


  onWho = () => {

    if(this.player.length === 1){
      this.player[0].setState({
        sayac: this.player[0].state.sayac + 1,
      })
    }else {
      if(this.player[0].state.who){
        this.player[0].setState({
          sayac: this.player[0].state.sayac + 1,
        })
      }else {
        this.player[1].setState({
          sayac: this.player[1].state.sayac + 1,
        })
      }
    }
  }


  playerRefresh = (key) => {

    if(key === 0){
      this.player[key].setState({
        sayac: 0,
        who:true,
        refreshPlayer: false,
      })
    }else {
      this.player[key].setState({
        sayac: 0,
        who:false,
        refreshPlayer:false,
      })
    }


  }



  renderPlayer = (a) => {
    if(a === 1){
      return Array.apply(null, Array(1)).map((el, index) => {
        let deger = this.refreshPlayer;
        return <Player
        playerNumber = {index}
        key = {index}
        deger = {deger}
        playerSwap = {this.playerSwap}
        refresh = {this.playerRefresh}
        onWho = {this.onWho}
        onSwapPlayer = {this.onSwapPlayer}
        ref = {((ref) => this.player[index] = ref)}
        />
      })
    }else {
      return Array.apply(null, Array(2)).map((el, index) => {
        let deger = this.refreshPlayer;
        return <Player
        deger = {deger}
        playerNumber = {index}
        key = {index}
        refresh = {this.playerRefresh}
        onWho = {this.onWho}
        ref = {((ref) => this.player[index] = ref)}
        />
      })
    }
  }






  renderBoard = (a) => {
      this.kolay = shuffle(this.kolay);
      this.orta = shuffle(this.orta);
      this.zor = shuffle(this.zor);
      if(a===1){
        return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, colIdx) => {
                 let deger = this.kolay[rowIdx*4+colIdx];
                 let swapolayi = this.swapDurum;
                 return <Cell
                    onReveal={this.onReveal}
                    ayar = {this.ayar}
                    degerSwap = {this.degerSwap}
                    valueChange = {this.valueChange}
                    key={colIdx}
                    swapdurum = {swapolayi}
                    width={Constants.CELL_SIZE}
                    height={Constants.CELL_SIZE}
                    x={colIdx}
                    y={rowIdx}
                    deger={deger}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                />
            });

            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row'}}>
                    {cellList}
                </View>
            )
        });
      }else if (a===2) {
        return Array.apply(null, Array(Constants.BOARD_SIZE_ORTA)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(Constants.BOARD_SIZE_ORTA)).map((el, colIdx) => {
                let swapolayi = this.swapDurum;
                 let deger = this.orta[rowIdx*6+colIdx];
                 return <Cell
                    onReveal={this.onReveal}
                    ayar = {this.ayar}
                    degerSwap = {this.degerSwap}
                    valueChange = {this.valueChange}
                    swapdurum = {swapolayi}
                    key={colIdx}
                    width={Constants.CELL_SIZE}
                    height={Constants.CELL_SIZE}
                    x={colIdx}
                    y={rowIdx}
                    deger={deger}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                />
            });

            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row'}}>
                    {cellList}
                </View>
            )
        });
      }else {
        return Array.apply(null, Array(Constants.BOARD_SIZE_ZOR)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(Constants.BOARD_SIZE_ZOR)).map((el, colIdx) => {
              let swapolayi = this.swapDurum;
                 let deger = this.zor[rowIdx*8+colIdx];
                 return <Cell
                    onReveal={this.onReveal}
                    ayar = {this.ayar}
                    degerSwap = {this.degerSwap}
                    valueChange = {this.valueChange}
                    swapdurum = {swapolayi}
                    key={colIdx}
                    width={Constants.CELL_SIZE}
                    height={Constants.CELL_SIZE}
                    x={colIdx}
                    y={rowIdx}
                    deger={deger}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                />
            });

            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row'}}>
                    {cellList}
                </View>
            )
        });
      }
   }

  onPause = () => {

    this.pausevalue.setState({
      deger:1,
    })
  }

  onRetry = () => {

    this.swapDurum = true;
    this.refreshPlayer = true;
    this.pausevalue.setState({
      deger:0,
    })
    this.counter = 0;
    this.sayac = 0;
    this.x = null;
    this.y = null;
    this.playerSwap();
    this.degerSwap();


    if(this.state.retry === true){
      this.setState({
        retry : false,
        pause : false,
        tebrikler: false,
        kazanan:0,
      })
    }else {
      this.setState({
        retry : true,
        pause : false,
        tebrikler: false,
        kazanan:0,
      })
    }
  }

  playerSwap = () =>{
    if(this.state.numplayer === 1){
      this.player[0].setState({
        refreshPlayer: true,
      })
    }else {
      this.player[0].setState({
        refreshPlayer: true,
      });
      this.player[1].setState({
        refreshPlayer: true,
      });
    }

  }


  degerSwap = () =>{

    if(this.state.level === 1){
      for(let i = 0; i < Constants.BOARD_SIZE; i++){
        for(let k = 0; k< Constants.BOARD_SIZE; k++){
          this.grid[i][k].setState({
            valueswap: true,
            revealed: false,
          })
        }
      }
    }else if (this.state.level === 2) {
      for(let i = 0; i < Constants.BOARD_SIZE_ORTA; i++){
        for(let k = 0; k< Constants.BOARD_SIZE_ORTA; k++){
          this.grid[i][k].setState({
            valueswap: true,
            revealed: false,
          })
        }
      }
    }else {
      for(let i = 0; i < Constants.BOARD_SIZE_ZOR; i++){
        for(let k = 0; k< Constants.BOARD_SIZE_ZOR; k++){
          this.grid[i][k].setState({
            valueswap: true,
            revealed: false,
          })
        }
      }
    }
  }

  onExit = () => {
    BackHandler.exitApp();
  }

  onHome = () =>{
    this.props.navigation.navigate("App");
  }

  onContinue = () => {

    this.pausevalue.setState({
      deger:0,
    })
  }



  valueChange = (x,y,deger) => {

    if(this.state.level === 1){
      this.grid[x][y].setState({
        deger:this.kolay[y*4+x],
        valueswap: false,
        done: false,
        swapdurum:false,
        revealed: false,
      });
    }else if(this.state.level === 2) {
      this.grid[x][y].setState({
        deger:this.orta[y*6+x],
        valueswap: false,
        done: false,
        swapdurum:false,
        revealed: false,
      });
    }else {
      this.grid[x][y].setState({
        deger:this.zor[y*8+x],
        valueswap: false,
        done: false,
        revealed: false,
      });
    }


  }


  render(){
    return(

      <ImageBackground
        source={require("./assets/img/background.png")}
        resize="stretch"
        style={[styles.container, {width:Constants.MAX_WIDTH, height:Constants.MAX_HEIGHT, flex:1}]}
      >
      <StatusBar hidden={true}/>

      <View style={{flex:1}}>
        <TouchableOpacity style={{width:Constants.MAX_WIDTH, alignItems:'flex-end', justifyContent:'center', marginRight:10, marginTop:10}} onPress ={this.onPause}>
          <Image source={require('./assets/pause.png')} style={{width:60, height:60}}/>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flex:2, alignItems:'center'}}>
        {this.renderPlayer(this.state.numplayer)}
      </View>

      <View style={{flex:8, alignItems:'center', justifyContent:'center'}}>
        <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#b29995', flexDirection: 'column'}}>
            {this.renderBoard(this.state.level)}
        </View>
      </View>


      <View style={{flexWrap:'wrap'}}>

      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-2213986178919906/2709174574"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}
        />

      </View>


      <Pause
        onRetry={this.onRetry}
        onExit={this.onExit}
        onContinue = {this.onContinue}
        onHome = {this.onHome}
        ref = {(ref) => {this.pausevalue = ref}}/>

      {this.state.tebrikler === true && <Tebrikler onRetry={this.onRetry} onHome = {this.onHome} kazanan={this.state.kazanan} />}



      </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }

});
