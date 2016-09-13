import {GameState} from '../Engine/interfaces';
import {LOCATION,PLAYER, SOLDIER} from '../Enums/enums';
import {trimMap} from '../Game/mapGen';
import {toHex} from '../Menu/state';

const wait = [
  '#GLITCH##  ',
  '###SQUAD###',
  'Waiting for',
  '## ONLINE #',
  '#OPONNENT #',
  '#online####'
];

const left = [
  '#OPONNENT##',
  '###LEFT### ',
  'Waiting for',
  '## ONLINE #',
  '#OPONNENT #',
  'GLITCHSQUAD'
];

function loadingScreen(smap: string[]) {
  return {
    location: LOCATION.MENU,
    local: false,
    hexMap: trimMap(smap.map((l, y) => toHex(y, l))),
    behaviours: [],
    animations: [],
    soldiers: [],
    lastWinner: false
  }
}

export function waitingForOponnent(): GameState {
  return loadingScreen(wait);
}
export function waitingForOponnentOponnentLeft(): GameState {
  return loadingScreen(left);
}

