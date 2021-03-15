/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import PushNotification from 'react-native-push-notification';

class App extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){

    console.log("Componenet Did Mount");

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var saniye = new Date().getSeconds();

  /*  var saat = 13;
    var dakika = 30;

    var sonuc = ((hours-saat)*60*60+(dakika-minutes-1)*60+(60-saniye))
    console.log(sonuc);*/

    //date: new Date(Date.now() + sonuc * 1000) // in 60 secs

    console.log(date);
    console.log(month);
    console.log(year);
    console.log(hours);

    let time = new Date(year, month, hours > 14 ? date +1 :date, 14);
    time = Date.parse(time);

    const schedulingOptions0 = { date: time, repeat: 'day' };

    PushNotification.localNotificationSchedule(schedulingOptions0);
  }


  render(){
    return(
      <View style={{flex:1}}>

        <TouchableOpacity>
            <Text>Selamlar</Text>
        </TouchableOpacity>

      </View>
    );
  }
}




PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});


export default App;
