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
  FlatList,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AppScreen from './App';

class Bolumler extends Component{
  constructor(props){
    super(props);

    this.data = [];

    var deger= this.props.navigation.getParam("seviye");
    var seviye = parseInt(deger,10);

    for(var i = 0; i < seviye-5; i++){
      this.data.push({
        id:i,
        deger:i+5,
      })
    }


  }


  renderItem = ({item}) =>{

    return(

      <View>

        <TouchableOpacity
        onPress = {() => this.props.navigation.navigate("App",{sayfa:"Bolumler", data:item.deger})}
        >
          <View style={{width:100, height:100, backgroundColor:'yellow', marginLeft:10, marginTop:10, alignItems:'center', justifyContent:'center'}}>

            <Text style={{fontSize:30}}>{item.deger}</Text>

          </View>
        </TouchableOpacity>

      </View>

    );

  }



  render(){
    return(

      <View style={styles.container}>



        <View style={{marginTop:30}}>
          <Text style={{fontSize:30}}>BÖLÜMLER</Text>
        </View>

        <ScrollView>
          <View style={{marginTop:20}}>
            <FlatList
              data = {this.data}
              renderItem={this.renderItem}
              numColumns={3}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </ScrollView>

        <StatusBar hidden={true}/>
      </View>

    );
  }
}


const styles = ({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'lightblue'
  },

});

export default Bolumler;
