import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text,Image, View ,ImageBackground} from 'react-native';



export default function Header(props) {

  let image = {uri:'https://lh3.googleusercontent.com/pw/ACtC-3ceUYAVwFWe-Cq5gel7gh-MlSudrZe_PUaj8UJuUCAjO21TuiHBleuzrJftApEUpMFPd1DCS1eAumyy5v1882LgmTJQmJN7wtcNbIbpJUSgXCj3tsqwOeV28q1GdFzpg9iaJXZTQmy_72muvs4guHTgHA=s843-no?authuser=0'}

  if(props.rooms){
    let rooms= props.rooms
    let setRooms = props.setRooms
    let player= rooms.player
    let saveState = props.rooms.game[props.rooms.save]
    let save = saveState.next
    let InBackpack= rooms.save === "Backpack"
    let allThree = rooms.checkPoint.lizard&&rooms.checkPoint.sandWorm&&rooms.checkPoint.hole
    let image = {uri:'https://lh3.googleusercontent.com/pw/ACtC-3ceUYAVwFWe-Cq5gel7gh-MlSudrZe_PUaj8UJuUCAjO21TuiHBleuzrJftApEUpMFPd1DCS1eAumyy5v1882LgmTJQmJN7wtcNbIbpJUSgXCj3tsqwOeV28q1GdFzpg9iaJXZTQmy_72muvs4guHTgHA=s843-no?authuser=0'}
   function showBackpack(){
     
      setRooms({
          ...rooms,
          game:{
              ...rooms.game,
              Backpack:{
              dialog:'You open your backpack and you see:',
              backpack:[...player.bag],
              back:rooms.save,
              next:rooms.save
              }


          },
          save:'Backpack'
      })
  }


  
  if(InBackpack){

    return(
    
    
    
    
      <ImageBackground source={image} style={styles.header}>
      <View onStartShouldSetResponder={
          props.game 
      } >
        <Text style={styles.text} >Art Wall
        </Text>
       
      </View>
     
      </ImageBackground>)
  }
    console.log(InBackpack) 
 


  return (

    <ImageBackground source={image} style={styles.header}>
      
    
    
    <View onStartShouldSetResponder={
        props.game 
    } >
      <Text style={styles.text} >Art Wall
      </Text>
     
    </View>
    <View onStartShouldSetResponder={
        showBackpack
    } >
      <Text style={styles.text} >Backpack
      </Text>
     
    </View>
    
    </ImageBackground>
  );




  }

  return(
    <ImageBackground source={image} style={styles.header}>
    <View onStartShouldSetResponder={
        props.game 
    } >
      <Text style={styles.text} >Art Wall
      </Text>
     
    </View>
   
  </ImageBackground>
  )



 
    // pass through the prop to set the game 
   

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width:100,
    height:100,
    
  },
  header:{
      height:120,
      padding:15,
      backgroundColor:'blue',
      paddingTop:40,
      flexDirection:'row',
      justifyContent:'space-between',
      
      

  },
  text:{
      color:'black',
      fontSize:23,
      // textAlign:'center',
      paddingTop:20

  },
  Backpack:{
    
  },
  image:{}
});
