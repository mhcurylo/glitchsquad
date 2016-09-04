import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {DO, ANIME, SKILL} from '../Enums/enums';
import {mapGen} from './mapGen';
import {mapCheck} from './mapCheck';
import {updateBehaviour} from '../Soldier/skillBehave';
import {placeSoldiers} from '../Soldier/squad';

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.do) {
    case DO.CHECKLEVEL:
      if (mapCheck(state.hexMap)) {
         state.animations = [];
      } else {
        state.hexMap = mapGen();
      }
      return state;
    case DO.SKIP:
      return nextSoldier(state);
    case DO.MOVE:
      return moveSoldier(action.payload.x, action.payload.y, state);
    default:
      return state;
  }
}

export function nextSoldier(state: GameState): GameState {
  state.active = (state.active + 1) % state.soldiers.length;
  const soldier = state.soldiers[state.active];
  if (soldier.KIA === true) {
    state.animations.push({anime: ANIME.DELAY200, payload: {do: DO.SKIP, payload: {}}});
  } else {
    soldier.moves = soldier.movesPerTurn;
  }

  return updateBehaviour(state);
};

export function moveSoldier(x, y, state: GameState): GameState {
  const s = state.soldiers[state.active];
  s.x = x;
  s.y = y;
  return updateBehaviour(placeSoldiers(state));
}
