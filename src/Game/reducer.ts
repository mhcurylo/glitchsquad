import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {DO, ANIME, SKILL} from '../Enums/enums';
import {mapGen} from './mapGen';
import {mapCheck} from './mapCheck';
import {skillBehave} from '../Soldier/skillBehave';

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
    default:
      return state;
  }
}

export function nextSoldier(state: GameState): GameState {
  state.active = (state.active + 1) % state.soldiers.length;
  const soldier = state.soldiers[state.active];
  if (soldier.KIA === true) {
    state.animations.push({anime: ANIME.DELAY200, payload: {do: DO.SKIP, payload: {}}});
    state.behaviours = [];
  } else {
    soldier.moves = soldier.movesPerTurn;
    state.behaviours = soldier.skills.reduce((p, c) => p.concat(skillBehave(c, soldier, state)), []).filter(b => b);
  }

  return state;
};
