import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity , Alert} from "react-native";

class Beden extends Component {
    constructor(props){
        super(props);

        this.state = {
          degisimdeger : 0,
        }

    }


    degerler = () => {
      return 1;
    }


  /*  renderItem(){
      let k = 0;
      var output=[];
      for (var i = 0; i < this.props.positions.length/2; i++) {
        let x = this.props.positions[k];
        k++;

        let y = this.props.positions[k]
        k++;


        var tempItem=  (

        <View key={i}>
          <TouchableOpacity style={[styles.finger, { width: this.props.size, height: this.props.size, left: x * this.props.size, top: y * this.props.size,backgroundColor:this.props.backgroundColor, borderRadius:15 }]} onPress = {() => Alert.alert("hi")} >
          </TouchableOpacity>
        </View>
       );
        output[i] = (tempItem);


      }
      return(
        <View >
          {output}
        </View>
      )
  }*/



    render() {
      const x = this.props.position[0];
      const y = this.props.position[1];


        return (
            <View >
              <TouchableOpacity style={[styles.finger, { width: this.props.size, height: this.props.size, left: x * this.props.size, top: y * this.props.size,backgroundColor:this.props.backgroundColor, borderRadius:15 }]} >
              </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    finger: {
        backgroundColor: '#888888',
        position: "absolute"
    }
});

export { Beden };
