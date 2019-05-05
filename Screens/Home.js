import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Image,TouchableHighlight } from 'react-native';
import firebase from '../config/config'

export default class Home extends React.Component {
constructor(){
super();
this.state={
    isSignedIn:false
}
}

static navigationOptions = ({ navigation }) => ({
    header: null
  })

componentDidMount=()=>{
    this.authListener();

    }
  
  
  authListener=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
           
            this.props.navigation.navigate('Drawer');
        }
        else{

            this.props.navigation.navigate('Home');
        }
    })
  }

render(){
    return(
    <View style={styles.container}>
        <TouchableOpacity  style={styles.butt} onPress={()=>{this.props.navigation.navigate('Signup')}} >
          <Text style={{color:'#fff',marginVertical:20,fontSize:25}}>Sign Up</Text>
          </TouchableOpacity>
<View style={{flexDirection:'row'}}>
          <Text style={{fontSize:15}}>Already Signed Up?</Text>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
              <Text style={{fontSize:15,color:'#000080'}}>Login</Text>
          </TouchableOpacity>
          </View>
    </View>
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
        height:70,
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