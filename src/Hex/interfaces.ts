import {WALL, SOLDIER} from '../Enums/enums';

export interface Hex {
  walls: WALL[];
  soldier: SOLDIER;
  char: string;
  sub: string;
  hoover: string;
}

export type HexMap = Hex[][];
