import {Hex} from './interfaces';
import {WALL, HEX} from '../Enums/enums';
const {floor, random} = Math;

//due to hex render - if we give it ' ' the hex will not have char displayed


export function randomHex(): Hex {
  return {
    walls: randomWalls(),
    type: Math.random() > 0.85 ? HEX.EMPTY : HEX.BASE 
  };
}

export function symbolHex(ch: string): Hex {
   return {
     char: ch,
     walls: randomWalls(),
     type: ch === '#' ? HEX.EMPTY : HEX.CHAR
   }
};

function randomWalls(): WALL[] {
  return Array.from(new Array(6), oneWall);

  function oneWall(): WALL {
    return  Math.random() > 0.6 ? WALL.CORRIDOR : 
           (Math.random() > 0.8 ? WALL.HALFCOVER : 
           Math.floor(Math.random()*4));  
  };
}
