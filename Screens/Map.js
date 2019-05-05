import * as React from 'react';
import { Text, View, StyleSheet,Button,TextInput,Image } from 'react-native';
import { Constants, Permissions, Location, MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/config'
import {Header,Left} from 'native-base'
import {connect} from 'react-redux'
import {setMemberDetails,setcirclekey,setcirclename,setMembers} from '../redux/redux'
 

const mapStateToProps = (state) =>{
  return{
    circlename:state.circlename,
    circlekey:state.circlekey,
    memberDetails:state.memberDetails,
    members:state.members
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setcirclename:(text)=>{dispatch(setcirclename(text))},
setcirclekey:(text)=>{dispatch(setcirclekey(text))},
setMemberDetails:(text)=>{dispatch(setMemberDetails(text))},
setMembers:(text)=>{dispatch(setMembers(text))}
}
}
const LOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class Map extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user:{ latitude:0,
        latitudeDelta: 0.01,
      longitude:0,
      longitudeDelta: 0.01,
    },
     circlekey:"",
     members:[],
     memberDetails:[],
      circlename:"",
      showSearch:null,
      error: null,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      location: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    }
  }







  
  componentWillMount=()=>{

  this.componentDidFocus();

}
 

  componentDidFocus=()=>{
    this.askLocationAsync();
    this.getProviderStatusAsync();
    this.getHeadingAsync();
    this.getMyLocationAsync();
    if (!this.state.error) {

      Location.watchPositionAsync(LOCATION_OPTIONS, this.locationChanged);

     this.getkeys()
 
    }
   
  }

  getkeys=()=>{
    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Circles`).orderByChild('opened').equalTo('true').on('value',(snapshot)=>{
      if(snapshot.exists()){
var circlename = Object.values(snapshot.val())[0].name;
var circlekey = Object.values(snapshot.val())[0].key;
//////////////console.log(circlekey,circlename)
this.setState({circlekey,circlename},
()=>{this.onSetCircle();
  this.getOtherslocation()}
)

      }

    })
  }

  getOtherslocation=()=>{
    // ////////////console.log(this.state.circlekey,'key')
    firebase.database().ref(`Circles/${this.props.circlekey}/Members`).on('child_added',(snapshot)=>{
      var childKey = snapshot.key;
      var childData = snapshot.val().id;
    
      var pushdata = this.state.members.concat(childData);
      this.setState({members:pushdata})

    })
    this.props.setMembers(this.state.members);
    //////////console.log(this.props.members,"memdndndn")
    this.getMemberDetails();
  }

  getMemberDetails=()=>{
    var memebersData = []
    this.props.members.map((value)=>{
      firebase.database().ref(`Users/${value}`).on('value',(snapshot)=>{
      
        var childKey = snapshot.key;
        var childData = snapshot.val();
      var push = this.state.memberDetails.concat(childData);
      this.setState({memberDetails:push})

   
        
      })
    })
    // ////////////console.log(this.state.memberDetails,'memememeemdata')
    this.props.setMemberDetails(this.state.memberDetails)
  }

  onsetMemberDetails=()=>{
    this.props.setMemberDetails(this.state.memberDetails);
  }

  onsetMembers=()=>{
    this.props.setMembers(this.state.members)
  }

  locationChanged = (location) => {
    var region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
//////////////console.log(location)
    this.setState({location, region});

    firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).update({
      lat:location.coords.latitude,
      lng:location.coords.longitude
  })
  }

  getProviderStatusAsync = async () => {
    var provider = await Location.getProviderStatusAsync();
    //////////////console.log(provider);
  }

  getHeadingAsync = async () => {
    var header = await Location.getHeadingAsync();
    //////////////console.log(header);
  }

  askLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({error: 'Permission to access location was denied!'});
    }
  }

  onSetCircle=()=>{
    this.props.setcirclename(this.state.circlename);
    this.props.setcirclekey(this.state.circlekey)
  }

  getMyLocationAsync = async () => {
  

     let location = await Location.getCurrentPositionAsync({});
     this.setState({ location });
  }

  render() {
  // ////////////console.log("keys",this.props.memberDetails)
  // ////////////console.log(this.state.memberDetails,"mem");
    if (!this.state.error) {
     
      return (
     
      //   <Header>
      //   <Left>
      //     <Ionicons name='md-menu' size='20' onPress={()=>{this.props.navigation.openDrawer()}}/>
      //   </Left>
      // </Header> 
     
//  <View style={styles.container}>
//    <Text>{this.props.circlename}</Text>
//    <TextInput onChangeText={(e)=>{this.setState({circlename:e})}} />
//    <Button title="change" onPress={this.onSetCirclename}/>
//  </View>

  <View>
    <View style={{flex:1}}>
    <Ionicons style={{marginVertical:30}} name='md-menu' size={30} onPress={()=>{this.props.navigation.openDrawer()}}/>
    <Text style={{fontSize:25,textAlign:'center',position:'absolute',top:30,left:140}}>{this.props.circlename}</Text>
    </View>
    <MapView
            style={{ flex: 1,position:'absolute',left:0,right:0,height:550,top:70 }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            region={this.state.region}
            provider={"google"}
            
        >
       
        {this.props.memberDetails.map((value,index)=>{
          
        return(  
        <MapView.Marker 
       coordinate={{latitude:value.lat,
        
      longitude:value.lng,
    }}
 
    title={`${value.name}`}
    key={value.email}
        >
        <Image source={{uri:value.photoURL}} style={{width:60,height:60,borderRadius:100}}/>
        </MapView.Marker>) })}
        </MapView>
        </View>
     

      
     
       
      )}
  
    

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Map);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
