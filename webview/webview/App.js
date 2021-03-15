import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      connection: false,
    }
  }

  componentDidMount = () => {
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      if (state.isConnected) {
          this.setState({
            connection: true,
          })
      }else {
        Alert.alert("İnternet bağlantınızı kontrol ediniz");
      }
    });
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render(){
    return(
      <View style={styles.container}>

        {this.state.connection ?
          <WebView source={{ uri: 'https://armiya.com/' }} />
          :
          <View></View>
        }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

export default App;
