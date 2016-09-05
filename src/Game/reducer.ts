import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {DO, ANIME, SKILL, WALL} from '../Enums/enums';
import {mapGen} from './mapGen';
import {mapCheck} from './mapCheck';
import {HackWallData} from './interfaces';
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
    case DO.HACK:
      console.log(action);
      return hackWall(action.payload.hwd, state);
    default:
      return state;
  }
}

export function nextSoldier(state: GameState): GameState {
  state.active = (state.active + 1) % state.soldiers.length;
  const soldier = state.soldiers[state.active];
  if (soldier.KIA === true) {
    soldier.moves = 0;
  } else {
    soldier.moves = soldier.movesPerTurn;
  }
  return soldier.KIA ? forceSkip(updateBehaviour(state)) : updateBehaviour(state);
};

function moveSoldier(x, y, state: GameState): GameState {
  const s = state.soldiers[state.active];
  s.x = x;
  s.y = y;
  return updateBehaviour(eatAP(placeSoldiers(state)));
}

function eatAP(state: GameState): GameState {
  const s = state.soldiers[state.active];
  s.moves = s.moves - 1;
  if (s.moves) {
    return state;
  } else {
    return forceSkip(state);
  }
}

function hackWall(hwd: HackWallData, state: GameState): GameState {
  state.hexMap[hwd.ty][hwd.tx].walls[hwd.td] = WALL.DOOROPEN; 
  console.log('!!!');
  return updateBehaviour(eatAP(state));
}

function forceSkip(state: GameState): GameState { 
    state.behaviours = [];
    state.animations.push({anime: ANIME.DELAY200, payload: {do: DO.SKIP, payload: {}}});
    return state;
}
