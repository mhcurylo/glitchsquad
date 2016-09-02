import {WALL, SOLDIER, HEX} from '../Enums/enums';

export interface Hex {
  walls: WALL[];
  type: HEX; 
  soldier?: SOLDIER;
  char?: string;
  classNames?: string;
  sub?: string;
  hoover?: string;
}

export type HexMap = Hex[][];
