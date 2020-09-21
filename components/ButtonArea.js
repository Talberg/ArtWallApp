import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList,List, ImageBackground } from 'react-native';
import ListItem from './ListItem'
import API from './API'





export default function ButtonArea(props) {
  let image= {uri:'https://lh3.googleusercontent.com/pw/ACtC-3dr-Kq-zYZGmwTa7Yjv-IPzjprdsWsl-wi-osEb3jGPVGSnHLmomGTnJaRr135LjbDJdwqtqSEnup1c2TZxUE3BL46rja-imLHXTjalk7kQapQrMPIf1RyP1aK5xeUQfXo67ymvzazO9iF4Ws8DCjUu_w=w1349-h843-no?authuser=0'}
  function Next(save) {
    props.setCurrent({
      ...props.rooms,
      save: save
    })


  }
 
  if (props.rooms) {

    let rooms = props.rooms
    let saveState = props.rooms.game[props.rooms.save]
    let save = saveState.next
    let setRooms = props.setCurrent
    let player = props.rooms.player
    // let saveState = props.rooms.game[props.rooms.save]
    // let save = saveState.next
    console.log(save)
    console.log(saveState)
    let enemy = rooms.enemies[saveState.enemy]
    let dialog = saveState.dialog
    let CurrentWeapon = rooms.weapons[player.weapon]
    let NewWeapon = rooms.weapons[saveState.weapon]
    let nextLevel = parseInt(player.level) + 1
    let nextLevelXp = rooms.levels[nextLevel].xp
    let nextLevelNew = rooms.levels[nextLevel].new
    let InBackpack = rooms.save === "Backpack"
    let items = rooms.items
    let allThree = rooms.checkPoint.lizard && rooms.checkPoint.sandWorm && rooms.checkPoint.hole
    function useItem(item) {
      console.log(item)
      let itemObj= items[item]
      console.log(itemObj)
      let type= itemObj.type
      let stat= itemObj.stat
      let mod = itemObj.mod
      let newBag =  [...player.bag]
      let NewBag = newBag.filter(items=>items !== item)
      console.log(newBag)
     
      
      if(type === 'weapon'){
          // weapon(item,player.weapon)
          console.log(NewBag)
          setRooms({
              ...rooms,
              player: {
                  ...player,
                  weapon: item,
                  bag:[...NewBag,player.weapon]
           
              },
              save: save
          })
      }
      if(type === 'potion'){
          // new gate that needs to ask 'stat' and 'mod',
          if(stat=== 'health'){
              //heal the 'mod' amount ######## could be dynamic easy
              let newHealth=  parseInt(player.health ) + parseInt(mod) 
              if(newHealth >= player.maxHP){
                  newHealth = player.maxHP
                  setRooms({
                      ...rooms,
                      player:{
                          ...player,
                          health:newHealth,
                          bag:NewBag
                      },
                      save:save

                  })
              }
              else{
                  setRooms({
                      ...rooms,
                      player:{
                          ...player,
                          health:newHealth,
                          bag:NewBag
                      },
                      save:save

                  })
              }

          }
      }
     
  }
    
    function levelUp(location) {
      //redirect to the level up screen. 
      console.log(rooms.save)
      
      setRooms({
          ...rooms,
          levels: {
              ...rooms.levels,
              [nextLevel]: {
                  xp: nextLevelXp,
                  new: false
              }
          },

          game: {
              ...rooms.game,
              LevelUP: {
                  ...rooms.game.LevelUP,
                  next: rooms.save
              }
          },
          save: 'LevelUP'


      })

  }
  function TraitUp(trait) {
    let traitLower = trait.toLowerCase()
    console.log(traitLower)
    let oldTrait = player[traitLower]
    console.log(oldTrait)
    let newTrait = oldTrait + 1
    console.log(newTrait)
    let oldHP = player.maxHP
    let newHP= parseInt (oldHP) +5
    console.log(newHP)
    
    
    // need to make the max health increase and use health as current health. 
    setRooms({
        ...rooms,
        player: {
            ...player,
            [traitLower]: newTrait,
            maxHP:newHP,
            health:newHP,
            level:nextLevel
        },
        save: save
    })

}
  function Next(save) {
    props.setCurrent({
      ...props.rooms,
      save: save
    })


  }
 function movement(place) {
    // set the location of the 
    console.log(place[0])
    let split = place.split(' ')
    let join = split.join('')


    props.setCurrent(
      {
        ...rooms, save: join
      }
    )
  }
 function movementEnter(place) {
    // set the location of the 
    console.log(place[0])
    // let split = place.split(' ')
    // let join = split.join('')


    props.setCurrent(
      {
        ...rooms, save: place[0]
      }
    )
  }
  function button(buttonValue) {
    function roll() {
        return Math.floor(Math.random() * Math.floor(21));
    }

 
    let split = buttonValue.split(' ')
    console.log(split[0])
    let join = split.join('')
    console.log(join)
    console.log(props.game)




    let rollvalue = parseInt(roll())
    console.log(rollvalue)

    console.log(rollvalue)
    let action = API[join](rollvalue)
    console.log(action)
    // console.log(props.game[action])
    // change rooms here **************************************************************************

    if (split[0] === 'Attack') {
        let newRoll = roll() + parseInt(player.strength)
        console.log('attack mod')
        setRooms({ ...rooms, save: action })
    }
    if (split[0] === 'Run') {
        let newRoll = roll() + parseInt(player.strength)
        console.log('attack mod')
        setRooms({ ...rooms, save: action })
    }
    if (split[0] === 'Move') {
        let newRoll = roll() + parseInt(player.strength)
        console.log('attack mod')
        setRooms({ ...rooms, save: action })
    }
    if (split[0] === 'Ask') {
        let newRoll = roll() + parseInt(player.speech)
        console.log('speech')
        setRooms({ ...rooms, save: action })
    }
    if (split[0] === 'Sneak') {
        let newRoll = roll() + parseInt(player.sneak)
        console.log('attack mod')
        setRooms({ ...rooms, save: action, lastRoll: newRoll })
    }
    else {
        setRooms({
            ...rooms, save: action
        })
    }

}
function pickup(item) {
  setRooms({
      ...rooms,
      save: save,
      player: {
          ...player, bag: [...player.bag, item]
      }

  })
}
function AttackEnemy(nope) {
  let playerRoll = 11
  // roll(21)+parseInt(CurrentWeapon.Attack)
  if (playerRoll > enemy.attackMin) {
      // add the weapon damage and then the attack of the player.
      let damage = parseInt(player.strength) + parseInt(CurrentWeapon.Attack)
      console.log(damage)
      let EnemyNewHealth = parseInt(enemy.health) - damage
      console.log(EnemyNewHealth)
      setRooms({
          ...rooms,
          enemies: {
              ...rooms.enemies,
              [saveState.enemy]: {
                  ...enemy,
                  health: EnemyNewHealth
              }
          },
          game: {
              ...rooms.game,
              AttackEnemySucc: {

                  dialog: ` Your attack lands and ${enemy.name} Takes ${damage} `,
                  next: saveState.enemy,

              }
          },
          save: 'AttackEnemySucc',

      })



  }
  else {

      // route to the AttackEnemyFail that then does the damage from there
      setRooms({
          ...rooms,

          game: {
              ...rooms.game,
              AttackEnemyFail: {
                  damage: enemy.damage,
                  dialog: ` Your attack fails and ${enemy.name} lands an attack on you for ${enemy.damage} `,
                  next: saveState.enemy
              }
          },
          save: 'AttackEnemyFail',

      })

  }

  console.log(playerRoll)
  //if the roll is greatere than the cap, then do damage of the sword 


}
function RunFromEnemy() {
  let playerRoll = 16
  // roll(21)+parseInt(player.speed)
  if (playerRoll > 15) {
      setRooms({
          ...rooms,
          enemies: {
              ...rooms.enemies,
              [saveState.enemy]: {
                  ...enemy,
                  health: 0
              }
          }
          ,

          game: {
              ...rooms.game,
              RunFromEnemySucc: {

                  dialog: ` You are fast enough to out run ${enemy.name}  `,
                  next: saveState.enemy,


              }
          },
          save: 'RunFromEnemySucc',

      })
  }
  else {
      setRooms({
          ...rooms,

          game: {
              ...rooms.game,
              RunFromEnemyFail: {
                  damage: enemy.damage,
                  dialog: ` Your run fails and ${enemy.name} lands an attack on you for ${enemy.damage} `,
                  next: saveState.enemy
              }
          },
          save: 'RunFromEnemyFail',

      })
  }


}
function checkpoint() {
  console.log(save)
  setRooms({
      ...rooms, checkPoint: { ...rooms.checkPoint, [saveState.checkpointReached]: true }, save: save
  })
}
function damage(damage) {
  // change the health value on the 
  let newHealth = parseInt(player.health) - parseInt(damage)
  console.log(Object.keys(saveState))
  setRooms({
      ...rooms, save: save,
      player: {
          ...player, health: newHealth
      },

  })


}

    console.log(saveState.back)
    console.log(saveState.back)
    console.log(saveState.back)
    console.log(saveState.back)
    console.log(saveState.back)
    console.log(saveState.back)
    { }


    // {saveState.back ?        <ListItem  name='back' saveState={saveState}  Next={movement}  > </ListItem>
    // : <View><Text>Fail</Text></View>}
//  if (saveState.back) {
//       if (saveState.next) {
//         return (
//           <View

//             style={styles.headers}
//           >
            
            
//             <ListItem value={saveState.back} name='Back' saveState={saveState} Next={Next}  ></ListItem>
            



//           </View>

//         )
//       }


//     }
  if(saveState.back){
    if(saveState.backpack){
      return(
      <View>
        <ImageBackground style={styles.header} source={image}>
          <View>
      <FlatList
        data={saveState.backpack}
        renderItem={({item})=><ListItem name={item} value={item} Next={useItem} item={item} ></ListItem>}
        
        ></FlatList>
<ListItem name='Back' value={saveState.back} Next={movement}></ListItem></View>

</ImageBackground>

        </View>)
    }
      // LEVEL UP GATE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(player.xp>= nextLevelXp &&nextLevelNew){
        return(
        
          <ImageBackground style={styles.header} source={image}>
        <View>
          <ListItem value={rooms.save} name='Level Up' saveState={saveState} Next={levelUp}  > </ListItem>
          
          </View></ImageBackground>
        )
      }
      //LEVEL GATE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(saveState.level){
        // use the flat list here 
       return(
        <ImageBackground style={styles.header} source={image}>
       
       <FlatList
        data={saveState.level}
        renderItem={({item})=><ListItem name={item} value={item} Next={TraitUp} item={item} ></ListItem>}
        ></FlatList>
        </ImageBackground>)
        
  
       
      }
      // BACK GATE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(rooms.checkPoint[saveState.checkpoint] === true){
        console.log(rooms.checkPoint)
        return(<ImageBackground style={styles.header} source={image}>
          <View>
          <ListItem name={saveState.enter} value={saveState.enter} Next={movementEnter} />
          <ListItem name='Back' value={saveState.back} Next={movement}></ListItem></View></ImageBackground>
        )
      }
      // Movement Gate ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(saveState.movement){
        return(<ImageBackground style={styles.header} source={image}>
          <FlatList
          data={saveState.movement}
          renderItem={({item})=><ListItem name={item} value={item} Next={movement} item={item} ></ListItem>}
          /></ImageBackground>
        )
      } 
      
      //Choice Gate///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(saveState.choice){
        return(<ImageBackground style={styles.header} source={image}>
        <View>
        
        <FlatList
          data={saveState.choice}
          renderItem={({item})=><ListItem name={item} value={item} Next={button} item={item} ></ListItem>}
          
        />
        <ListItem name='Back' value={saveState.back} Next={movement}></ListItem>
        </View></ImageBackground>)
      }
      //Item Gate////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(saveState.item){
        return(<ImageBackground style={styles.header} source={image}>
          <ListItem name={saveState.item} value={saveState.item} Next={pickup} ></ListItem></ImageBackground>
        )
      }
      if(saveState.enemy && rooms.enemies[saveState.enemy].health > 0){
        return(
          <ImageBackground style={styles.header} source={image}>
          <View>
            <ListItem
            name='Attack Enemy'
            Next={AttackEnemy}
  
            />
            <ListItem
            name='Run From Enemy'
            Next={RunFromEnemy}
  
            />
          </View></ImageBackground>
        )
      }
      if(saveState.checkpointReached){
        return(<ImageBackground style={styles.header} source={image}>
          <ListItem name="Checkpoint Reached!" Next={checkpoint} /></ImageBackground>
        )
      }
      if(saveState.damage){
  
        return(
          <ImageBackground style={styles.header} source={image}><ListItem name='You Take Damage' value={saveState.damage} Next={damage}/></ImageBackground> )
       
      }
  }

