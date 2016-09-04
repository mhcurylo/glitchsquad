import {WALL, HEX, PLAYER, SKILL} from '../Enums/enums';
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
  acts?: SKILL[];
  x: number;
  y: number;
}

export type HexMap = Hex[][];
