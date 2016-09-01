import {GameState, Behaviour} from '../Engine/interfaces';
import {LOCATION, DO, WALL, SOLDIER} from '../Enums/enums';
import {Hex} from '../Hex/interfaces';
import {symbolHex, emptyHex} from '../Hex/hexCreate';

export class MenuState implements GameState {
   location = LOCATION.MENU;
   hexMap = [
    '####   ## ',
    '### Glitch',
    '##  Squad',
    '##  ',
    '##### PLAY'
   ].map(toHex);
   behaviours = [7, 8, 9, 10].map(n => clickToPlay(`hex-4-${n}`));
}

function clickToPlay(id: string): Behaviour {
  return {
       id: id,
       event: 'onclick',
       action: {
 	 do: DO.PLAYGAME,
         payload: {}
       }
     };
}

function toHex(line: string): Hex[] {
  return line.split('').map(symbolHex);
}
