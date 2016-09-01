import {Hex} from './interfaces';
import {WALL, HEX} from '../Enums/enums';
const {floor, random} = Math;

export function emptyHex(): Hex {
   return {
     walls: [],
     char: '',
     type: HEX.EMPTY
   }
};

export function symbolHex(ch: string): Hex {
   return {
     char: ch,
     walls: randomWalls(),
     type: ch === '#' ? HEX.EMPTY : HEX.CHAR
   }
};

function randomWalls(): WALL[] {
  const a = [];
  do a.push(oneWall());
  while (a.length <= 6);
  return a;

  function oneWall(): WALL {
    return  Math.random() > 0.88888888 ? WALL.CORRIDOR : Math.floor(Math.random()*4);  
  };
}


