import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  BackAndroid
} from 'react-native';

export default class Pause extends Component {
    constructor(props){
      super(props);

      this.state = {
        deger : 0,
      }
    }



    onContinue = () =>{
      this.props.onContinue();
    }

    onExit = () => {
      this.props.onExit();
    }
    onHome = () => {
      this.props.onHome();
    }


    render() {

      if(this.state.deger === 0){
        return(

          <View></View>

        );
      }else {
        return (
            <View style={styles.clearScreen}>

                <View style={styles.panel}>

                  <Text style={{fontSize:40, fontWeight:'bold', color:'white'}}>MENÜ</Text>


                  <View style={{flexDirection:'row', marginTop:20}}>

                    <TouchableOpacity onPress={this.onContinue}>
                    <View style={styles.panelButton}>
                      <Image style={styles.panelButtonIcon} resizeMode="contain" source={require('./assets/icon_play.png')} />
                    </View>
                    </TouchableOpacity>

                  </View>

                  <View style={{flexDirection:'row', marginTop:20}}>

                    <TouchableOpacity onPress={this.onHome}>
                    <View style={styles.panelButton}>
                      <Image style={styles.panelButtonIcon} resizeMode="contain" source={require('./assets/home.png')} />
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onExit}>
                    <View style={styles.panelButton}>
                      <Image style={styles.panelButtonIcon} resizeMode="contain" source={require('./assets/exit.png')} />
                    </View>
                    </TouchableOpacity>

                  </View>

                </View>

            </View>
        );
      }

    }
}

const styles = StyleSheet.create({

  clearScreen:{
    position: 'absolute',
        top: 0,
        left: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
  },
  panel: {
        backgroundColor: '#29aecc',
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 400,
        flexDirection:'column'

  },
  panelButtonIcon: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
  panelButton: {
        width: 80,
        height: 80,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
