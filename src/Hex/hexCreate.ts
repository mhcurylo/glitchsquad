import {Hex} from './interfaces';
import {WALL, HEX, PLAYER} from '../Enums/enums';
//due to hex render - if we give it ' ' the hex will not have char displayed


export function randomHex(): Hex {
  return {
    walls: randomWalls(),
    soldiers: [],
    type: Math.random() > 0.85 ? HEX.EMPTY : HEX.BASE 
  };
}

export function symbolHex(ch: string): Hex {
   return {
     char: ch,
     walls: randomWalls(),
     soldiers: [],
     type: ch === '#' ? HEX.EMPTY : HEX.CHAR
   }
};

export function evacHex(p: PLAYER): Hex {
   return {
     type: HEX.EVAC,
     player: p,
     soldiers: [],
     walls: Array.from(new Array(6), () => WALL.HALFCOVER)
   }
}

export function discHex(): Hex {
  return {
    type: HEX.DISC,
    soldiers: [],
    walls: Array.from(new Array(6), () => WALL.ISOLATED) 
  }
}

function randomWalls(): WALL[] {
  return Array.from(new Array(6), oneWall);

  function oneWall(): WALL {
    return  Math.random() > 0.6 ? WALL.CORRIDOR : 
           (Math.random() > 0.8 ? WALL.HALFCOVER : 
           Math.floor(Math.random()*4));  
  };
}
