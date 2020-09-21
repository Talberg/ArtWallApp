import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text,Image, View, Button, TouchableOpacity } from 'react-native';



export default function Home(props) {
    // let rooms = props.rooms
    // let saveState = props.rooms.game[props.rooms.save]

    // pass through the prop to set the game 
    function  buttonNewGame(){
        
        props.setCurrent({...props.master})
    }

    function buttonContinue(){
        console.log('Cont')
        props.setPlay('true')
    
    }
   
  return (
    <View 
    // onStartShouldSetResponder={
    //     props.game 
    // }
     style={styles.home}
    ><View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
    <Button
      onPress={buttonNewGame}
      title="New Game"
      color="#FF3D00"
    />
  </View> 
    <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
    <Button
      onPress={buttonContinue}
      title="Continue"
      color="#FF3D00"
    />
  </View> 
     
      
      {/* <Image source={{uri:'https://lh3.googleusercontent.com/pw/ACtC-3epo5BjyyKZ5tr5PB_FrDMjjoYGySAjwDrNLcVEaScbMb-RxaDxFMv2-4NceYevanaSBWqhDlrVdi167-JWLjuPtr0YuN50EOWFQlEPG2SgWiDSN4XSwaGXiA7qlNRp3x-1x6mUrq0f-oCdK3X6WDkM5A=w1264-h903-no?authuser=0'}} style={styles.img} ></Image> */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
   width:400,
   height:400,
   resizeMode:'stretch'
    
  },
  header:{
    //   height:300,
      padding:15,
      backgroundColor:'red',
      justifyContent:'center',
      alignItems:"center"
     
      

  },
  text:{
      color:'#fff',
      fontSize:23,
      textAlign:'center',
      paddingTop:20,
      fontFamily:'Roboto'

  },
  button:{
      width:300,
      padding:20,
      backgroundColor:'green',
      textAlign:'center',
      justifyContent:'center',
      alignItems:"center",
      marginTop:100,
      marginLeft:50

     
  },
  home:{
      //some sort of thing that will make the background look nice
  }

});
