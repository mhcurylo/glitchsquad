import {LOCATION, DO, ANIME, SOLDIER, PLAYER} from '../Enums/enums';
import {HexMap} from '../Hex/interfaces';
import {Soldier} from '../Soldier/interfaces';

export interface Action {
  do: DO;
  payload: any;
}

export interface Animation {
  anime: ANIME;
  payload: any;
}

export interface Behaviour {
  id: string;
  event: string;
  action: Action
}

export interface GameState {
  location: LOCATION;
  hexMap: HexMap;
  animations: Animation[];
  behaviours: Behaviour[];
  soldiers?: Soldier[];
  active?: number;
  evac?: number[][];
  disc?: number[];
}
