import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Image,TouchableHighlight,Modal } from 'react-native';
import firebase from '../config/config'
import {connect} from 'react-redux'

const mapStateToProps = (state) =>{
    return{
      circlekey:state.circlekey,
      }
  }

  class Invite extends React.Component {
render(){
    return(
        <View style={styles.container}>
            <Text>Send This Code To Your Friends To Join Your Circle</Text>
            <TextInput selectTextOnFocus={true} value={this.props.circlekey} style={styles.input}/>
        </View>
    )
}
  }
  
  export default connect(mapStateToProps)(Invite);
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
      input:{fontSize:15,
        width:100,
        marginVertical:10,
        borderWidth:1,
        borderRadius:10,
        height:50,
    textAlign:'center',
color:"#000080"}
  });