import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';

import Constants from './Constants';
import {calculate, shuffle} from './components/calculate';
import Cell from './components/Cell';
import Pause from './pause';
import Win from './win';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'


export default class App extends Component {

  constructor(props){
    super(props);

    let level = this.props.navigation.getParam('level');
    this.pausevalue = null;
    this.win = false;
    this.sayac = 0;
    this.hesap = 0;
    this.x = 0;
    this.y = 0;
    this.bitis = 0;
    this.grid = this.createGrid(level);
    this.dizi = Array.apply(null, Array(level)).map((el, idx) => {
            return Array.apply(null, Array(level)).map((el, idx) => {
                return idx;
            });
        });

    this.cevap = Array.apply(null, Array(level)).map((el, idx) => {
            return Array.apply(null, Array(level)).map((el, idx) => {
                return idx;
            });
        });

    this.createDizi(level);

    this.cevap = this.dizi;
    console.log("cevap: " + this.cevap);
    this.tekdizi = this.converttosingle(level);
    this.tekdizi = shuffle(this.tekdizi);
    //Shuffle edilmiş tek dizi iki boyutlu diziye çevrildi
    this.dizi = this.converttomultiple(level);

    this.state={
      level : level,
      devam : false,
      win: false,
      sn:0,
      dk:0,
    }
  }

  componentDidMount(){

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.Interval = setInterval(this.time,1000);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    return true;
  }


  time = () =>{


    if(this.state.sn === 59){
      this.setState({
        dk: this.state.dk +1,
        sn: 0,
      })
    }else {
      this.setState({
        sn: this.state.sn + 1,
      })
    }
  }




//DİZİ OLUŞTURMA METHODLARI
//------------------------------------------------------------------
  converttomultiple(level){

    console.log("converttomultiple");
    var count = 0;
    for(let i = 0; i< level; i++){
      for(let k = 0; k<level;k++){
        console.log(this.tekdizi[count]);
        this.dizi[i][k] = this.tekdizi[count];
        count++;
      }
    }
    return(this.dizi);
  }



  converttosingle(level){
    let count = 0;
    var arr = [];
    for(let i = 0; i< level; i++){
      for(let k = 0; k<level;k++){
        arr[count] = this.dizi[i][k];
        count++;
      }
    }
    return (arr);
  }

  createDizi(level){

    if(level === 3){
      for(let i = 0; i< level; i++){
        for(let k = 0; k<level;k++){
          this.dizi = calculate(i,k,this.dizi,30);

        }
      }
      this.cevap = this.dizi;

    }else if (level === 4) {
      for(let i = 0; i< level; i++){
        for(let k = 0; k<level;k++){
          this.dizi = calculate(i,k,this.dizi,40);
        }
      }
      this.cevap = this.dizi;
    }else if(level === 5){
      for(let i = 0; i< level; i++){
        for(let k = 0; k<level;k++){
          this.dizi = calculate(i,k,this.dizi,50);
        }
      }
      this.cevap = this.dizi;
    }else if (level === 6) {
      for(let i = 0; i< level; i++){
        for(let k = 0; k<level;k++){
          this.dizi = calculate(i,k,this.dizi,60);
        }
      }
      this.cevap = this.dizi;
    }else if (level === 7) {
      for(let i = 0; i< level; i++){
        for(let k = 0; k<level;k++){
          this.dizi = calculate(i,k,this.dizi,70);
        }
      }
      this.cevap = this.dizi;
    }else {
      for(let i = 0; i< level; i++){
        for(let k = 0; k<level;k++){
          this.dizi = calculate(i,k,this.dizi,80);
        }
      }
      this.cevap = this.dizi;
    }
  }

  createGrid(level){

      var grid = Array.apply(null, Array(level)).map((el, idx) => {
              return Array.apply(null, Array(level)).map((el, idx) => {
                  return null;
              });
          });
      return(grid);

  }//createGrid
//----------------------------------------------------------------------------------------------------



//HÜCRE OLUŞTURMA
//----------------------------------------------------------------------------------------------------

  renderBoard = (a) =>{
      var yukseklik = 0;
      var en = 0;
      var size = 20;
      if(a===3){
        yukseklik = 112;
        en = 112;
        size = 42;
      }else if (a===4) {
        yukseklik = 84;
        en = 84;
        size = 36;
      }else if (a===5) {
        yukseklik = 65;
        en = 65;
        size = 30;
      }else if (a===6) {
        yukseklik = 56;
        en = 56;
        size = 24;
      }else if (a===7) {
        yukseklik = 48;
        en = 47;
        size = 21;
      }else {
        yukseklik = 42;
        en = 42;
        size = 18;
      }



      if(a){
        return Array.apply(null, Array(a)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(a)).map((el, colIdx) => {
                  let deger = this.dizi[rowIdx][colIdx];
                  console.log(deger);
                 return <Cell
                    key={colIdx}
                    size = {size}
                    onClick = {this.onClick}
                    deger = {deger}
                    width={en}
                    height={yukseklik}
                    x={rowIdx}
                    y={colIdx}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                />
            });
            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: yukseklik, flexDirection: 'row'}}>
                    {cellList}
                </View>
            )
        });
      }
  }
