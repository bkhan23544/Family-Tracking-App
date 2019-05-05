import * as React from 'react';
import { Text, View, StyleSheet,Button,TextInput,Image,TouchableOpacity } from 'react-native';
import { Permissions, Notifications } from 'expo';
import firebase from '../config/config'
import {connect} from 'react-redux'



const mapStateToProps = (state) =>{
    return{
      members:state.members
    }
  }

class Alert extends React.Component {
constructor(props){
super(props);
this.state={
user:{}
}
}


    sendPushNotification = () => {
        console.log("members",this.props.members)
        firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).on('value',user=>{
this.setState({user:user.val()},
()=>{this.send()})
        })
      }

send=()=>{
    this.props.members.map((value)=>{
        firebase.database().ref(`Users/${value}`).on('value',snapshot=>{
    
        
            let response = fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                to: snapshot.val().token,
                sound: 'default',
                title: 'Alert',
                body: `${this.state.user.name} Is In Danger`
              })
            });
        })
        })
    
}

    render(){
        return(
            <View style={styles.container}>
                  <TouchableOpacity  style={styles.butt} onPress={()=>{this.sendPushNotification()}} >
          <Text style={{color:'#fff',marginVertical:20,fontSize:20}}>Send Danger Alert</Text>
          </TouchableOpacity>
                </View>
        )
    }
    }
    export default connect(mapStateToProps)(Alert);

    
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
        backgroundColor:'#ff0000',
        alignItems:'center',
        marginVertical:10
      },
  });