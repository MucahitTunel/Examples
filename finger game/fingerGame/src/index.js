import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  YellowBox,
  ToastAndroid,
  BackHandler,
} from 'react-native';

class Home extends Component{

  constructor(props){
    super(props);


  }



  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={{width:200, height:200, backgroundColor:'lightgreen', alignItems:'center', justifyContent:'center'}}
          onPress={() => this.props.navigation.navigate("New")}
        >
          <Text>Oyuna Başla</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }

})

export default Home;
