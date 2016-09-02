import {GameState, Behaviour} from '../Engine/interfaces';
import {mapGen} from './mapGen';
import {LOCATION, ANIME} from '../Enums/enums';

export class GamePlay implements GameState {
   location = LOCATION.GAME;
   hexMap = [[]];
   behaviours = [];
   animations = [{anime: ANIME.CHECKLEVEL, payload: {}}]
   constructor() {
     this.hexMap = mapGen();
   }
}
