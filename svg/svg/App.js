/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Componenet} from 'react';
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
  BackHandler,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Menu from './Menu';
import Svg, {Circle, Line} from 'react-native-svg';
import Constants from './constants';
import anneal from './anneal';
import Sonucgoster from './Sonucgoster';
import Tebrikler from './Tebrikler';
import TebriklerBolum from './TebriklerBolum';

import wait from './wait'
import shuffle from './shuffle'
import GA from './GA'

export default class App extends React.Component{


  constructor(props){
    super(props);

    this.data = this.props.navigation.getParam("sayfa");
    console.log(this.data);
    this.level = 5;


    if(this.data === "Bolumler"){
      var seviye = this.props.navigation.getParam("data");
      console.log(typeof(seviye));
      this.level = parseInt(seviye,10);
    }else {
      var seviye = this.props.navigation.getParam("seviye");
      console.log(typeof(seviye));
      console.log("seviye: " + seviye);
      this.level = parseInt(seviye,10);
    }

    console.log("level : " + this.level);


    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.deger = 0;

    this.width = Constants.MAX_WIDTH;
    this.height = Constants.MAX_HEIGHT;
    this.nodes = []
    this.orders = []
    this.r = 4
    this.lw = 2
    this.dr = window.devicePixelRatio || 1

    this.mutation_rate = 0.05
    this.is_running = false

    this.n = this.level;
    console.log("n: " + this.n);
    this.life_count = 100;



    this.state={
      deger : 0,
      tiklananx : 0,
      tiklanany : 0,
      datax:[],
      datay:[],
      ilkx : 0,
      ilky : 0,
      baslangic: 0,
      eklenenx:[],
      ekleneny:[],
      seviye:this.level,
      son :0,
      mesafe:0,
      sonucgoster: false,
      tebrikler: false,
      show:false,
      menu:false,
      tebriklerBolum: false,
    }
  }

  componentDidMount() {
     this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
   }

   componentWillUnmount() {
     this.backHandler.remove()
   }

