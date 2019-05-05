import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator,createAppContainer,DrawerItems } from "react-navigation";
import Map from './Screens/Map'
import Circles from './Screens/Circles'
import CircleCreate from './Screens/CircleCreate'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Header,Left,Right} from 'native-base'
import Logout from './Screens/Logout'
import UserHome from './Screens/UserHome';
import Alert from './Screens/Alert';
import {Provider} from 'react-redux';
import {store} from './redux/redux'
import Profile from './Screens/Profile'
import Invite from './Screens/Invite'
import { Permissions, Notifications } from 'expo';
import firebase from './config/config'





export default class App extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
      })

async componentDidMount(){
  await this.registerForNotifications()
}

      registerForNotifications=async()=>{
        const { status } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
          );
          let finalStatus = status;
    
          if(finalStatus!== 'granted'){
            const { status } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
              );
              let finalStatus = status;
          }
          if(finalStatus!=='granted'){
              return{};
          }
    
          let token = await Notifications.getExpoPushTokenAsync();
          firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).update({
              token
          })
    }

  render() {
    return (
     
      <Provider store={store}>
    
        <Apps/>
        </Provider>
       
    );
  }
}

const AppNavigator = createDrawerNavigator({
 
 
 
    Map:{screen:Map},
    Circles:{screen:Circles,
      navigationOptions:{
          headerTitle:"sdadfasd"
      }}, 
      Profile:{screen:Profile},
    Join:{screen:UserHome},

Invite:{screen:Invite},
Alert:{screen:Alert},
Logout:{screen:Logout},




},




)

const Apps = createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});