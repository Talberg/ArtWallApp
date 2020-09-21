
import React , {useState} from 'react';
import { StyleSheet, Text,Image, View, TouchableOpacity, ImageBackground } from 'react-native';

// this is where the logic for all the choices will be. 


export default function ListItem(props) {
  let image = {uri:'https://lh3.googleusercontent.com/pw/ACtC-3ctr-GM0c6Mo6ixWYb0Hbq9iKY2gqOnzXvLHu4gKtZxebhybEIbUBmoXOs7DYn-3MpjRAEHkqNmbb3PHBhUscYxY6aEgEbBNMs-0rRnQdJNkzXShOHkW9QFB7dbPCJbgyU2WfTvEC9vVwmmFXogoEKmAw=w1273-h843-no?authuser=0'}
   console.log(props.value)
  return (
    <ImageBackground source={image} style={styles.listItem}>
    <TouchableOpacity  onPress={   ()=>{props.Next(props.value)}} >
        <View style={styles.listItemView} >
  <Text style={styles.listItemText} >{props.name}</Text>
      </View>
      
    
    </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  listItem:{
      padding:15,
      backgroundColor:'#f8f8f8',
      // borderBottomWidth:1,
      borderColor:'#eee',


  },
  listItemView:{
  // flexDirection:'row',
// justifyContent:'space-between',
// alignItems:'center',
paddingLeft:20,
width:400,


},
listItemText:{
    fontSize:18,
    alignItems:'center',
    color:'white'
},
header:{}
});
