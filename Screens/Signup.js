import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Image,Alert,TouchableHighlight } from 'react-native';
import {ImagePicker} from 'expo'
import firebase from '../config/config'
import { KeyboardAvoidingView } from 'react-native';



class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state={
    phoneno:"",
    password:"",
    email:"",
    name:"",
    photoURL:"",
    image:null,
    picver:false,
    errormessagesignup:""
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4,4], base64: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri })
          let base64Img = `data:image/jpg;base64,${result.base64}`;
    
    
          //Add your cloud name
          let apiUrl = 'https://api.cloudinary.com/v1_1/dvruodwyc/image/upload';
          let data = {
            "file": base64Img,
            "upload_preset": `workerz`,
          }
    
          fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
            let data = await r.json()
            console.log(data.secure_url)
            this.setState({ photoURL: data.secure_url });
            this.setState({ picver: true });
            Alert.alert("Profile Picture Selected");
    
          }).catch(err => console.log(err))
        }
      }
    
    signup=()=>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
           console.log(user)
        
            firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).set({
        email:this.state.email,
        name:this.state.name,
        phoneno:this.state.phoneno,
        photoURL:this.state.photoURL

        
        
        
            })
            
           
        }).catch((error)=>{
            console.log(error)
            Alert.alert(`${error.message}`)
            this.setState({errormessagesignup:error.message});
        })
        // this.props.navigation.navigate("UserHome")
        }
    
    render(){
        const {phoneno,password,email,name,picver}=this.state;
        return(
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={150}> 
            <View style={styles.container}>
            {this.state.picver ? (<TouchableOpacity style={{borderRadius:30}}>
<Image style={{width:100,height:100}} source={{uri:this.state.photoURL}}/>
            </TouchableOpacity>):
            (
            //<TouchableOpacity style={{borderRadius:15}} onPress={this.pickImage}></TouchableOpacity>
            <View>
            <TouchableOpacity onPress={this.pickImage}>
<Image style={{width:100,height:100,borderRadius:30}} source={{uri:"https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png"}}/>
</TouchableOpacity>
<Text style={{color:'#A9A9A9',alignSelf:'center'}}>Select Profile Picture</Text>
</View>
    )}
                <TextInput keyboardType='numeric' placeholder="Enter Phone Number.." style={styles.input} onChangeText={(e)=>{this.setState({phoneno:e})}}/>
                <TextInput placeholder="Enter Name.." style={styles.input} onChangeText={(e)=>{this.setState({name:e})}}/>
                <TextInput placeholder="Enter Email.." style={styles.input} onChangeText={(e)=>{this.setState({email:e})}}/>
                <TextInput placeholder="Enter Password.." style={styles.input} onChangeText={(e)=>{this.setState({password:e})}}/>
                {phoneno!=="" && name!=="" && email!=="" && password!=="" && picver===true &&
                <TouchableOpacity  style={styles.butt} onPress={this.signup}>
          <Text style={{color:'#fff',marginVertical:22,fontSize:20}}>Sign Up</Text>
          </TouchableOpacity>}

              
             
                
            </View>
            </KeyboardAvoidingView>
        )
    }
}
export default Signup;

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