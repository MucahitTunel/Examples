/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

global.PaymentRequest = require('react-native-payments').PaymentRequest;

const METHOD_DATA = [{
  supportedMethods: ['android-pay'],
  data: {
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    currencyCode: 'USD',
    environment: 'TEST', // defaults to production
    paymentMethodTokenizationParameters: {
      tokenizationType: 'NETWORK_TOKEN',
      parameters: {
        publicKey: 'your-pubic-key'
      }
    }
  }
}];


const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Movie Ticket',
      amount: { currency: 'USD', value: '15.00' }
    }
  ],
  total: {
    label: 'Merchant Name',
    amount: { currency: 'USD', value: '15.00' }
  }
};





class HomeScreen extends React.Component {

  constructor(props){
    super(props);



  }

  componentDidMount(){
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest.show();
  }

  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>hi</Text>
      </View>
    );
  }

}



class App extends React.Component{

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode='none'
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

};

const styles = StyleSheet.create({
  container :{
    flex:1,
  }
});

export default App;
