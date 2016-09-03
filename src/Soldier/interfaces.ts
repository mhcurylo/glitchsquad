import {SKILL, SOLDIER, PLAYER} from '../Enums/enums';

export interface Soldier {
  type: SOLDIER,
  code: string,
  moves: number,
  movesPerTurn: number,
  player: PLAYER
  name: string,
  initiative: number;
  KIA: boolean;
  skills: SKILL[];
  classNames?: string;
  x: number,
  y: number,
  i: number
}
