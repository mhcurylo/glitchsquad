import {Hex} from './interfaces';
import {WALL, HEX} from '../Enums/enums';
const {floor, random} = Math;

//due to hex render - if we give it ' ' the hex will not have char displayed


export function randomHex(): Hex {
  return {
    walls: randomWalls(),
    type: Math.random() > 0.70 ? HEX.EMPTY : HEX.BASE 
  }
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
    return  Math.random() > 0.88888888 ? WALL.CORRIDOR : Math.floor(Math.random()*4);  
  };
}
