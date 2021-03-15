import { createStackNavigator, createAppContainer } from "react-navigation";
import App from './App.js';

const AppNavigator = createStackNavigator(
  {
    App: {screen: App},
  },
  {
    initialRouteName: 'App',
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator);
