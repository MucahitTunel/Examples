/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import Constants from './Constants';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Exit from './exit';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'


import GamePage from './game';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      exit: false,
    }
  }


  level = (a) =>{
    this.props.navigation.navigate('Game', {level:a})
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.setState({
      exit: true,
    })

    return true;
  }


  onExit = () =>{
    BackHandler.exitApp();
  }

  onContinue = () =>{
    this.setState({
      exit:false,
    })
  }



  render(){
    return (
      <View style={styles.container}>
          <StatusBar hidden={true} />

          <View style={{alignItems:'center', justifyContent:'center', marginTop:100, flex:2}}>

            <Text style={{fontSize:40, fontWeight:"bold"}}> ZEKA OYUNU </Text>

          </View>

          <View style={styles.body}>

            <View style={{flexDirection:'row', marginTop:10}}>
              <View style={{marginRight:10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.level.bind(this,3)}
                >
                  <Text style={{fontSize:25}}> 3 x 3</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft:10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.level.bind(this,4)}
                >
                  <Text style={{fontSize:25}}> 4 x 4 </Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={{flexDirection:'row', marginTop:10}}>
              <View style={{marginRight:10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.level.bind(this,5)}
                >
                  <Text style={{fontSize:25}}> 5 x 5</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft:10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.level.bind(this,6)}
                >
                  <Text style={{fontSize:25}}> 6 x 6 </Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={{flexDirection:'row', marginTop:10}}>
              <View style={{marginRight:10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.level.bind(this,7)}
                >
                  <Text style={{fontSize:25}}> 7 x 7</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft:10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.level.bind(this,8)}
                >
                  <Text style={{fontSize:25}}> 8 x 8 </Text>
                </TouchableOpacity>
              </View>
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


          {this.state.exit === true && <Exit onExit={this.onExit} onContinue={this.onContinue} />}

      </View>
    );
  }
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#f2e8e1',
  },
  button:{
    width:150,
    height:75,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'yellow',
    borderRadius:25,
    marginTop:10
  },
  body:{
    alignItems:'center',
    marginTop:50,
    flex:6,
    width:Constants.MAX_WIDTH,
    height:Constants.MAX_HEIGHT
  }
});



const MainNavigator = createStackNavigator({
  App: {screen: App},
  Game:{screen:GamePage},
},
{
  initialRouteName: 'App',
  headerMode:'none'
});

const Appp = createAppContainer(MainNavigator);

export default Appp;
