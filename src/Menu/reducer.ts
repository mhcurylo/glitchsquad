import {GameState, Action} from '../Engine/interfaces';
import {DO} from '../Enums/enums';
import {GamePlay} from '../Game/state.ts';

export function menuReducer(state: GameState, action: Action): GameState {
  switch (action.do) {
    case DO.PLAYGAME: 
      return new GamePlay();
    default:
      return state;
  }
}

