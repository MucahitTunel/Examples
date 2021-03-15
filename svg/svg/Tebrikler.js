import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import styles from './PopupStyles';

export default class Tebrikler extends Component {

    constructor(props){
      super(props);

      this.sonuc = this.props.sonuc;
      this.cevap = this.props.cevap;

    }

    render() {
        return (
            <View style={styles.clearScreen}>

                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>TEBRİKLER</Text>

                    <Text style={{fontSize:20, marginTop:10}}>Cevabınız                : {this.sonuc}</Text>
                    <Text style={{fontSize:20, marginTop:10}}>Algoritma Sonucu  : {this.cevap}</Text>

                    <View style={styles.panelButtonsContainer}>
                      <TouchableWithoutFeedback onPress={this.props.anaSayfa}>
                          <View style={styles.panelButton}>
                              <Image style={styles.panelButtonIcon} resizeMode="contain" source={require('./assets/home.png')} />
                          </View>
                      </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={this.props.onNextLevel}>
                            <View style={styles.panelButton}>
                                <Image style={styles.panelButtonIcon} resizeMode="contain" source={require('./assets/icon_play.png')} />
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </View>
            </View>
        );
    }
}
