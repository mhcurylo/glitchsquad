import {WALL, HEX, PLAYER, SKILL} from '../Enums/enums';
import {Soldier} from '../Soldier/interfaces';
import {Behaviour} from '../Engine/interfaces';
export interface Hex {
  walls: WALL[];
  type: HEX;
  soldiers: number[];
  char?: string;
  player?: PLAYER;
  acts: Behaviour[];
  x: number;
  y: number;
}

export type HexMap = Hex[][];
