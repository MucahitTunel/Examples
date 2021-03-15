import * as React from 'react';

import {View, Text} from 'react-native';


import PropTypes from 'prop-types';

class Icon extends React.Component{

  render(){

   const {name, tintColor} = this.props;


    return(
        <View>
          <Text> Hosgeldin </Text>
        </View>

    );
  }
}

Icon.propTypes = {
  name: PropTypes.string,
  tintColor: PropTypes.string,
};





export default Icon;
