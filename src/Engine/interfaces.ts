import {LOCATION, DO, ANIME} from '../Enums/enums';
import {HexMap} from '../Hex/interfaces';


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
}