//----------------------------------------------------------------------------------------------------

  onClick = (x,y) =>{

    if(this.sayac === 0){
      this.x = x;
      this.y = y;

      console.log("x: "+ x);
      console.log("y: "+ y);
      this.grid[this.y][this.x].setState({
        click:true,
      })


      this.sayac = 1;
    }else {

      console.log("else");
      console.log("x: "+ x);
      console.log("y: "+ y);

      var temp = this.dizi[this.x][this.y];

      this.grid[this.y][this.x].setState({
        click:false,
      })

      this.grid[y][x].setState({
        click:false,
      })

      console.log(temp);
      this.dizi[this.x][this.y] = this.dizi[x][y];
      this.dizi[x][y] = temp;
      this.sayac = 0;
      this.hesap = 1;
      this.setState({
        devam : !this.state.devam,
      })
    }
  }


  hesapla = (sonuc) =>{
    var deger = 0;
    for(let i = 0; i<this.state.level;i++){
      var toplamx = 0;
      var toplamy = 0;
      for(let j=0;j<this.state.level;j++){
        toplamx = toplamx + this.dizi[i][j];
      }
      if(toplamx !== sonuc){
        return deger;
      }
      for(let j=0;j<this.state.level;j++){
        toplamy = toplamy + this.dizi[j][i];
      }
      if(toplamy !== sonuc){
        return deger;
      }
    }
    deger = 1;

    return deger;

  }



  onPause = () => {
    console.log("pause");
    clearInterval(this.Interval);
    this.pausevalue.setState({
      deger:1,
    })
  }

  onExit = () => {
    clearInterval(this.Interval);
    BackHandler.exitApp();
  }

  onHome = () =>{
    clearInterval(this.Interval);
    this.props.navigation.navigate("App");
  }

  onContinue = () => {
    this.Interval = setInterval(this.time, 1000);
    console.log("oncontinue");
    this.pausevalue.setState({
      deger:0,
    })
  }


  onButtonPress = () =>{
    this.props.navigation.navigate("App");
  }




  render(){

    if(this.hesap === 1){
      console.log("------------------------------------------------------------");
      var sonuc = this.hesapla(this.state.level*10);

      if(sonuc === 1){

        if(this.win === false){
          clearInterval(this.Interval);

          this.win = true;

          AdMobInterstitial.setAdUnitID('ca-app-pub-2213986178919906/3073950740');
          AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());


          this.setState({
            win:true,
          })

        }else {

        }


      }

      console.log("sonuc: " + sonuc);
      console.log("------------------------------------------------------------");

    }


    return (
      <View style={styles.container}>

      <View style={{flex:1, justifyContent:'center'}}>

        <View style={{alignItems:'flex-end', justifyContent:'center', marginRight:10, marginTop:10}}>
          <TouchableOpacity onPress={this.onPause}>
            <Image
              source={require('./assets/img/pause.png')}
              style={{width:60, height:60}}
            />
            </TouchableOpacity>
        </View>

      </View>

      <View style={{flex:1, justifyContent:'center'}}>
        <Text style={{fontSize:16, color:'red'}}> NOT: <Text style={{color:'black'}}>Satır ve sütunların toplamı, satır veya sütun sayısının 10 katı olmalıdır. </Text> </Text>
      </View>

      <View style={{alignItems:"center", justifyContent:'center'}}>
        <Text style={{fontSize:20, color:'red'}}> SÜRE:  <Text style={{color:'black'}}>{this.state.dk}:{this.state.sn} </Text> </Text>
      </View>

      <View style={{flex:9, alignItems:'center', justifyContent:'center'}}>
        <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#b29995', flexDirection: 'column'}}>
            {this.renderBoard(this.state.level)}
        </View>
      </View>


      <View style={{justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-2213986178919906/7279831207"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>

      <Pause
        onExit={this.onExit}
        onContinue = {this.onContinue}
        onHome = {this.onHome}
        ref = {(ref) => {this.pausevalue = ref}}/>


      {this.state.win === true && <Win onHome = {this.onHome} dakika={this.state.dk} saniye={this.state.sn}/>}

      </View>
    );
  }
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#f2e8e1'
  }
});
