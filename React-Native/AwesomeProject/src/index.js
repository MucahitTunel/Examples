import * as React from 'react';
import {  AppRegistry,View, ScrollView, Image} from 'react-native';

//import Home from './screens/Home/Home';


type Props = {};
export default class App extends React.Component {

  render(){


    return(

        <Image
          style={styles.logo}
          source={require('./asserts/icons/search.png')}
        />

    );
  }
}


const styles = {
  logo: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
    backgroundColor: "blue"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#efefef"
  },
  scrollView: {
    width: "100%"
  },
  containerStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

//export default App;

AppRegistry.registerComponent('AwesomeProject', () => App);
