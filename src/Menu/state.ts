import {GameState} from '../Engine/interfaces';
import {LOCATION, DO, WALL, SOLDIER} from '../Enums/enums';

export class MenuState implements GameState {
   location = LOCATION.MENU;
   hexMap = [
    [{walls: [WALL.NOT, WALL.NOT, WALL.FULL, WALL.FULL, WALL.HALF, WALL.HALF], 
      soldier: SOLDIER.NOT,
      char: 'G',
      sub: 'Glitch',
      hoover: ''}],
    [{walls: [WALL.NOT, WALL.NOT, WALL.FULL, WALL.FULL, WALL.HALF, WALL.HALF], 
      soldier: SOLDIER.NOT,
      char: 'S',
      sub: 'Squad',
      hoover: ''}],
     [{walls: [WALL.NOT, WALL.NOT, WALL.FULL, WALL.FULL, WALL.HALF, WALL.HALF], 
      soldier: SOLDIER.NOT,
      char: 'P!',
      sub: 'Hot Seat',
      hoover: ''
       }]
   ];
   behaviours =  [
     {
       id: 'hex-2-0',
       event: 'onclick',
       action: {
 	 do: DO.PLAYGAME,
         payload: {}
       }
     }
   ];
}
