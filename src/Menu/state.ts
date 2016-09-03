import {GameState, Behaviour} from '../Engine/interfaces';
import {LOCATION, DO, WALL, SOLDIER} from '../Enums/enums';
import {Hex} from '../Hex/interfaces';
import {symbolHex} from '../Hex/hexCreate';

const b = [7, 8, 9 ,10].map(n => clickToPlay(`hex-4-${n}`));
const hexMap = [
    '####   ## ',
    '### Glitch',
    '##  Squad',
    '##  ',
    '#####  PLAY'
].map((l, y) => toHex(y, l));

export class MenuState implements GameState {
   location = LOCATION.MENU;
   hexMap = hexMap;
   behaviours = b; 
   animations = [];
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

function toHex(y: number, line: string): Hex[] {
  return line.split('').map((s, x) => symbolHex(x, y, s));
}
