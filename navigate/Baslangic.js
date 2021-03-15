import { createStackNavigator, createAppContainer } from "react-navigation";
import App from './App.js';
import Sayfa2 from './Sayfa2.js';

const AppNavigator = createStackNavigator(
  {
    App: {screen: App},
    Sayfa2: {screen: Sayfa2},
  },
  {
    initialRouteName: 'App',
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator);