//Backpack gate //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(saveState.backpack){
    return(
      <ImageBackground style={styles.header} source={image}>
    <FlatList
      data={saveState.backpack}
      renderItem={({item})=><ListItem name={item} value={item} Next={useItem} item={item} ></ListItem>}
      ></FlatList></ImageBackground>)
  }
    // LEVEL UP GATE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(player.xp>= nextLevelXp &&nextLevelNew){
      return(<ImageBackground style={styles.header} source={image}>
        <ListItem value={rooms.save} name='Level Up' saveState={saveState} Next={levelUp}  > </ListItem></ImageBackground>
      )
    }
    //LEVEL GATE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(saveState.level){
      // use the flat list here 
     return(
      <ImageBackground style={styles.header} source={image}><FlatList
      data={saveState.level}
      renderItem={({item})=><ListItem name={item} value={item} Next={TraitUp} item={item} ></ListItem>}
      ></FlatList></ImageBackground>)
      

     
    }
    // BACK GATE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(rooms.checkPoint[saveState.checkpoint] === true){
      console.log(rooms.checkPoint)
      return(<ImageBackground style={styles.header} source={image}>
        <ListItem name={saveState.enter} value={saveState.enter} Next={movementEnter} /></ImageBackground>
      )
    }
    // Movement Gate ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(saveState.movement){
      return(<ImageBackground style={styles.header} source={image}>
        <FlatList
        data={saveState.movement}
        renderItem={({item})=><ListItem name={item} value={item} Next={movement} item={item} ></ListItem>}
        /></ImageBackground>
      )
    } 
    
    //Choice Gate///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(saveState.choice){
      return(<ImageBackground style={styles.header} source={image}>
      <FlatList
        data={saveState.choice}
        renderItem={({item})=><ListItem name={item} value={item} Next={button} item={item} ></ListItem>}

      /></ImageBackground>)
    }
    //Item Gate////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(saveState.item){
      return(<ImageBackground style={styles.header} source={image}>
        <ListItem name={saveState.item} value={saveState.item} Next={pickup} ></ListItem></ImageBackground>
      )
    }
    if(saveState.enemy && rooms.enemies[saveState.enemy].health > 0){
      return(<ImageBackground style={styles.header} source={image}>
        <View>
          <ListItem
          name='Attack Enemy'
          Next={AttackEnemy}

          />
          <ListItem
          name='Run From Enemy'
          Next={RunFromEnemy}

          />
        </View></ImageBackground>
      )
    }
    if(saveState.checkpointReached){
      return(
        <ListItem name="Checkpoint Reached!" Next={checkpoint} />
      )
    }
    if(saveState.damage){

      return( <ListItem name='You Take Damage' value={saveState.damage} Next={damage}/>)
     
    }
   
    
    else {
      return (
        <ImageBackground style={styles.header} source={image}>
        <View

          
        >
          

<ListItem value={saveState.next} name='Next' saveState={saveState} Next={Next}  > </ListItem>

        </View></ImageBackground>

      )
    }

    //NEXT GATE


    // this is where the cascade of if statments will be put to gate the items


  }
  return (
    <View

      style={styles.header}
    >
    <Text>nope</Text>



    </View>

  )



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
  img: {
    width: 400,
    height: 300,
    resizeMode: 'stretch',


  },
  headers: {
    height: 300,
    flex: 1,
    //   padding:15,
    //   backgroundColor:'',
   
    alignItems: "center"



  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 20

  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',


  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 400

  },
  listItemText: {
    fontSize: 18,
    alignItems: 'center',
  },
  header:{
    height:400,
    // padding:15,
    // backgroundColor:'blue',
    // paddingTop:40,
    // flexDirection:'row',
    // justifyContent:'space-between',
    width:500
    
    

},
});
