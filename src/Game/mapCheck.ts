import {WALL, HEX} from '../Enums/enums';
import {Hex, HexMap} from '../Hex/interfaces';
import {randomHex} from '../Hex/hexCreate';
import {size} from './mapSize';


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
  return isOnMap(t.x, t.y) && isNotEmpty(t.x, t.y, map) && isAccessible(x, y, d, map) && true;
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
  console.log(wallF, wallT);
  return wallF > wallT ? wallF : wallT;
}

