import {LOCATION} from '../Enums/location';
import {DO} from '../Enums/do';
import {HexMap} from '../Hex/interfaces';

export interface Action {
  do: DO;
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
  behaviours: Behaviour[];
}
