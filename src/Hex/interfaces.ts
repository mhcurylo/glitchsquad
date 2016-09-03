import {WALL, HEX, PLAYER} from '../Enums/enums';
import {Soldier} from '../Soldier/interfaces';

export interface Hex {
  walls: WALL[];
  type: HEX; 
  soldiers: Soldier[];
  char?: string;
  classNames?: string;
  sub?: string;
  hoover?: string;
  player?: PLAYER;
}

export type HexMap = Hex[][];
