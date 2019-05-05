import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Image,TouchableHighlight,Modal } from 'react-native';
import firebase from '../config/config'
import { NavigationActions } from 'react-navigation'

export default class Home extends React.Component {
    constructor(props){
        super(props);
    }

    signOut(){
        firebase.auth().signOut();
    NavigationActions.navigate('Home')
    }

    render(){
        return(
            <View style={styles.container}>
                 <Text>Are You Sure You Want To Logout?</Text>
                 <TouchableOpacity  style={styles.butt} onPress={()=>{this.signOut()}} >
          <Text style={{color:'#fff',marginVertical:20,fontSize:20}}>Logout</Text>
          </TouchableOpacity>
            </View>
           
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    butt: {
        width: 200,
        height:70,
        borderRadius: 40,
        backgroundColor:'#000080',
        alignItems:'center',
        marginVertical:10
      },
  });