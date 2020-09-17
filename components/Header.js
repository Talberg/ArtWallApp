import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text,Image, View } from 'react-native';



export default function Header(props) {

    // pass through the prop to set the game 
   
  return (
    <View onStartShouldSetResponder={
        props.game 
    } style={styles.header}>
      <Text style={styles.text} >Art Wall
      </Text>
      {/* <Image source={{uri:'https://lh3.googleusercontent.com/pw/ACtC-3c_J-6t4vfU0bXCS514LETfR7JqPo7ZVn3xwfP9riwAC5Kh3RfIcMukbzlG2XrUhgLZkCfv4EIiKitu9cwmwYwq1M7w_bGxpA2jTVXXpWgUgYeAYP155D3JzH8S0zkM1WwclzD9MPe0csvLhao8Pz9_ZA=w549-h823-no?authuser=0'}} style={styles.img} ></Image> */}
      <StatusBar style="auto" />
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
    width:100,
    height:100,
    
  },
  header:{
      height:60,
      padding:15,
      backgroundColor:'blue',
      paddingTop:40,
      

  },
  text:{
      color:'#fff',
      fontSize:23,
      textAlign:'center'

  }
});
