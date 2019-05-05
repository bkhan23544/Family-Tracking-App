import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Alert,Image,TouchableHighlight,KeyboardAvoidingView } from 'react-native';

import firebase from '../config/config'


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
  
    password:"",
    email:"",
    errormessage:""
        }
    }

    login=()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
            if(user){
            this.props.navigation.navigate('Drawer')
          
        }
     
        }).catch((error)=>{
            Alert.alert(`${error.message}`)
          this.setState({erromessage:error})
        })
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> 
            <View style={styles.container}>
                <TextInput placeholder="Enter Email.." style={styles.input} onChangeText={(e)=>{this.setState({email:e})}}/>
                <TextInput placeholder="Enter Password.." style={styles.input} onChangeText={(e)=>{this.setState({password:e})}}/>
                <TouchableOpacity  style={styles.butt} onPress={this.login} >
          <Text style={{color:'#fff',marginVertical:13,fontSize:20}}>Login</Text>
          </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
        )
    }
}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        butt: {
            width: 200,
            height:50,
            borderRadius: 40,
            backgroundColor:'#000080',
            alignItems:'center',
            marginVertical:10
          },
          input:{fontSize:15,
            width:300,
            marginVertical:10,
            borderWidth:1,
            borderRadius:10,
            height:50}
      });