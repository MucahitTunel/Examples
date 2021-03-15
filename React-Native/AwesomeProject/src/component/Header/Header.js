import * as React from 'react';
import {  View, Text} from 'react-native';

import {headerStyles as styles} from './styles';


class Header extends React.Component {
  render(){
    return(

        <View style = {styles.container}>
          <Text style = {styles.subTitle}>Hangi ülkeyi merak ediyorsunuz???</Text>
          <View style = {styles.line} />
          <Text style = {styles.title}>ÜLKELER</Text>
        </View>
    );
  }
}

export default Header;
