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
  TouchableOpacity,
} from 'react-native';

import Svg, {Circle, Line} from 'react-native-svg';


import wait from './wait'
import shuffle from './shuffle'
import GA from './GA'



class Tsp extends Component {

  constructor(props){
    super(props);

    this.width = 400
    this.height = 600
    this.nodes = []
    this.orders = []
    this.r = 4
    this.lw = 2
    this.dr = window.devicePixelRatio || 1

    this.mutation_rate = 0.05
    this.is_running = false

    this.state = {
      yenile: false,
      sayac:0,
    }

    this.makeRandomNodes();

  }

  makeRandomNodes (n = 20, life_count = 100) {
    this.is_running = false
    this.n = n
    this.life_count = life_count
    this.nodes = []
    this.orders = []

    let padding = 20

    for (let i = 0; i < n; i++) {
      this.nodes.push({
        x: Math.floor(Math.random() * (this.width - padding * 2)) + padding,
        y: Math.floor(Math.random() * (this.height - padding * 2)) + padding
      })
      this.orders.push(i)
    }

    console.log("*******************************İLK DEĞERLER*********************************");
    console.log(this.nodes);
    console.log("*******************************İLK DEĞERLER*********************************");

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
  }

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
        this.setState({
          yenile: !this.state.yenile,
        })
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








  cevap(){

  var output = [];
  var count = 0;


  for(var i=1;i<this.orders.length;i++){
    var x = this.nodes[this.orders[i-1]].x;
    var y = this.nodes[this.orders[i-1]].y;


    var ilk = this.nodes[this.orders[i]].x;
    var son = this.nodes[this.orders[i]].y;


    var tempItem=  (

       <View>
         <Circle cx={x} cy={y} r="10" fill="pink"/>
         <Circle cx={ilk} cy={son} r="10" fill="pink"/>
         <Line x1={ilk} y1={son} x2={x} y2={y} stroke="blue" strokeWidth="2"/>
       </View>
    );

    output[i-1] = (tempItem);
  }

  var x = this.nodes[this.orders[0]].x;
  var y = this.nodes[this.orders[0]].y;

  var ilk = this.nodes[this.orders[this.orders.length-1]].x;
  var son = this.nodes[this.orders[this.orders.length-1]].y;


  var tempItem=  (

     <View>
       <Circle cx={x} cy={y} r="10" fill="pink"/>
       <Circle cx={ilk} cy={son} r="10" fill="pink"/>
       <Line x1={ilk} y1={son} x2={x} y2={y} stroke="blue" strokeWidth="2"/>
     </View>
  );

  output[output.length] = (tempItem);



  return(
    <Svg height="600" width="480">
     {output}
    </Svg>
  );


}





  render(){

    return(
      <View style={styles.container}>

        <StatusBar hidden={true}/>
        <View style={{height:50, flexDirection:'row'}}>

          <View style={{flex:1,alignItems:'center', height:50, backgroundColor:'lightblue', justifyContent:'center'}}>
            <TouchableOpacity
            onPress={this.start.bind(this)}
            >
            <Text>start</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex:1,alignItems:'center', height:50, backgroundColor:'yellow', justifyContent:'center'}}>
            <TouchableOpacity
            onPress={this.stop.bind(this)}
            >
            <Text>stop</Text>
            </TouchableOpacity>
          </View>

        </View>


        <View style={{backgroundColor:"red", alignItems:"center", justifyContent:'center'}}>

            {this.cevap()}

            <StatusBar hidden={true}/>

        </View>


        <View style={{flexDirection:'row'}}>

        <View style={{height:50, width:150, alignItems:'center', justifyContent:"center"}}>
          <TouchableOpacity
          onPress={() => this.setState({sayac:this.state.sayac+1})}
          >
          <Text>TIKLA</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:50, width:150, alignItems:'center', justifyContent:"center"}}>
          <Text>{this.state.sayac}</Text>
        </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  }
})


export default Tsp;
