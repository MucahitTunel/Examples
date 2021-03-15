import * as React from 'react';
import {View, Text} from 'react-native';

import {Header, Icon} from '../../component';


class Home extends React.Component {
  render(){
    return(
      <View>
        <Header/>
        <Icon name='search' tintColor='black'/>
      </View>
    );
  }
}

export default Home;
