import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {LOCATION, PLAYER, DO, ANIME, SKILL, WALL, HEX} from '../Enums/enums';
import {mapGen} from './mapGen';
import {mapCheck} from './mapCheck';
import {HackWallData, WallCoords} from './interfaces';
import {updateBehaviour} from '../Soldier/skillBehave';
import {placeSoldiers} from '../Soldier/squad';
import {menuState} from '../Menu/state';

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
      return hackWall(action.payload.hwd, state);
    case DO.GRAB_DISC:
      return grabDisc(state);
    case DO.EVAC:
      return win(action.payload.winner, state);
    case DO.SHOOT_RIFLE:
      return shootRifle(action.payload, state);
    case DO.SHOOT_HEAVY:
      return shootHeavy(action.payload, state);
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
  if (s.disc) {
    const [dx, dy] = state.disc;
    const from = state.hexMap[dy][dx];
    const to = state.hexMap[y][x];
    from.type !== HEX.EVAC ? from.type = HEX.BASE : '';
    to.type !== HEX.EVAC ? to.type = HEX.DISC : '';
    state.disc = [x, y];
  }
  return updateBehaviour(eatAP(placeSoldiers(state)));
}

function grabDisc(state: GameState): GameState {
  state.soldiers.map(s => Object.assign(s, {disc: false}));
  const s = state.soldiers[state.active];
  s.disc = true;
  return updateBehaviour(eatAP(state));
}

function shootRifle(payload: {wc: WallCoords[]}, state: GameState): GameState {
  const {x, y} = state.soldiers[state.active];
  const res = payload.wc.reduce(({x, y, t, state}, c) =>
    shootPeople(x, y, c, t, state), {x, y, t: 0, state}
  );
  return eatAP(res.state);
}

function shootPeople(x: number, y: number, w: WallCoords, t: number, state: GameState): {x: number, y: number, t: number, state: GameState} {
  const hex = state.hexMap[w.y][w.x];
  if (w.type === WALL.DOOROPEN) {
    t = t + 1;
  }
  if (w.x !== x || w.y !== y) {
    hex.soldiers.forEach((s) => {
      t = t + 1;
      s.KIA ? '' : state = tryKill(s.i, t, state);
    });
  }
  ;
  return {x: w.x, y: w.y, t, state};
}


function tryKill(si: number, t: number, state: GameState): GameState {
  const r = Math.random() > 0.25 + (t * 0.075);
  console.log('Rolled 2 kill', !r, 0.1 * t);
  return r ? state : kill(si, state);
}

function kill(si: number, state: GameState): GameState {
  state.soldiers[si].KIA = true;
  state.soldiers[si].moves = 0;
  return state;
}

function shootHeavy(payload: {wc: WallCoords[]}, state: GameState): GameState {
  return eatAP(shootRifle(payload, shootClosedWalls(payload, state)));
}

function shootClosedWalls(payload: {wc: WallCoords[]}, state: GameState): GameState {
  return payload.wc.reduce((p, c) => c.type === WALL.DOORCLOSED ? wallOpen(c.x, c.y, c.d, p) : state, state);
}

function wallOpen(x, y, d, state) {
  state.hexMap[y][x].walls[d] = WALL.DOOROPEN;
  return state;
}

function win(winner: PLAYER, state: GameState): GameState {
  return menuState(winner, state.soldiers.filter(s => s.player === winner));
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
  return updateBehaviour(eatAP(state));
}

function forceSkip(state: GameState): GameState {
  state.behaviours = [];
  state.animations.push({anime: ANIME.DELAY200, payload: {do: DO.SKIP, payload: {}}});
  return state;
}
