import {GameState, Action} from '../Engine/interfaces';
import {DO} from '../Enums/enums';
import {mapGen} from './mapGen';
import {mapCheck} from './mapCheck';

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.do) {
    case DO.CHECKLEVEL:
      if (mapCheck(state.hexMap)) {
         state.animations = [];
      } else {
        state.hexMap = mapGen();
      }
      return state;
    default:
      return state;
  }
}


