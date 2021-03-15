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

      this.kazanan = this.props.kazanan;
    }


    onRetry = () => {
      this.props.onRetry();
    }

    onHome = () => {
      this.props.onHome();
    }


    render() {

      if(this.kazanan === 0){
        return(

          <View style={styles.clearScreen}>
            <View style={styles.panel}>
              <Text style={{fontSize:30}}>KAZANAN</Text>
              <Text style={{marginTop:10, fontSize:20}}>BERABERE</Text>

              <View style={{flexDirection:'row', marginTop:20}}>
                <View style={{margin:5}}>
                  <TouchableOpacity
                    style={{backgroundColor:'green', width:90, height:50, alignItems:'center', justifyContent:'center'}}
                    onPress={this.onHome}
                  >
                    <Text style={{fontSize:18}}>Ana Sayfa</Text>
                  </TouchableOpacity>
                </View>
                <View style={{margin:5}}>
                  <TouchableOpacity
                    style={{backgroundColor:'green', width:90, height:50, alignItems:'center', justifyContent:'center'}}
                    onPress={this.onRetry}
                  >
                    <Text style={{fontSize:18}}>Tekrar</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>

        );
      }else {
        return(

          <View style={styles.clearScreen}>
            <View style={styles.panel}>
              <Text style={{fontSize:30}}>KAZANAN</Text>
              <Text style={{marginTop:10, fontSize:20}}>OYUNCU {this.kazanan}</Text>

              <View style={{flexDirection:'row', marginTop:20}}>
                <View style={{margin:5}}>
                  <TouchableOpacity
                    style={{backgroundColor:'green', width:90, height:50, alignItems:'center', justifyContent:'center'}}
                    onPress={this.onHome}
                  >
                    <Text style={{fontSize:18}}>Ana Sayfa</Text>
                  </TouchableOpacity>
                </View>
                <View style={{margin:5}}>
                  <TouchableOpacity
                    style={{backgroundColor:'green', width:90, height:50, alignItems:'center', justifyContent:'center'}}
                    onPress={this.onRetry}
                  >
                    <Text style={{fontSize:18}}>Tekrar</Text>
                  </TouchableOpacity>
                </View>
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
        height: 200,
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
