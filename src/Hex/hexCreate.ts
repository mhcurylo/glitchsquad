import {Hex} from './interfaces';
import {WALL, HEX, PLAYER} from '../Enums/enums';
//due to hex render - if we give it ' ' the hex will not have char displayed

export function aHex(x: number, y: number): Hex {
  return {
    x: x,
    y: y,
    walls: randomWalls(),
    soldiers: [],
    acts: [],
    type: Math.random() > 0.85 ? HEX.EMPTY : HEX.BASE
  }
};

export function randomHex(x: number, y: number): Hex {
  return aHex(x, y);
}

export function symbolHex(x: number, y: number, ch: string): Hex {
  const h = aHex(x, y);
  h.char = ch;
  h.type = ch === '#' ? HEX.EMPTY : HEX.CHAR
  return h;
};

export function evacHex(x: number, y: number, p: PLAYER): Hex {
  const h = aHex(x, y);
  h.type = HEX.EVAC;
  h.player = p;
  h.walls = wallType(WALL.DOOROPEN);
  return h;
}

export function discHex(x: number, y: number): Hex {
  const h = aHex(x, y);
  h.type = HEX.DISC;
  h.walls = wallType(WALL.DOORCLOSED);
  return h;
}

function wallType(wall: WALL): WALL[] {
  return Array.from(new Array(6), () => wall);
}

function randomWalls(): WALL[] {
  return Array.from(new Array(6), oneWall);
  
  function oneWall(): WALL {
    return Math.random() > 0.6 ? WALL.CORRIDOR :
      (Math.random() > 0.8 ? WALL.DOOROPEN :
        Math.floor(Math.random() * 4));
  }
}
