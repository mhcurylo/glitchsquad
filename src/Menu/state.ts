import {GameState, Behaviour} from '../Engine/interfaces';
import {LOCATION, DO, WALL, PLAYER, SOLDIER} from '../Enums/enums';
import {Soldier} from '../Soldier/interfaces';
import {Hex} from '../Hex/interfaces';
import {symbolHex} from '../Hex/hexCreate';
import {trimMap} from '../Game/mapGen';

const b = [3, 4, 5, 6, 7, 8, 9, 10].map(n => hotseat(`hex-${n}-4`))
            .concat([1, 2, 3, 4, 5, 6, 7].map(n => online(`hex-${n}-5`)));
  
const hexMap = [
  '####   ## ',
  '### Glitch',
  '##  Squad',
  '##  ',
  '####HOTSEAT',
  '# ONLINE###'
].map((l, y) => toHex(y, l));

const multi = [

]


export function menuState(winner?: PLAYER, soldiers?: Soldier[]): GameState {
  return {
    location: LOCATION.MENU,
    local: true,
    hexMap: trimMap(soldiers ? mapCodeNames(winner, soldiers) : hexMap),
    behaviours: b,
    soldiers: [],
    animations: [],
    lastWinner: winner ? winner : false
  }
}

function hotseat(id: string): Behaviour {
  return {
    id: id,
    event: 'onclick',
    action: {
      do: DO.PLAYGAME,
      player: 0,
      active: 0,
      payload: {}
    }
  };
}

function online(id: string): Behaviour {
  return {
    id: id,
    event: 'onclick',
    action: {
      do: DO.ONLINE,
      player: 0,
      active: 0,
      payload: {}
    }
  };
}

function mapCodeNames(winner: PLAYER, soldiers: Soldier[]): Hex[][] {
  return soldiers.map((s, i) => s.code + '#' + s.name)
    .concat(['#P' + (winner + 1) + '#HOTSEAT',
       '# ONLINE###'
    ])
    .map((l, x) => toHex(x, l));
}

export function toHex(y: number, line: string): Hex[] {
  return line.split('').map((s, x) => symbolHex(x, y, s));
}
