import React, {Component} from 'React';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

class App extends Component{

  constructor(props){
    super(props);

    console.warn(this.props.navigation.state.params.veri);;
  }


  render(){
    return(

      <View style={styles.bg}>

        <Text style={styles.welcome}>Sayfa2</Text>

        <TouchableOpacity style={styles.touch} onPress={() => {this.props.navigation.goBack()}}>
          <Text style={styles.text}> Geri git</Text>
        </TouchableOpacity>

      </View>

    );
  }
}

export default App;


const styles = StyleSheet.create({

  bg: {flex:1, justifyContent:'center', alignItems:'center'},
  welcome:{fontSize:36, color:'blue'},
  touch:{marginTop:20, backgroundColor: 'red', paddingHorizontal:20, paddingVertical:10, borderRadius:5 },
  text: {fontSize:18, color:'black'}

});
