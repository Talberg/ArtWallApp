import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text,Image, View , ImageBackground} from 'react-native';



export default function TextHolder(props) {


let image = {uri:'https://lh3.googleusercontent.com/pw/ACtC-3fwPRyDw9h2oDDLLN2txKIzBVVfBCC0EQAASL345oU64z9i5akfA12JjR6b-qMMpUDQsfzSFIRaSV7dJRgx5dDm1xOBIZ0Old251sTrzfT4MPUUyTJo5HnCx_-3RxZVxzXJGbMeNr_sTdko20mRm4wc4Q=w1262-h843-no?authuser=0'}

    if(props.rooms){
        let rooms = props.rooms
        let saveState = props.rooms.game[props.rooms.save]
        // console.log(saveState)
        return (
          <ImageBackground source={image} style={styles.header}>


            
                {/*  if PlayGame ===  */}
                {}
              <Text textShadowRadius={10} textShadowOffset={ {width: -1, height: 1} } textShadowColor= 'black' style={styles.text} >{saveState.dialog}
        
              </Text>
             
           </ImageBackground>


          );
    }

    return (

      <ImageBackground source={image} style={styles.header}>
       </ImageBackground>
           
         
       
      );
    

   

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
   height:400,
   resizeMode:'stretch'
    
  },
  header:{
    //   height:300,
      padding:15,
      backgroundColor:'red',
      justifyContent:'center',
      alignItems:"center",
      borderTopColor:'gray',
      borderTopWidth:5
     
      

  },
  text:{
      // color:'#485263',
      color:'white',
      fontSize:18,
      textAlign:'center',
      // shadowColor:'green',
      
      
      fontFamily:'Roboto'

  }
});
