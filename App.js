import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './components/Header'
import ArtHolder from './components/ArtHolder'
import TextHolder from './components/TextHolder'
import Home from './components/Home'
import ButtonArea from './components/ButtonArea'

export default function App() {
  const Game = {
    levels:{
        2:{xp:10,
            new:true},
        3:{xp:20,
            new:true},
        4:{xp:30,
            new:true},
        5:{xp:40,
            new:true},
        6:{xp:50,
            new:true},
       

    },
    
    player:{
        sneak:1,
        speed:1,
        strength:1,
        speech:1,
        health:20,
        magic:1,
        MP:10,
        bag:['HealthPotion5'],
        spells:[],
        level:1,
        weapon:'Stick',
        body:false,
        head:false,
        location:'BeachHub1',
        xp:10,
        maxHP:20,
        maxMP:10
    },
    spells:{

    },
    weapons:{
        Sword:{
            Name:'Sword',
            Attack:3,
            Magic:1,
            
        },
        Stick:{
            Name:'Stick',
            Attack:1,
            Magic:1
        }
    },
    enemies:{
        SandWorm:{
            name:'Sand Worm',
            health:10,
            attackMin:10,
            damage:2,
            checkpoint:'ShrineCheckpoint',
            xp:10
                    }
    },
    heads:{
        CoconutHat:{

        }
    },
    bodies:{
        CoconutBra:{
            

        }
    },
    items:{
        Stick:{
            type:'weapon',
            Attack:1,
            Magic:1,
                },
        Sword:{
            type:'weapon',
            Attack:3,
            Magic:1,
        },
        HealthPotion5:{
            type:'potion',
            stat:'health',
            mod:5
        },
        Bark:{
            type:'craft',

        },
        RainbowBerries:{
            type:'mainQuest',
        },
        SpiderWeb:{
            type:'craft'
        },
        Vine:{
            type:'craft'
        }



    }
    ,



    game:{

      
        
           
     
        intro:{
            where:'firstShore',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3dfJZYZnz7XeVpPJwi1x9Mrfp6l7J_tFGZCSZ_IivSlcc4nND8tJQU8i1KKoin5dGJdazl95q-sinIcmV58_1plN0K39tLjc2NnpDPiMFE8iosLT8d6xnHz1cg5lVcN0PSPYyRedqRoD3408xNYRXyaVA=w959-h685-no?authuser=0",
            dialog:"You wake up to the waves crashing around you. Blue as far as the eye can see. You sit upon small rock formation that looks like it was built rather than sculpted by the ocean. You climb atop the rocks and can barley make out an island on the horizon. ",
            back:['intro2'],
            next:'intro2'
            

        },
        intro2:{
            where:'firstShore',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3dfJZYZnz7XeVpPJwi1x9Mrfp6l7J_tFGZCSZ_IivSlcc4nND8tJQU8i1KKoin5dGJdazl95q-sinIcmV58_1plN0K39tLjc2NnpDPiMFE8iosLT8d6xnHz1cg5lVcN0PSPYyRedqRoD3408xNYRXyaVA=w959-h685-no?authuser=0",
            dialog:"There is a rowboat tied up to a rock. With nothing to lose you climb in and start the rowing towards the island in the distance. ",
            
            next:['island'

 ]       },
      
        island:{
            src:'https://lh3.googleusercontent.com/pw/ACtC-3e9KoBxiAyts-RdmZ_AWQ0VQDtKpIWdzi6wCpvwqTS2f3fSemYvcSHVUWuGQo4TWGb_qkfeReEzBVjehkc0UCO6A6BnDkiTjnTCLBFWV6yHU8SwRRg_nndKKu9CKgVFPJNvrHVH29Gri8SlUGAvMLgLxA=w959-h724-no?authuser=0',
            dialog:'After rowing for an hour or so you are about 100 yards from the island, you keep thinking you see a flash coming from the island out of the corner of your eye but every time you look nothing is there. The water has become to shallow for your boat so you will have to wade to the beach.',
            next:['owl'
     ]   },
        owl:{
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fQejAEsd-3jxGm5HwDi5mNJ5i51n6U1Vxk_e_aPhPWRuyB6b7nw92i7-8hpKqHqf5gHxluXopaGgHW5Amg8QGvtulln0HetapQReT_8-LmafRPtp5sTe7P9aeis3t7pA7OwFy5VVPMrkCTz1dgRcLQrw=w574-h744-no?authuser=0',
            dialog:'Soaking wet and exhausted you collapsed on the sand with releif. Just as you start to nod off the flash is there again!  Startled you sit up and finally see the source of the light. An Owl. ',
            next:['owlIntro'
]
        },
        owlIntro:{
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fQejAEsd-3jxGm5HwDi5mNJ5i51n6U1Vxk_e_aPhPWRuyB6b7nw92i7-8hpKqHqf5gHxluXopaGgHW5Amg8QGvtulln0HetapQReT_8-LmafRPtp5sTe7P9aeis3t7pA7OwFy5VVPMrkCTz1dgRcLQrw=w574-h744-no?authuser=0',
            dialog: 'In your head you hear, "Welcome to the Distant Temple, please dont be alarmed,I am here to help you. You are going to have to help me in order to help yourself though."',
            next:['owlIntro2'] 
        },
        owlIntro2:{
            src: 'https://lh3.googleusercontent.com/pw/ACtC-3fQejAEsd-3jxGm5HwDi5mNJ5i51n6U1Vxk_e_aPhPWRuyB6b7nw92i7-8hpKqHqf5gHxluXopaGgHW5Amg8QGvtulln0HetapQReT_8-LmafRPtp5sTe7P9aeis3t7pA7OwFy5VVPMrkCTz1dgRcLQrw=w574-h744-no?authuser=0',
            dialog:'So I need 3 things from you. There is a cave to your left that was recently sealed off by a over grown vines, and in there is the ONLY place that my favorite berry grows. Forward there is a long path that will lead you to a friend of mine that is holding a ring for me, do be warned he does bite sometimes.',
            next:['owlIntro3'] 
        },
        owlIntro3:{
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fQejAEsd-3jxGm5HwDi5mNJ5i51n6U1Vxk_e_aPhPWRuyB6b7nw92i7-8hpKqHqf5gHxluXopaGgHW5Amg8QGvtulln0HetapQReT_8-LmafRPtp5sTe7P9aeis3t7pA7OwFy5VVPMrkCTz1dgRcLQrw=w574-h744-no?authuser=0',
            dialog:'To the right along the beach are sleeping rocks, if you wake them up it will not be pretty. But there is an old sword on a shrine that you will need before I can get you off this Island.',
            next:['boatGone'
]        }, 
        boatGone:{
            src:'https://lh3.googleusercontent.com/pw/ACtC-3c7MTlETsNmplpYJbIwy-TE_iC5l5Pl3QqaTorvkIF2w0rBj8hCULMMd1qQgwLUj-l5dbu1rzsVXS0fIFq2ptZg6hUGmq-H74z-IorWkVgsHbQUT--7x_USgZHuN96cQJMS08aB37cxYbbFCq0kK9ZMvg=w893-h638-no?authuser=0',
            dialog:'Oh also your boat seems to have left you, and on its way back home. Such a good boat...',
            next:['BeachHub1']
        },
        BeachHub1:{
            // here is where the quest area should propogate with the current quests. Should be a "hub area that you can go to each place and put in a save state here also"
            movement:['Cave','Rocks','Jungle'],
            dialog:'Where are you going?',
            dialog2:'"Put the sword in the hole in the Obelisk if you want to leave the island." Like you have nothing to lose you thrust the sword into the obolisk! As soon as the steel vanishes into the stone a bolt of lightning strikes the Obolisk, everything goes black',
            enter:['Obelisk'],
            checkpoint:"allThree",
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fCANhDUZm_2KT9Zt00xr4OmHLTGzh7cw3UpW3WpEOsuATROfTVQwe_pcx1Yn9BEns63oTs1mFdpYqHtLGi-FQwAcQQuWNfVAJ4O3_t6Owe351-7Wtj2NM4WMeycsTtcjZTMhqQuf4MxMEtXx8oLSsXEg=w1264-h903-no?authuser=0'
        
        },
        Cave:{
            checkpoint:'vines',
            choice:['Attack Vines','Move Vines'],
            dialog:'A large log blocks the entrance to the cave, what would you like to do?',
            enter:['InsideCave'],
            back:'BeachHub1',
            dialog2:'The log is now out of the way, cool air rushes past you from the mouth of the cave. Go in or back? ',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3cb2Xk1xgqhnVeJlcyM1wW13AbL8FV0I-wmvhfSqJqUPWb9ng7JF5OtFPmDAsH15S4Ux0nngsVaZjPCDmtmGFnXfnCpAZA3z8r5ZoixTu4AZJHJi-ftKkgnEy9YrM78oDQOYXlpAwgq0EKVuRYeTmH-og=w603-h903-no?authuser=0"
            

            
        },
        VinesBreak:{
            item:'Vine',
            src:'cave bark',
            dialog:'You break the vines down and pick up a vine.',
            next:['Checkpoint'],
            

        }, 
        VineAttackFail:{
            damage:2,
            dialog:'You lose health, be carful!',
            next:['Cave'],
            
            

        },
        Checkpoint:{
            checkpointReached:'vines',
            dialog:"You have Cleared the Vines!",
            next:['Cave']


        },
        InsideCave:{
            dialog:'You walk into the cave, water drips from stalagmites. Under each Stalagmite is a bush dotted with rainbow colored berries. Each bush also has a small lizard sleeping in front of it. All you can make out is the size of each lizard. All are different sizes ranging from a few inches to about a foot long. Which Lizard"s bush would you like to choose? ',
            movement:['Small Lizard','Medium With 2 Tails','Large no tail'],
            back:'Cave',
            checkpoint:'lizard',
            dialog2:'The lizards and the bushes seem to have turned into stalagmite versions of themselves...  ',
            enter:['BeachHub1'],
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"
        },
        SmallLizard:{
            choice:['Sneak Past Lizard', 'Attack on the lizard'],
            dialog:'There is a small lizard curled up, Would you rather step on the lizard or sneak past?',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"


        },
        MediumWith2Tails:{
            choice:['Sneak Past Lizard','Attack on the lizard'],
            dialog:'There is a medium sized lizard with 2 tails. What do you do?',         
               src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"

        },
        Largenotail:{
            choice:['Sneak Past Lizard','Attack on the lizard'],
            dialog:'The largest lizard has no tail and is snoring load. What do you do?',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"


        },
        LizardSneakSucc:{
            dialog:'You sneak past the sleeping lizard and pick one berry of each color. Without making a sound you sneak back out side the cave',
            next:['LizardCheckpoint'],
            item:'RainbowBerries',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"


            


        },
        LizardAttackSucc:{
            dialog:'You crush the lizard Under your boot',
            next:['LizardCheckpoint'],
            item:'RainbowBerries',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"

            


        },
        LizardFail:{
            dialog:'The lizard bites you but not before you grab the berries',
            next:['LizardCheckpoint'],
            item:'RainbowBerries',
            damage:'2',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"

        },
        LizardCheckpoint:{
            dialog:'Checkpoint Reached!',
            next:['InsideCave'],
            checkpointReached:'lizard',
            src:"https://lh3.googleusercontent.com/pw/ACtC-3df4kK_gvhlXUc7pNk8IJCyv2agIBO2MIx8_ewZjcZj7fLFjKkcmMSkus6N72Hs7-eUwtjpqDsGWOLB4yCwSl_Ugmln0ATlSjhxoJGfn_P0S7qexL-jmpK-FZK_9QVYFMdWHr_60CWOmR7ozU3FaGz5UQ=w1180-h843-no?authuser=0"

        },
        Jungle:{
             dialog:'The path through the jungle is thick with vegitation. Deeper and Deeper into the jungle you go hoping that the Owl"s friend is easy to spot...',
             next:['DeepJungle'],
             back:['BeachHub1'],
             src:'https://lh3.googleusercontent.com/pw/ACtC-3cwkswXWRiFaaAWScbcN-yiFKm2gCFNhYon5ER3WJFvS7FmTZgyAD6mDvefkVCIjH-aNO_mfQ9bVL5TkwHE_S2ArA8o2q0i_E5kbOYCoZZcMt7dowFVLdeg5LeP06XXOZhKHXpy5LFVYGxAkR22wfsFnA=w959-h640-no?authuser=0'
             
        },
        DeepJungle:{
            dialog:'Spiderwebs block your path. There is a sign on the other side of the webs but you cant read it from here. What will you do?',
            choice:['Sneak Past The Webs','Attack The Webs'],
            back:['Jungle'],
            checkpoint:'spider',
            dialog2:'The webs seem to have just disintegrated, your path is clear.',
            enter:["Sign"],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3cwkswXWRiFaaAWScbcN-yiFKm2gCFNhYon5ER3WJFvS7FmTZgyAD6mDvefkVCIjH-aNO_mfQ9bVL5TkwHE_S2ArA8o2q0i_E5kbOYCoZZcMt7dowFVLdeg5LeP06XXOZhKHXpy5LFVYGxAkR22wfsFnA=w959-h640-no?authuser=0'

        },
        SpiderSneakSucc:{
            dialog:'You carefully  sneak past the webs',
            next:['SpiderWeb'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3ebcRzcrCM1f7bKf-rz4m-YzINd-WVZ6ejGed-42GYJZ7uteK3O3o5kO7IxvTfJ-WDdYeb1EyguuAW55un_itQSg201gcxKYg2v-IGBZq2N9WTYxZRyFhnYJXCKogW7N5nbw2XWCy-BDclV88jFo1jSWg=w959-h640-no?authuser=0'
            

            
        },
        SpiderSneakFail:{
            dialog:'You brush the webs with your shoulder, thousands of spiders stream down the web! You run but not fast enough! You are bitten!',
            damage:4,
            next:["SpiderWeb"],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3cwkswXWRiFaaAWScbcN-yiFKm2gCFNhYon5ER3WJFvS7FmTZgyAD6mDvefkVCIjH-aNO_mfQ9bVL5TkwHE_S2ArA8o2q0i_E5kbOYCoZZcMt7dowFVLdeg5LeP06XXOZhKHXpy5LFVYGxAkR22wfsFnA=w959-h640-no?authuser=0'
        },
        SpiderWeb:{
            dialog:'You pocket some of the rope like webs',
            item:'Spiderweb',
            next:['SpiderCheckpoint'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3ebcRzcrCM1f7bKf-rz4m-YzINd-WVZ6ejGed-42GYJZ7uteK3O3o5kO7IxvTfJ-WDdYeb1EyguuAW55un_itQSg201gcxKYg2v-IGBZq2N9WTYxZRyFhnYJXCKogW7N5nbw2XWCy-BDclV88jFo1jSWg=w959-h640-no?authuser=0'

        },
        SpiderCheckpoint:{
            dialog:'Spider Checkpoint reached',
            checkpointReached:'spider',
            next:['Sign'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3ebcRzcrCM1f7bKf-rz4m-YzINd-WVZ6ejGed-42GYJZ7uteK3O3o5kO7IxvTfJ-WDdYeb1EyguuAW55un_itQSg201gcxKYg2v-IGBZq2N9WTYxZRyFhnYJXCKogW7N5nbw2XWCy-BDclV88jFo1jSWg=w959-h640-no?authuser=0'
        },
        MoveVinesSucc:{
            dialog:'You move the log out of your path.',
            next:['LogCheckpoint'],
            item:"Grub",

        },
        MoveVinesFail:{
            dialog:'You try hard to move the log but you only pick up a few inches then drop it on your toe! Take 2 Damage',
            damage:2,
            next:['Cave']
        },
        Sign:{
            dialog:'Sign Reads: "Welcome, I am Home". It is places next to a shallow hole. ',
            next:['Hole'],
            src:"https://lh3.googleusercontent.com/pw/ACtC-3eyn2CZ7YgMeGi7H4FgIqyEKXBwWYGRMcaU0PUQQLfJPj6O_iJf4jymxIpV8K6MW-dEvxTeSQ5sUux_lJoWF1NdAqbtRVQlHTGKlsMlf8MTg0JzI2yfQBuylmSDv29dWAxFoQvjs-SM5QIxASRIrY_yaQ=w633-h843-no?authuser=0"
        },
        Hole:{
            dialog:'At the bottom of the hole, a snake is curled and ready to strike. "Welcome to my home! I bet that Owl sent you to take my ring." as the snake uncoils you catch a the shine of gold at the tip of its tail. What will you do?  "',
            give:'Grub',
            choice:['Attack the Snake', 'Ask Snake for the Ring'],
            checkpoint:'hole',
            dialog2:'Would you like to Help the poor guy?',
            enter:['Help The Snake'],
            back:['BeachHub1'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

        },
        AttackSnakeSucc:{
            dialog:'You jump down on to the snake and grab the ring before the snake can react you are out of the hole, ring in hand!',

            next:['Ring'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'
        },
        AttackSnakeFail:{
            dialog:'You jump in the hole but the snake moves, you grab the ring, but before you leave the hole the snake bites you! Take 4 Damage! ',
            damage:4,
            next:["Ring"],           
             src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

        },
        AskSnakeSucc:{
            dialog:'You ask the snake nicely for the Owl ring. After a second the answer is clear as the snake moves off of the ring. "Okay, take it, no use to me anyways!" You pick up the Ring',
            next:['Ring'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

        },
        AskSnakeFail:{  
            dialog:'"FIGHT ME FOR IT!',
            choice:['Attack the Snake'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

            

        },
        Ring:{
            dialog:'You pocket the Gold ring with a blue stone',
            item:'Ring',
            next:['HoleCheckpoint'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

        },
        HoleCheckpoint:{
            dialog:'As you leave the hole it collapses around the snake, you can hear muffled screams coming from the ruble',
            checkpointReached:'hole',
            next:['Hole'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

        },
        HelpTheSnake:{
            dialog:'You cant help....',
            back:['Hole'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3fJrbhTlFohyPqs0DLlxGSbiedIP81jqHkXXYD8eJAjBk2gn5G4-4WvNzSHz0i3l8yydar4ZbnA0iUR-7_e_VA2tWXP38cqZORsOrhjh8BWTDpkbNoBs_Au6ZdfQnzy9eLW6swv67VqCjHuDsTP7UcpWw=w563-h843-no?authuser=0'

        },
        AttackWebSucc:{
            dialog:'You run so fast through the webs that the spiders dont have time to bite you.',
            next:['SpiderWeb'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3ebcRzcrCM1f7bKf-rz4m-YzINd-WVZ6ejGed-42GYJZ7uteK3O3o5kO7IxvTfJ-WDdYeb1EyguuAW55un_itQSg201gcxKYg2v-IGBZq2N9WTYxZRyFhnYJXCKogW7N5nbw2XWCy-BDclV88jFo1jSWg=w959-h640-no?authuser=0'
        },
        AttackWebFail:{
            dialog:'You are to slow, the spiders rush you, biting your exposed skin! Take 4 damage',
            damage:4,
            next:['SpiderWeb'],
            src:'https://lh3.googleusercontent.com/pw/ACtC-3ebcRzcrCM1f7bKf-rz4m-YzINd-WVZ6ejGed-42GYJZ7uteK3O3o5kO7IxvTfJ-WDdYeb1EyguuAW55un_itQSg201gcxKYg2v-IGBZq2N9WTYxZRyFhnYJXCKogW7N5nbw2XWCy-BDclV88jFo1jSWg=w959-h640-no?authuser=0'
        },
        Rocks:{
            dialog:"The boulders move up and down. You can feel warm air coming from under them. The only passage is through 2 of them. What would you like to do?",
            choice:['Run Through The Rocks','Sneak Though The Rocks', 'Ask Rock For Safe Passage'],
            dialog2: 'The rocks know you are not a threat so they let you pass',
            back:'BeachHub1',
            checkpoint:'rock',
            enter:['BehindRocks']
        },
        RunRockSucc:{
            dialog:'Sprinting as fast as you can you move past the rocks before they can close the passageway',
            next:['BehindRocks']
        },
        RunRockFail:{
            dialog:'You run face first into the boulders. They seem to chuckle as you collect yourself. Take 3 damage',
            next:['Rocks'],
            damage:3


        },
        SneakRockSucc:{
            dialog:"You walk past the rocks and they never knew you were there....",
            next:['BehindRocks']

        },
        SneakRockFail:{
            dialog:'The boulders close the passage as you approach it....',
            next:['Rocks']
        },
        AskRock:{
            dialog:"Sure thing! Thank you for asking nicely! RockPoint reached!",
            checkpointReached:'rock',
            next:['BehindRocks']
        },
        BehindRocks:{
            dialog:'You can make out a small shrine at the edge of the Jungle. You walk to the shrine.',
            next:['Shrine']
        },
        Shrine:{
            dialog:'Carved stone with characters you have never seen before on it. Laying on the shrine is the sword that the Owl told you about.',
            next:'Sword',
            checkpoint:'sandWorm',
            dialog2:'Only a pile of sand remains...',
            enter:['BeachHub1']


        },
        Sword:{
            dialog:'This old sword has seen better days but is still sharp. You nik your finger with the blade. A small drop of blood lands on the sand',
            item:'Sword', 
            next:['SandWorm']
        },
        ShrineCheckpoint:{
            dialog:'The worms flesh turns to sand, it lands and bursts into a small pile of sand...',
            checkpointReached:'sandWorm',
            next:['Shrine']
        },
        SandWorm:{
            dialog:'A large worm burst from the sand where your blood dropped onto the sand. You must fight him to get back to get back to the path or try to make a run for it.  ',
            enemy:'SandWorm',
            next:['ShrineCheckpoint'],
        
        },
        LevelUP:{
            dialog:'WOW you leveled up! Please select a trait to increase by 1. You also get 5 extra Hp on every level',
            level:['Speed',"Strength",'Magic'],
            levelBack:['BeachHub1']

        },
     











      

    },
    save:'intro',
    checkPoint:{
        log:false,
        lizard:false,
        spider:false,
        rock:false,
        shrine:false,
      
        hole:false
    }
  

}
  const [game,setGame] = useState()
  const [CurrentGame,setCurrent] = useState()
  const [Master,setMaster] = useState()
  const [PlayGame,setPlay] = useState()


  

//   let setRooms = setGame
//     let rooms = game
//     let player = rooms.player
//     let saveState = rooms.game[rooms.save]
//     let save = saveState.next
//     console.log(save)
//     console.log(saveState)
//     let enemy = rooms.enemies[saveState.enemy]
//     let dialog = saveState.dialog
//     let CurrentWeapon = rooms.weapons[player.weapon]
//     let NewWeapon = rooms.weapons[saveState.weapon]
//     let nextLevel = parseInt(player.level) + 1
//     let nextLevelXp = rooms.levels[nextLevel].xp
//     let nextLevelNew = rooms.levels[nextLevel].new
//     let InBackpack = rooms.save === "Backpack"
//     let items = rooms.items
//     let allThree = rooms.checkPoint.lizard&&rooms.checkPoint.sandWorm&&rooms.checkPoint.hole





  
  useEffect(()=>{
      console.log('Current Game Changed')
    SaveCurrent(CurrentGame)
  },[PlayGame])
  useEffect(()=>{
      console.log('Current Game Changed')
    SaveCurrent(CurrentGame)
  },[CurrentGame])
  useEffect(()=>{
      console.log('Master Game Changed')
    SaveMaster(Master)
  },[Master])
  useEffect(()=>{
    BeenOpen()
  },[])



  // useEffect(()=>{ 
  //   let FlatGame = JSON.stringify(game)
  //   console.log(game)
  //   console.log('Flat Game')
  //   SaveData(FlatGame)
  //   // AsyncStorage.setItem('AppData',FlatGame)
  // },[game])
  

 
 
 


  let BeenOpen = async () => {

    console.log("Been Open")
    try {
      const value = await AsyncStorage.getItem('BeenOpen');
      console.log(value)
      if (value == 'true') {
          console.log('true')
        // We have data!!
        // console.log(value);
        // SaveClose()
        SaveMaster(Game)
         CurrentData()
        PlayGameData()
        MasterData()


        console.log('Master')
        console.log(master)
        console.log(Master)
        console.log('Master')



        


      }
      else{
        console.log('else')
      
            SaveOpen()
            SaveCurrent(Game)
            SaveMaster(Game)
            SavePlayFalse()




        
      }
    }
     catch (error) {
      // Error retrieving data
    }
  };
  let PlayGameData =  () => {

    console.log("Play Game Data")
   setPlay('false')
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let CurrentData = async () => {

    console.log("Current Data")
    try {
      const value = await AsyncStorage.getItem('CurrentGame');
      // console.log(value)
      if (value !== null) {
        // We have data!!
        // console.log(value);
        let parsed = JSON.parse(value)
        // use the react to save 
        setCurrent(parsed)
        

        
        

       

      }
      else{
       console.log('else')

        
      }
    }
     catch (error) {
      // Error retrieving data
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let MasterData = async () => {

    console.log("Master Data")
    try {
      const value = await AsyncStorage.getItem('MasterGame');
      // console.log(value)
      if (value !== null) {
        // We have data!!
        // console.log(value);
        let parsed = JSON.parse(value)
        // use the react to save 
        setMaster(parsed)
        

        
        

       

      }
      else{
       console.log('else')

        
      }
    }
     catch (error) {
      // Error retrieving data
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const SaveOpen = async () => {
    try {
    //   const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('BeenOpen', 'true')
    } catch (e) {
      // saving error
    }
  }
  const SavePlayFalse = async () => {
    try {
    //   const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('PlayGame', 'false')
    } catch (e) {
      // saving error
    }
  }
  const SaveClose = async () => {
    try {
    //   const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('BeenOpen', 'false')
    } catch (e) {
      // saving error
    }
  }
  const SaveData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('AppDatas', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const SaveCurrent = async (value) => {
    try {
        console.log('Current Game Save')
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('CurrentGame', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const SaveMaster = async (value) => {
    try {
        console.log('Master Game Save')
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('MasterGame', jsonValue)
    } catch (e) {
      // saving error
    }
  }



 
 
  function LoadGame(){
     
  const LoadGames =   game

  console.log(LoadGames)
//    if(LoadGames ===true){
//   console.log('then render the game but always render with the playGame as false')
//   // console.log(LoadGames)
//   let loadedGame =  JSON.parse(LoadGames)
//   setGame({
//     PlayGame:false,
//     MasterGame:{...Game},
//     CurrentGame:{...loadedGame.CurrentGame}
//   })
// }
// else{
//   // console.log('Set the game to the boiler plate ')
//   // console.log(LoadGames)


 

//   let AppData ={
//     PlayGame:false,
//     MasterGame:{...Game},
//     CurrentGame:{...Game},


//   }
//   const jsonValue = JSON.stringify(AppData)
  
  
//   AsyncStorage.setItem('AppData', jsonValue)



// }
 }




  const storeData = async (value) => {
    try {
      console.log('Store Data')
      const jsonValue = JSON.stringify(value)
      // console.log(jsonValue)
      
      AsyncStorage.setItem('AppData', jsonValue)
      console.log('What promise?')
    } catch (e) {
      // saving error
    }
  }
const getGame = async () => {
  try {
    const value = await AsyncStorage.getItem('game')
    if(value !== null) {
      alert('alert')
    }
  } catch(e) {
    alert('Error')
  }
}




// BeenOpen()


  return (
    <View  style={styles.container}>
      <Header setRooms={setCurrent} rooms={CurrentGame} game={PlayGameData}></Header>

    {console.log(PlayGame)}
    {console.log(PlayGame)}
    {console.log(PlayGame)}
    {console.log(PlayGame)}
    {console.log(PlayGame)}
    {console.log(PlayGame)}
    {PlayGame === 'false'? <Home setCurrent={setCurrent} setPlay={setPlay} master={Master} ></Home> :
    <>
    <ArtHolder rooms={CurrentGame}></ArtHolder>
    {/* <TextArea rooms={game} setRooms={setRooms} changeState={setState} state={currentState}  game={game.game.game} fullGame={game.game}  img='src here' responses='next' text={rooms.game[rooms.save].dialog}  ></TextArea> */}
    <TextHolder rooms={CurrentGame}   ></TextHolder>
    <ButtonArea rooms={CurrentGame} setCurrent={setCurrent} ></ButtonArea>
    
    </>
    }

    



       
       

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
