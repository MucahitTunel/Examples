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

    }



    onContinue = () =>{
      this.props.onContinue();
    }

    onExit = () => {
      this.props.onExit();
    }


    render() {

        return (
            <View style={styles.clearScreen}>

                <View style={styles.panel}>

                  <View style={{margin:5}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Çıkmak istediğinize emin misiniz?</Text>
                  </View>

                  <View style={{margin:5}}>
                    <TouchableOpacity
                      onPress={this.onExit}
                    >
                      <View style={styles.buttonSize}>
                        <Text style={styles.textSize}>EVET</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={this.onContinue}
                    >
                      <View style={styles.buttonSize}>
                        <Text style={styles.textSize}>HAYIR</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

          </View>
        );
    }
}

const styles = StyleSheet.create({

  clearScreen:{
    position: 'absolute',
        top: 0,
        left: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
  buttonSize:{
    width:150,
    height:35,
    margin:10,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center'
  },

  textSize:{
    fontSize:20,
    fontWeight:'bold'
  }

});