   handleBackPress = () => {
     return true;
   }


//-----------------------------------------------------
degerlendir(){
  var sonuc = this.mesafe(1);
  var toplam = 0;



  for(var i = 0; i < this.orders.length; i++){


    if(i === this.orders.length-1){

      x1 = this.nodes[this.orders[0]].x;
      x2 = this.nodes[this.orders[this.orders.length-1]].x;

      y1 = this.nodes[this.orders[0]].y;
      y2 = this.nodes[this.orders[this.orders.length-1]].y;


      var fark = ((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
      var kokdeger = Math.floor(Math.sqrt(fark));

      toplam = toplam + kokdeger;
    }else {
      x1 = this.nodes[this.orders[i]].x;
      x2 = this.nodes[this.orders[i+1]].x;

      y1 = this.nodes[this.orders[i]].y;
      y2 = this.nodes[this.orders[i+1]].y;

      var fark = ((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
      var kokdeger = Math.floor(Math.sqrt(fark));

      toplam = toplam + kokdeger;
    }
    this.gacevap = toplam;
    this.gasonuc = sonuc;


  }

  if(sonuc <= toplam){
    /*if(this.deger === 0){
      this.deger = 1;
      this.setState({
        sonucgoster:true,
        jsonxy:siralama,
      })
    }*/
    if(this.data === "Home"){
        AsyncStorage.setItem("seviye", this.state.seviye.toString());
        this.setState({
          son:0,
          tebrikler:true,
        })
        console.log("home");
    }else {
      this.setState({
        son:0,
        tebriklerBolum:true,
      })
      console.log("Bolumler");
    }




  }else {

    if(this.state.sonucgoster === true){

    }else {
      if(this.state.show){

      }else {
        this.setState({
          sonucgoster:true,
          son:0,
        })
      }


    }
  }

}

//------------------------------------------------*****************************-----------------------------------------

  showOlaylar = (evt, message) => {
    const { nativeEvent } = evt;
    const {
      changedTouches, // this array will contain nativeEvent when onPress triggers, making the structure circular
      identifier,
      locationX,
      locationY,
      pageX,
      pageY,
      target,
      timestamp,
      touches,
    } = nativeEvent;


    var sondeger = this.state.eklenenx.length;
    //Eklenen değer uzunluk kontrolü
    if(sondeger > 1){
        var eklex=[];
        var ekley=[];
        var degerx=0;
        var degery=0;
        var datax=[];
        var datay=[];
        //Eklenen değere uzunluğu 1 den fazlaysa ve deger eklenen listesindeyse silme işlemi yapılacak
        if(this.state.eklenenx[sondeger-1] + 11 >= Math.floor(pageX) && this.state.eklenenx[sondeger-1] - 10 <= Math.floor(pageX) && this.state.ekleneny[sondeger-1] + 11 +50 >= Math.floor(pageY) && this.state.ekleneny[sondeger-1]-10+50 <= Math.floor(pageY)){

          degerx = this.state.eklenenx[sondeger-1];
          degery = this.state.ekleneny[sondeger-1];

          //Değer eklenen listesinden silinip normal dataların bulunduğu diziye gönderiliyor.
          for(var t = 0; t < sondeger;t++){
            if(this.state.eklenenx[t] === this.state.eklenenx[sondeger-1] && this.state.ekleneny[t] === this.state.ekleneny[sondeger-1]){

            }else {
              eklex[t] = this.state.eklenenx[t];
              ekley[t] = this.state.ekleneny[t];
            }
          }

          var uzunluk = this.state.datax.length;
          var datax = this.state.datax;
          var datay = this.state.datay;

          datax[uzunluk] = degerx;
          datay[uzunluk] = degery;



          this.setState({
            datax:datax,
            datay:datay,
            eklenenx:eklex,
            ekleneny:ekley,
          })

        }else {
          //Eklenenler listesine tıklanan öge eklenecek

          var kontrolekle = 0;
          var kontrolsondeger = 0;
          //Değer aranıyor
          for(var l=0;l<this.state.datax.length;l++){
            if(this.state.datax[l] + 11 >= Math.floor(pageX) && this.state.datax[l] - 10 <= pageX && this.state.datay[l] + 11 +50 >= pageY && this.state.datay[l] - 10+50 <= pageY){
                //Son daireye tıklanıp tıklanılmadığı araştırılıyor
                if(sondeger === this.state.seviye){

                  if(this.state.datax[l] === this.state.eklenenx[0] && this.state.datay[l] === this.state.ekleneny[0]){
                    kontrolekle = 1;

                    var degerx = this.state.datax[l];
                    var degery = this.state.datay[l];
                    var uzunluk = this.state.eklenenx.length;

                    var eklenmeyenx = [];
                    var eklenmeyeny = [];
                    var sayac = 0;

                    for(var a = 0; a<this.state.datax.length;a++){
                      if(this.state.datax[a] === degerx && this.state.datay[a] === degery){

                      }else {
                        eklenmeyenx[sayac] = this.state.datax[a];
                        eklenmeyeny[sayac] = this.state.datay[a];
                        sayac++;
                      }

                    }



                    var eklex=[];
                    var ekley=[];
                    for(var b=0;b<this.state.eklenenx.length;b++){
                      eklex[b] = this.state.eklenenx[b];
                      ekley[b] = this.state.ekleneny[b];
                    }
                    eklex[uzunluk] = degerx;
                    ekley[uzunluk] = degery;


                    this.setState({
                      datax:eklenmeyenx,
                      datay:eklenmeyeny,
                      eklenenx:eklex,
                      ekleneny:ekley,
                      son:1
                    })

                  }
                }
                else {
                  //Son daire değilse ama son daireye tıklanıyorsa ilem yapılmaması için değer veriliyor.
                  if(this.state.datax[l] === this.state.eklenenx[0] && this.state.datay[l] === this.state.ekleneny[0]){
                    kontrolsondeger = 1;
                  }
                }


                //Tıklanan değerin ekleme olayı gerçekleştiriliyor
                if(kontrolekle === 0 && kontrolsondeger === 0){

                  var degerx = this.state.datax[l];
                  var degery = this.state.datay[l];
                  var uzunluk = this.state.eklenenx.length;

                  var eklenmeyenx = [];
                  var eklenmeyeny = [];
                  var sayac = 0;

                  for(var a = 0; a<this.state.datax.length;a++){
                    if(this.state.datax[a] === degerx && this.state.datay[a] === degery){

                    }else {
                      eklenmeyenx[sayac] = this.state.datax[a];
                      eklenmeyeny[sayac] = this.state.datay[a];
                      sayac++;
                    }

                  }



                  var eklex=[];
                  var ekley=[];
                  for(var b=0;b<this.state.eklenenx.length;b++){
                    eklex[b] = this.state.eklenenx[b];
                    ekley[b] = this.state.ekleneny[b];
                  }
                  eklex[uzunluk] = degerx;
                  ekley[uzunluk] = degery;

                  this.setState({
                    datax:eklenmeyenx,
                    datay:eklenmeyeny,
                    eklenenx:eklex,
                    ekleneny:ekley,
                  })
                }



            }

          }
        }

    }else {
      for(var l=0;l<this.state.datax.length;l++){
        if(this.state.datax[l] + 11 >= Math.floor(pageX) && this.state.datax[l] - 10 <= pageX && this.state.datay[l] + 11 + 50>= pageY && this.state.datay[l] - 10 +50 <= pageY){
          if(this.state.datax[l] === this.state.eklenenx[0] && this.state.datay[l] === this.state.ekleneny[0]){
          }else {

            var degerx = this.state.datax[l];
            var degery = this.state.datay[l];
            var uzunluk = this.state.eklenenx.length;

            var eklenmeyenx = [];
            var eklenmeyeny = [];
            var sayac = 0;

            for(var a = 0; a<this.state.datax.length;a++){
              if(this.state.datax[a] === degerx && this.state.datay[a] === degery){

              }else {
                eklenmeyenx[sayac] = this.state.datax[a];
                eklenmeyeny[sayac] = this.state.datay[a];
                sayac++;
              }

            }



            var eklex=[];
            var ekley=[];
            for(var b=0;b<this.state.eklenenx.length;b++){
              eklex[b] = this.state.eklenenx[b];
              ekley[b] = this.state.ekleneny[b];
            }
            eklex[uzunluk] = degerx;
            ekley[uzunluk] = degery;

            this.setState({
              datax:eklenmeyenx,
              datay:eklenmeyeny,
              eklenenx:eklex,
              ekleneny:ekley,
            })
          }

        }

      }
    }
  }


//-----------------------------------------****************************--------------------------------------------------

  sonuc(){


    if (this.state.baslangic === 0) {
      this.nodes = []
      this.orders = []
      var cont = 0;
      var ilkx = 0;
      var ilky = 0;
      var eklenenx = [];
      var ekleneny = [];
      var degerlerx=[];
      var degerlery=[];
      //Rastgele sayılar oluşturuldu
      for (i = 0; i < this.state.seviye; i++) {

        var x = Math.floor(Math.random() * ((Constants.MAX_WIDTH -20) - 20 + 1) + 20);
        var y = Math.floor(Math.random() * ((Constants.MAX_HEIGHT -20-50) - 20 + 1) + 20);

        if (i === 0) {
          ilkx = x;
          ilky = y;
          eklenenx[i] = ilkx;
          ekleneny[i] = ilky;
        }

        this.nodes.push({
          x:x,
          y:y,
        })
        this.orders.push(i)

        degerlerx[i] = x;
        degerlery[i] = y;

      }

      shuffle(this.orders)
      this.orders.push(this.orders[0])

      this.ga = new GA({
      life_count: this.life_count,
      mutation_rate: this.mutation_rate,
      gene_length: this.n,
      rate: this.rate.bind(this),
      xFunc: this.xFunc.bind(this),
      mFunc: this.mFunc.bind(this)
      })

      this.start();


      this.setState({
        baslangic:1,
        datax:degerlerx,
        datay:degerlery,
        ilkx: ilkx,
        ilky: ilky,
        eklenenx:eklenenx,
        ekleneny:ekleneny,
      })

    }else {
      var output=[];

      var kontrol = 1;
      var ilk = this.state.eklenenx[0];
      var son = this.state.ekleneny[0];
      var count = 0;

      //Eklenen datalar listesi görüntüsü oluşturuldu
      if(this.state.son === 0){


        if(this.state.eklenenx.length > 1){
          for(var i=1;i<this.state.eklenenx.length;i++){

            var x = this.state.eklenenx[i];
            var y = this.state.ekleneny[i];
            var tempItem=  (
              <View>
                <Circle cx={x} cy={y} r="10" fill="red" onPress={event => {this.showOlaylar(event, 'circle');}}/>
                <Line x1={ilk} y1={son} x2={x} y2={y} stroke="blue" strokeWidth="2"/>
              </View>
           );
           ilk = x;
           son = y;
           output[count] = (tempItem);
           count++;
          }

        }


        //Eklenmeyen data listesi görüntüsü oluşturuldu

        if(this.state.datax.length >= 0){

          for(var k = 0; k<this.state.datax.length;k++){

            var x = this.state.datax[k];
            var y = this.state.datay[k];
            if(k === 0){
              var tempItem=  (
                  <Circle cx={x} cy={y} r="10" fill="yellow" onPress={event => {this.showOlaylar(event, 'circle');}}/>
             );
             output[count] = (tempItem);
             count++;
           }else {
             var tempItem=  (
                 <Circle cx={x} cy={y} r="10" fill="#f9a290" onPress={event => {this.showOlaylar(event, 'circle');}}/>
            );
            output[count] = (tempItem);
            count++;
           }

          }

        }

        return(
          <Svg height={Constants.MAX_HEIGHT-50} width={Constants.MAX_WIDTH}>
           {output}
          </Svg>
        );
      }else {

        if(this.state.eklenenx.length > 1){
          for(var i=1;i<this.state.eklenenx.length;i++){
            var x = this.state.eklenenx[i];
            var y = this.state.ekleneny[i];

            var tempItem=  (
               <View>
                 <Circle cx={x} cy={y} r="10" fill="red"/>
                 <Line x1={ilk} y1={son} x2={x} y2={y} stroke="blue" strokeWidth="2"/>
               </View>
            );
            ilk = x;
            son = y;
            output[count] = (tempItem);
            count++;


          }

        }


        //Eklenmeyen data listesi görüntüsü oluşturuldu

        if(this.state.datax.length >= 0){

          for(var k = 0; k<this.state.datax.length;k++){

            var x = this.state.datax[k];
            var y = this.state.datay[k];
            if (k===0) {
              var tempItem=  (
                  <Circle cx={x} cy={y} r="10" fill="yellow" />
             );
             output[count] = (tempItem);
             count++;
           }else {
             var tempItem=  (
                 <Circle cx={x} cy={y} r="10" fill="red" />
            );
            output[count] = (tempItem);
            count++;
           }

          }

        }

        return(
          <Svg height={Constants.MAX_HEIGHT-50} width={Constants.MAX_WIDTH}>
           {output}
          </Svg>
        );
      }    this.nodes = []
    this.orders = []



    }


  }

//-------------------------------------------*************************************---------------------------------------------

cevap(){

  var output=[];
  var kontrol = 1;
  var ilk = this.state.eklenenx[0];
  var son = this.state.ekleneny[0];
  var count = 0;


  this.orders.push(this.orders[0])



  var jsonilk = this.nodes[this.orders[0]].x;
  var jsonson = this.nodes[this.orders[0]].y;

  if(this.state.eklenenx.length > 1){
    var jsonx = 0;
    var jsony = 0;
    for(var i=1;i<this.state.eklenenx.length;i++){


      var x = this.state.eklenenx[i];
      var y = this.state.ekleneny[i];


      jsonx = this.nodes[this.orders[i]].x;
      jsony = this.nodes[this.orders[i]].y;

      var tempItem=  (
         <View>
           <Circle cx={x} cy={y} r="10" fill="red"/>
           <Line x1={ilk} y1={son} x2={x} y2={y} stroke="blue" strokeWidth="2"/>
           <Line x1={jsonilk} y1={jsonson} x2={jsonx} y2={jsony} stroke="yellow" strokeWidth="4"/>
         </View>
      );

      ilk = x;
      son = y;

      jsonilk = jsonx;
      jsonson = jsony;

      output[count] = (tempItem);
      count++;
    }
  }

  //Eklenmeyen data listesi görüntüsü oluşturuldu

  if(this.state.datax.length >= 0){

    for(var k = 0; k<this.state.datax.length;k++){

      var x = this.state.datax[k];
      var y = this.state.datay[k];
      if (k===0) {
        var tempItem=  (
            <Circle cx={x} cy={y} r="10" fill="yellow" />
       );
       output[count] = (tempItem);
       count++;
     }else {
       var tempItem=  (
           <Circle cx={x} cy={y} r="10" fill="red" />
      );
      output[count] = (tempItem);
      count++;
     }

    }

  }

  return(
    <Svg height={Constants.MAX_HEIGHT-50} width={Conthis.finish = 0;
    this.eklenecekNode = [];
    this.lineCount = 0;stants.MAX_WIDTH}>
     {output}
    </Svg>
  );


}





//--------------------------------------/---------/////////////-------------------------------------------------------------
  //Noktalar arası mesafe hesabı
  mesafe(a){
    var mesafe = 0;
    for(var i = 0; i<this.state.eklenenx.length-1;i++){
      var fark = 0;
      x1 = this.state.eklenenx[i];
      y1 = this.state.ekleneny[i];
      x2 = this.state.eklenenx[i+1];
      y2 = this.state.ekleneny[i+1];

      fark = (x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1);
      mesafe = mesafe + Math.floor(Math.sqrt(fark));
    }

    if(a === 1){
      return mesafe;
    }else {
      return(

        <Text style={{fontSize:30, fontWeight:"bold"}}>{mesafe}</Text>

      );
    }



  }


  //Yeniden deneyin butonu
  tekrar = () =>{
    this.setState({
    deger : 0,
    tiklananx : 0,
    tiklanany : 0,
    datax:[],
    datay:[],
    ilkx : 0,
    ilky : 0,
    baslangic: 0,
    eklenenx:[],
    ekleneny:[],
    son:0,
    sonucgoster:false,
    show:false,
    tebrikler:false,
    menu:false,
    tebriklerBolum:false,
  })
}


  //Sonraki seviye

  sonraki = () =>{
    this.n = this.n + 1;
    if(this.data === "Home"){
      AsyncStorage.setItem("seviye", this.n.toString());
    }


    this.setState({
    deger : 0,
    tiklananx : 0,
    tiklanany : 0,
    datax:[],
    datay:[],
    ilkx : 0,
    ilky : 0,
    baslangic: 0,
    eklenenx:[],
    ekleneny:[],
    seviye:this.state.seviye+1,
    son:0,
    sonucgoster:false,
    show:false,
    tebrikler:false,
    tebriklerBolum:false,
    })
  }


  sonucgoster = () => {
    this.setState({
      show:true,
      sonucgoster:false,
    })
  }


  nextLevel = () => {
    this.sonraki();
  }



//---------------------------------------------------- TSP GA -----------------------------------------------------

rate (gene) {
return 1 / this.getDistance(gene)
}

xFunc (lf1, lf2) {
  let p1 = Math.floor(Math.random() * (this.n - 2)) + 1
  let p2 = Math.floor(Math.random() * (this.n - p1)) + p1
  let piece = lf2.gene.slice(p1, p2)
  let new_gene = lf1.gene.slice(0, p1)
  piece.concat(lf2.gene).map(i => {
    if (!new_gene.includes(i)) {
      new_gene.push(i)
    }
  })
  return new_gene
}

mFunc (gene) {
let p1 = 0
let p2 = 0
let n = gene.length
while (p1 === p2) {
  p1 = Math.floor(Math.random() * n)
  p2 = Math.floor(Math.random() * n)
}
if (p1 > p2) {
  [p1, p2] = [p2, p1]
}

let funcs = [
  (g, p1, p2) => {
    // 交换
    let t = g[p1]
    g[p1] = g[p2]
    g[p2] = t
  }, (g, p1, p2) => {
    // 倒序
    let t = g.slice(p1, p2).reverse()
    g.splice(p1, p2 - p1, ...t)
  }, (g, p1, p2) => {
    // 移动
    let t = g.splice(p1, p2 - p1)
    g.splice(Math.floor(Math.random() * g.length), 0, ...t)
  }
]

let r = Math.floor(Math.random() * funcs.length)
funcs[r](gene, p1, p2)
return gene
}

getDistance (order = null) {
  let d = 0
  let {nodes} = this
  order.concat(order[0]).reduce((a, b) => {
    d += Math.sqrt(Math.pow(nodes[a].x - nodes[b].x, 2) + Math.pow(nodes[a].y - nodes[b].y, 2))
    //d += Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y)
    return b
  })
  return d
}



async run () {
  let last_best_score = -1
  let last_best_gen = 0

  while (this.is_running) {
    this.orders = this.ga.next()
    let {best, generation} = this.ga

    if (last_best_score !== best.score) {
      last_best_score = best.score
      last_best_gen = generation

    } else if (generation - last_best_gen >= 500) {
      // 超过 n 代没有更好的结果，自动结束
      this.stop()
      break
    }

    if (this.ga.generation % 10 === 0) {
    }
    await wait(1)
  }
}




start () {
  this.is_running = true
  this.run()
  if (typeof this._onstart === 'function') {
    this._onstart()
  }
}

stop () {
  this.is_running = false
  if (typeof this._onstop === 'function') {
    this._onstop()
  }

}


devam = () =>{
  this.setState({
    menu:false,
  })
}

anaSayfa = () =>{
  if(this.data === "Home"){
    if(this.state.menu === true){
      this.props.navigation.navigate("Home");
    }else {
      this.n = this.n+1;
      AsyncStorage.setItem("seviye", this.n.toString());
      this.props.navigation.navigate("Home");
    }

  }else {
    this.props.navigation.navigate("Bolumler");
  }

}



//---------------------------------------------------- TSP GA -----------------------------------------------------




  render(){

    if(this.state.son === 1){
      this.degerlendir();
    }

    return(
      <View>
      <StatusBar hidden={true}/>
      <View style={{backgroundColor:'orange', height:50, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:26, fontWeight:"bold"}}>Mesafe:     {this.mesafe(0)}</Text>
        </View>
        <View>
          <Text style={{fontSize:26, fontWeight:"bold"}}> {this.state.seviye} </Text>
        </View>
        <View style={{alignItems:'flex-end', flex:1, justifyContent:'center', marginRight:20}}>
          <TouchableOpacity
            onPress = {() =>this.setState({menu:true}) }
          >
          <Image
            style={{width:40, height:40, borderWidth:3, borderColor:"black", borderRadius:25}}
            source={require('./assets/menu.png')}
          />
          </TouchableOpacity>
        </View>

      </View>

      {this.state.show === false ?

        <View style={{backgroundColor:"lightblue", alignItems:"center", justifyContent:'center'}}>

            {this.sonuc()}

            <StatusBar hidden={true}/>

        </View>

        :

        <View style={{backgroundColor:"lightblue", alignItems:"center", justifyContent:'center'}}>

            {this.cevap()}

            <StatusBar hidden={true}/>

        </View>

      }


       {this.state.sonucgoster === true && <Sonucgoster onSonuc={this.tekrar} sonucgoster={this.sonucgoster} sonuc={this.gasonuc} cevap={this.gacevap} anaSayfa={this.anaSayfa}/>}
       {this.state.tebrikler === true && <Tebrikler onSonuc={this.tekrar} onNextLevel={this.nextLevel} sonuc={this.gasonuc} cevap={this.gacevap} anaSayfa={this.anaSayfa}/>}
       {this.state.menu === true && <Menu devam={this.devam} tekrar={this.tekrar} anaSayfa={this.anaSayfa} />}
       {this.state.tebriklerBolum === true &&<TebriklerBolum onSonuc={this.tekrar} sonuc={this.gasonuc} cevap={this.gacevap} anaSayfa={this.anaSayfa}/>}

      </View>
    );
  }
}

const styles = StyleSheet.create({

  engine: {
    position: 'absolute',
    right: 0,
  },

  footer: {

    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
