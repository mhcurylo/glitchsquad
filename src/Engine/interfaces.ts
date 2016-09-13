import {LOCATION, DO, ANIME, PLAYER} from '../Enums/enums';
import {HexMap} from '../Hex/interfaces';
import {Soldier} from '../Soldier/interfaces';

export interface Action {
  do: DO;
  active: number,
  player: PLAYER,
  payload: any
}

export interface Animation {
  anime: ANIME;
  payload: any;
}

export interface Behaviour {
  display?: string;
  color?: string;
  id: string;
  event: string;
  action: Action
}

export interface GameState {
  location: LOCATION;
  hexMap: HexMap;
  animations: Animation[];
  behaviours: Behaviour[];
  local: boolean;
  soldiers: Soldier[];
  lastWinner: PLAYER | boolean;
  glitch?: boolean;
  active?: number;
  evac?: number[][];
  disc?: number[];
}
