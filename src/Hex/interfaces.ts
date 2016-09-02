import {WALL, SOLDIER, HEX, PLAYER} from '../Enums/enums';

export interface Hex {
  walls: WALL[];
  type: HEX; 
  soldier?: SOLDIER[];
  char?: string;
  classNames?: string;
  sub?: string;
  hoover?: string;
  player?: PLAYER;
}

export type HexMap = Hex[][];
