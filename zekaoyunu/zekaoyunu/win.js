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

      this.dakika = this.props.dakika;
      this.saniye = this.props.saniye;

    }



    onHome = () =>{
      this.props.onHome();
    }




    render() {

        return (
            <View style={styles.clearScreen}>

                <View style={styles.panel}>

                  <View style={{margin:5}}>
                    <Text style={{fontSize:26, fontWeight:'bold', color:'white'}}>TEBRİKLER</Text>
                  </View>

                  <View>

                    <Text style={[styles.textSize, {color:'#420c78'}]}>Süreniz: <Text>{this.dakika} dk, {this.saniye} sn</Text>    </Text>

                  </View>



                  <View style={{margin:5}}>
                    <TouchableOpacity
                      onPress={this.onHome}
                    >
                      <View style={styles.buttonSize}>
                        <Text style={styles.textSize}>Ana Sayfa</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    height:45,
    margin:10,
    backgroundColor:'#f99b56',
    alignItems:'center',
    justifyContent:'center'
  },

  textSize:{
    fontSize:20,
    color:'white',
    fontWeight:'bold'
  }

});
