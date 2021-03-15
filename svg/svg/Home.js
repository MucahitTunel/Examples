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

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AppScreen from './App';
import BolumlerScreen from './Bolumler';

import AsyncStorage from '@react-native-community/async-storage';


/*
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-2213986178919906/5532437592"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />

*/


class Home extends Component{
  constructor(props){
    super(props);

    this.seviye = null;
  }




  sendLevel = () => {

    var deger = AsyncStorage.getItem("seviye")
      .then(value => {
        console.log("value: " + value);

        if(value === null){
        AsyncStorage.setItem("seviye", "5");
        this.props.navigation.navigate("App",{sayfa:"Home", seviye:"5"})
      }else {
        this.props.navigation.navigate("App",{sayfa:"Home", seviye:value})
      }
    })
  }

  bolumList = () =>{
    var deger = AsyncStorage.getItem("seviye")
      .then(value => {
        console.log("value: " + value);
        if(value === null){
          this.props.navigation.navigate("Bolumler",{seviye:"5"})
        }else {
          this.props.navigation.navigate("Bolumler",{seviye:value})
        }
    })
  }

  render(){
    return(

      <View style={styles.container}>

        <View style={styles.titlePanel}>
          <Text style={{fontSize:30, marginTop:10, fontWeight:'bold'}}>EN KISA</Text>
          <Text style={{fontSize:30, marginTop:5, fontWeight:'bold'}}>YOL</Text>
        </View>

        <View style={styles.body}>

          <TouchableOpacity
            style={styles.buton}
            onPress={this.sendLevel.bind(this)}
          >
            <Text style={{fontSize:25}}>BAŞLA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buton}
            onPress={this.bolumList.bind(this)}
          >
            <Text style={{fontSize:25}}>BÖLÜMLER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buton}
          >
            <Text style={{fontSize:25}}>BİLGİLENDİRME</Text>
          </TouchableOpacity>


        </View>

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
  titlePanel:{
    width:200,
    height:100,
    backgroundColor:'pink',
    borderRadius:25,
    alignItems:'center',
    marginTop:100
  },
  body:{
    width:300,
    height:300,
    backgroundColor:'pink',
    marginTop:30,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },
  buton:{
    width:230,
    height:65,
    backgroundColor:'yellow',
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20
  }

});



const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    App: {screen: AppScreen},
    Bolumler: {screen: BolumlerScreen},
  },
  {
    initialRouteName: 'Home',
    headerMode:'none'
  }
);

const Appp = createAppContainer(MainNavigator);

export default Appp;
