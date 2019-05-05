import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Signup from './Screens/Signup'
import Home from './Screens/Home'
import Login from './Screens/Login'
import UserHome from './Screens/UserHome'
import Map from './Screens/Map'
import CircleCreate from './Screens/CircleCreate'
import Drawer from './Drawer'
import {Provider} from 'react-redux';
import {store} from './redux/redux'
import Circles from './Screens/Circles';


export default class App extends React.Component {
  render() {
    return (
     
   <Provider store={store}>

        <Apps/>
     
        </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home:{
    screen:Home
  },
Signup:{
  screen:Signup
},
Login:{
  screen:Login
},
Map:{
  screen:Map
},
UserHome:{
  screen:UserHome
},
CircleCreate:{
  screen:CircleCreate
},
Drawer:{
  screen:Drawer
},
Circles:{
  screen:Circles
}

})
const Apps=createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
