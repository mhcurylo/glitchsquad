import {WALL, HEX} from '../Enums/enums';
import {Hex, HexMap} from '../Hex/interfaces';
import {randomHex} from '../Hex/hexCreate';
import {size} from './mapSize';
import {HackWallData} from './interfaces';

export const cords = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]],
	       [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];

export function mapCheck(map: HexMap): boolean {
  return true;
}

export function getCords(x: number, y: number, d: number): {x:number, y:number} {
  const [cx, cy] = cords[y % 2][d];
  return {x: cx + x, y: cy + y};
}

export function canMove(x: number, y:number, d: number, map: HexMap): boolean {
  const t = getCords(x, y, d);
  return isOnMap(t.x, t.y) && isNotEmpty(t.x, t.y, map) && isAccessible(x, y, d, map);
}

function isOnMap(x: number, y: number): boolean {
  return ((-1 < x) && (x < size[1]) && (-1 < y) && (y < size[0]));
};

export function isNotEmpty(x: number, y: number, map: HexMap): boolean {
  return map[y][x].type !== HEX.EMPTY;
}
export function isAccessible(x: number, y:number, d: number, map: HexMap): boolean {
  const connection = connectionType(x, y, d, map);
  return (connection === WALL.CORRIDOR) || (connection === WALL.DOOROPEN);
}

export function isConnected(x: number, y:number, d: number, map: HexMap): boolean {
  const connection = connectionType(x, y, d, map);
  return (connection === WALL.CORRIDOR) || (connection === WALL.DOOROPEN) || (connection === WALL.DOORCLOSED);
}

export function connectionType(x: number, y:number, d: number, map: HexMap): WALL {
  const t = getCords(x, y, d);
  const wallF = map[y][x].walls[d]; 
  const wallT = map[t.y][t.x].walls[(d + 3) % 6];
  return wallF > wallT ? wallF : wallT;
}

export function canOpen(x: number, y:number, d:number, map: HexMap): HackWallData | boolean {
  const t = getCords(x, y, d);
  if (!isOnMap(x, y) || !isNotEmpty(x, y, map)) {
    return false;
  }
  const ct = connectionType(x, y, d, map);
  const tw = getNearest();
  return ct === WALL.DOORCLOSED ? {
   dx: t.x,
   dy: t.y,
   tx: tw.x,
   ty: tw.y,
   td: tw.d
  } : false;

  function getNearest() {
    return map[y][x].walls[d] === WALL.DOORCLOSED ? {x, y, d} : {x: t.x, y: t.y, d: ((d + 3) % 6)};
  }
}

