import {GameState, Behaviour} from '../Engine/interfaces';
import {LOCATION, DO, WALL, PLAYER, SOLDIER} from '../Enums/enums';
import {Soldier} from '../Soldier/interfaces';
import {Hex} from '../Hex/interfaces';
import {symbolHex} from '../Hex/hexCreate';
import {trimMap} from '../Game/mapGen';

const b = [7, 8, 9 ,10].map(n => clickToPlay(`hex-${n}-4`));
const hexMap = [
    '####   ## ',
    '### Glitch',
    '##  Squad',
    '##  ',
    '#####  PLAY'
].map((l, y) => toHex(y, l));

export function menuState(winner?: PLAYER, soldiers?: Soldier[]): GameState  {
  return {   
    location: LOCATION.MENU,
    hexMap: trimMap(soldiers ? mapCodeNames(winner, soldiers) :  hexMap),
    behaviours: b, 
    animations: [],
    lastWinner: winner ? winner : false
  }
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

function mapCodeNames(winner: PLAYER, soldiers: Soldier[]): Hex[][] {
  return soldiers.map((s, i) => s.code + '#' +  s.name)
	  .concat(['#P' + (winner + 1) + 'W#REPLAY'])
          .map((l, x) => toHex(x, l));
}

function toHex(y: number, line: string): Hex[] {
  return line.split('').map((s, x) => symbolHex(x, y, s));
}
