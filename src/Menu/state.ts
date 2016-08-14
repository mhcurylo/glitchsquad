import {GameState} from '../Engine/interfaces';
import {LOCATION} from '../Enums/location.ts';
import {DO} from '../Enums/do.ts';

export class MenuState implements GameState {
   location = LOCATION.MENU;
   behaviours =  [
     {
       id: 'play-game',
       event: 'onclick',
       action: {
 	 do: DO.PLAYGAME,
         payload: {}
       }
     }
   ];
}
