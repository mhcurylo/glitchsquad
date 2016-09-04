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

export function canMove(x: number, y:number, tx: number, ty: number, map: HexMap): boolean {
  return ((-1 < tx) && (tx < size[1]) && (-1 < ty) && (ty < size[0]));
}
