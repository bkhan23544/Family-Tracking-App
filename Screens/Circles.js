import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button,TextInput,Modal,TouchableHighlight } from 'react-native';
import firebase from '../config/config'
import {connect} from 'react-redux';
import {setcircles} from '../redux/redux';
import { NavigationActions } from 'react-navigation'



const mapStateToProps = (state) =>{
  return{
    circles:state.circles
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setcircles:(text)=>{dispatch(setcircles(text))},

}
}

class App extends React.Component {

    constructor(props){
      super(props);
        this.state={
            circles:[],
            createCircle:false,
            circlename:"",
            key:"",
            update:false
            
        }
    }

componentDidMount(){

 this.componentDidFocus();

}



componentDidFocus(){
  var item = firebase.auth().currentUser.uid;
  var date = new Date().toLocaleTimeString();
  var key = `${item[0]}${item[5]}${item[7]}${item[9]}${date[6]}${date[7]}`;
  this.setState({key})
this.getCircles();
}

async getCircles(){
  var data = []
    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles`).on('child_added',(snapshot)=>{
       //////console.log(snapshot.val(),"snap");
      
       var childKey = snapshot.key;
       var childData = snapshot.val();
      var push = this.props.circles.concat(childData);
      this.props.setcircles(push)
      
    }
    )
    //////console.log(this.props.circles)
    
}

setcircles=()=>{
  this.props.setcircles(this.state.circles);
}

selectCircle(key){
  firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles`).orderByChild('opened').equalTo('true').once('value',snapshot=>{
    if(snapshot.exists()){
    snapshot.forEach((child)=>{
      //////console.log(child,"sad")
      child.ref.update({opened:"false"})
    })
  }
  })
  firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles/${key}`).update({
    opened:"true"
  })
  NavigationActions.navigate('Drawer');


  
}

newCircle(){


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
    //////console.log(child,"sad")
    child.ref.update({opened:"false"})
  })
}
})
firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles/${this.state.key}`).update({
  opened:"true"
})
this.props.navigation.navigate('Drawer');
//////console.log(this.state.key,"dsdas")
}

  render() {
    //////console.log('circles',this.props.circles)
    return(
      <View style={styles.container}>

       <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.createCircle}
          onRequestClose={()=>{this.setState({createCircle:!createCircle})}}
        >
          <View style={{marginTop: 22}}>
            <View>
        <TextInput placeholder="Enter Circle Name" onChangeText={(e)=>{this.setState({circlename:e})}}/>

              <TouchableHighlight
                onPress={() => {
                  this.setState({createCircle:false});
                  this.newCircle();
                }}>
                <Text>Create Circle</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
 {this.props.circles.map((value,index)=>{
   return(
     <View key={value.key}>
     <TouchableOpacity key={value.key}  style={styles.butt} onPress={()=>{this.selectCircle(value.key)}}>
       <Text style={{color:'#fff',marginVertical:13,fontSize:20}} key={index}>{value.name}</Text>
       </TouchableOpacity>
     </View>
   )
 })}
 </View>)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


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
});