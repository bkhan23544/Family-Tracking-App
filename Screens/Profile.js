import * as React from 'react';
import { Text, View, StyleSheet,Button,TextInput,Image,TouchableOpacity } from 'react-native';
import firebase from '../config/config'

export default class Profile extends React.Component{

    constructor(){
        super();
        this.state={
            user:{}
        }
    }

    componentDidMount(){
        firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).on('value',snapshot=>{
            this.setState({user:snapshot.val()})
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri:this.state.user.photoURL}} style={{borderRadius:50,borderWidth:1,borderColor:"#000080",width:200,height:200}}/>
                <Text style={{fontSize:30,color:"#000080"}}>{this.state.user.name}</Text>
                <Text style={{fontSize:20,color:"#228B22"}}>{this.state.user.email}</Text>
                <Text style={{fontSize:20,color:"#228B22"}}>{this.state.user.phoneno}</Text>
                
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
  });