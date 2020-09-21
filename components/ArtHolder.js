import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text,Image, View } from 'react-native';



export default function ArtHolder(props) {
    if(props.rooms){
        let rooms = props.rooms
        let saveState = props.rooms.game[props.rooms.save]
        console.log(saveState)

        return (
            <View 
            // onStartShouldSetResponder={
            //     props.game 
            // }
             style={styles.header}
            >
              {/* <Text style={styles.text} >Image will go here
              </Text> */}
              <Image source={{uri:saveState.src}} style={styles.img} ></Image>
             
            </View>
          );
       
    }

    return (
        <View 
        // onStartShouldSetResponder={
        //     props.game 
        // }
         style={styles.header}
        >
          
        </View>
      );
    // let saveState = props.rooms.game[props.rooms.save]

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
   width:400,
   height:300,
   resizeMode:'stretch',
   
    
  },
  header:{
    //   height:300,
    // flex:3,
    //   padding:15,
      backgroundColor:'red',
      justifyContent:'center',
      alignItems:"center"
     
      

  },
  text:{
      color:'#fff',
      fontSize:20,
      textAlign:'center',
      paddingTop:20

  }
});
