import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Image,TouchableHighlight,Modal,Alert } from 'react-native';
import firebase from '../config/config'
import { NavigationActions } from 'react-navigation'




export default class Home extends React.Component {
constructor(){
    super();
    this.state={
circlename:"",
key:"",
create:false,
invite:"",
joinCirclename:""
    }
}


    signout=()=>{
        firebase.auth().signOut();
        this.props.navigation.navigate('Home');
       
    }
    

componentDidMount=()=>{
    var item = firebase.auth().currentUser.uid;
    var date = new Date().toLocaleTimeString();
    var key = `${item[0]}${item[5]}${item[7]}${item[9]}${date[6]}${date[7]}`;

    this.setState({key:key})
    
   
}

joinCircle=()=>{
    firebase.database().ref(`Circles/${this.state.invite}/Members/${firebase.auth().currentUser.uid}`).set({
        id:firebase.auth().currentUser.uid
    })
firebase.database().ref(`Circles/${this.state.invite}`).once('value',snapshot=>{
 
  if(snapshot.key=='Circles'){
    Alert.alert("Invalid Key")
 
  }
  else{
    this.setState({joinCirclename:snapshot.val().name},
    ()=>{this.send()})
    NavigationActions.navigate('Drawer')
  }
});


}

send=()=>{
    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles/${this.state.invite}`).set({
        key:this.state.invite,
        name:this.state.joinCirclename,
        opened:"true"
      })
}


createCircle=()=>{


    firebase.database().ref(`Circles/${this.state.key}`).set({
      name:this.state.circlename,
      key:this.state.key,
      })
    
    firebase.database().ref(`Circles/${this.state.key}/Members/${firebase.auth().currentUser.uid}`).set({
      id:firebase.auth().currentUser.uid
    })
    
    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles/${this.state.key}`).set({
      key:this.state.key,
      name:this.state.circlename,
      opened:"false"
    })
    
    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles`).orderByChild('opened').equalTo('true').once('value',snapshot=>{
      if(snapshot.exists()){
      snapshot.forEach((child)=>{
        console.log(child,"sad")
        child.ref.update({opened:"false"})
      })
    }
    })
    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles/${this.state.key}`).update({
      opened:"true"
    })
    this.props.navigation.navigate('Drawer');

    }

render(){
    return(
        <View style={styles.container}>
         <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.create}
        >
          <View style={styles.container}>
            <View>
        <TextInput placeholder="Enter Circle Name" onChangeText={(e)=>{this.setState({circlename:e})}} style={styles.input}/>

            
              <TouchableOpacity  style={{   width: 200,
        height:70,
        borderRadius: 40,
        backgroundColor:'#000080',
        alignItems:'center',
        marginVertical:10}}  onPress={() => {
                  this.setState({create:false});
                  this.createCircle();
                }} >
          <Text style={{color:'#fff',marginVertical:25,fontSize:17}}>Create Circle</Text>
          </TouchableOpacity>
            </View>
          </View>
        </Modal>
            <Text style={{fontSize:20}}>Want To Join A Circle?</Text>
            <Text style={{fontSize:20}}>Enter Your Invite Code</Text>
            <TextInput style={styles.input} alignText='center' onChangeText={(e)=>{this.setState({invite:e})}}/>
            <TouchableOpacity  style={styles.butt} onPress={this.joinCircle} >
          <Text style={{color:'#fff',marginVertical:25,fontSize:17}}>Join</Text>
          </TouchableOpacity>
            <Text style={{marginVertical:30,fontSize:20}}>OR</Text>
          <TouchableOpacity  style={styles.butt} onPress={()=>{this.setState({create:true})}} >
          <Text style={{color:'#fff',marginVertical:25,fontSize:17}}>Create A New Circle</Text>
          </TouchableOpacity>
            {/* <Button title="See Map" onPress={()=>{this.props.navigation.navigate('Map')}}/> */}
            {/* <Button title="Logout" onPress={this.signout}/> */}
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
        width:200,
        marginVertical:10,
        borderWidth:1,
        borderRadius:10,
        height:50,
    }
  });