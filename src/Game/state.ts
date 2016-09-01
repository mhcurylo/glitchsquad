import {GameState, Behaviour} from '../Engine/interfaces';
import {mapGen} from './mapGen';
import {LOCATION} from '../Enums/enums';

export class GamePlay implements GameState {
   location = LOCATION.GAME;
   hexMap = [[]];
   behaviours = [];
   constructor() {
     this.hexMap = mapGen();
   }
}
