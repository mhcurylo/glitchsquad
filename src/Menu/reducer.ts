import {GameState, Action} from '../Engine/interfaces';
import {DO, ANIME} from '../Enums/enums';
import {gamePlay} from '../Game/state.ts';
import {toHex} from './state';

const hexMap = [
  '####   ## ',
  'CONNECTING',
  'Squad',
  '##  ',
].map((l, y) => toHex(y, l));

export function menuReducer(state: GameState, action: Action): GameState {
  switch (action.do) {
    case DO.PLAYGAME:
      return gamePlay();
    case DO.ONLINE:
      state.hexMap = hexMap;
      state.local = false;
      return state;
    default:
      return state;
  }
}
