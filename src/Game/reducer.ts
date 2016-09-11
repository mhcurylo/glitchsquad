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
      return doerAble(state) ? moveSoldier(action.payload.x, action.payload.y, state) : nextSoldier(state);
    case DO.HACK:
      return doerAble(state) ? hackWall(action.payload.hwd, state) : nextSoldier(state);
    case DO.GRAB_DISC:
      return doerAble(state) ? grabDisc(state) : nextSoldier(state);
    case DO.WIN:
      return doerAble(state) ? win(action.payload.winner, state) : nextSoldier(state);
    case DO.EVAC:
      return doerAble(state) ? delayWin(action.payload.winner, state) : nextSoldier(state);
    case DO.SHOOT_RIFLE:
      return doerAble(state) ? shootRifle(action.payload, state) : nextSoldier(state);
    case DO.SHOOT_HEAVY:
      return doerAble(state) ? shootHeavy(action.payload, state) : nextSoldier(state);
    default:
      return state;
  }
}

export function nextSoldier(state: GameState): GameState {
  const {soldiers, active} = state;
  if (soldiers && soldiers.length > 0 && active > -1 && soldiers.findIndex(s => (s.player !== soldiers[active].player && !s.KIA)) === -1) {
    return win(soldiers[active].player, state);
  }
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
  const s = state.soldiers[state.active];
  if (s.x === state.disc[0] && s.y === state.disc[1]) {
    state.soldiers.map(s => Object.assign(s, {disc: false}));
    s.disc = true;
  }
  return updateBehaviour(eatAP(state));
}

function shootRifle(payload: {wc: WallCoords[]}, state: GameState): GameState {
  const {x, y} = state.soldiers[state.active];
  const res = payload.wc.reduce(({x, y, t, state}, c) =>
    shootPeople(x, y, c, t, state), {x, y, t: 0, state}
  );
  return eatAllAP(res.state);
}

function shootPeople(x: number, y: number, w: WallCoords, t: number, state: GameState): {x: number, y: number, t: number, state: GameState} {
  const hex = state.hexMap[w.y][w.x];
  const soldier = state.soldiers[state.active];
  if ((w.type === WALL.DOOROPEN || w.type === WALL.DOORCLOSED) && (soldier.x !== x || soldier.y !== y)) {
    t = t + 10;
  } else {
    t = t + 3;
  } 
  if (w.x !== x || w.y !== y) {
    hex.soldiers.forEach((s) => {
      t = t + 5;
      s.KIA ? '' : state = tryKill(s.i, t, state);
    });
  }
  
  return {x: w.x, y: w.y, t, state};
}


function tryKill(si: number, t: number, state: GameState): GameState {
  const c = t > 95 ? 95 : t;
  const r = Math.random()*100 > t; 
  const g = (r && (t > 50) || (!r && t < 50));
  return r ? kill(si, g ? glitch(state) : state) : g ? glitch(state) : state;
}

function kill(si: number, state: GameState): GameState {
  state.soldiers[si].KIA = true;
  state.soldiers[si].moves = 0;
  return state;
}

function shootHeavy(payload: {wc: WallCoords[]}, state: GameState): GameState {
  return shootRifle(payload, shootClosedWalls(payload, state));
}

function shootClosedWalls(payload: {wc: WallCoords[]}, state: GameState): GameState {
  return payload.wc.reduce((p, c) => c.type === WALL.DOORCLOSED ? wallOpen(c.x, c.y, c.d, p) : state, state);
}

function wallOpen(x, y, d, state) {
  state.hexMap[y][x].walls[d] = WALL.DOOROPEN;
  return state;
}

function delayWin(winner: PLAYER, state: GameState): GameState {
  state.animations.push({anime: ANIME.DELAY500, payload: {do: DO.WIN, active: state.active, player: winner, payload: {winner: winner}}});
  return state;
}

function win(winner: PLAYER, state: GameState): GameState {
  return menuState(winner, state.soldiers.filter(s => s.player === winner));
}

function eatAllAP(state: GameState): GameState {
  state.soldiers[state.active].moves = 0;
  return forceSkip(state);
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
  state.animations.push({anime: ANIME.DELAY200, payload: {do: DO.SKIP, active: state.active, player: state.soldiers[state.active].player, payload: {}}});
  return state;
}

function doerAble(state: GameState): boolean {
  return !state.soldiers[state.active].KIA; 
}

function glitch(state: GameState): GameState {
  state.animations.push({anime: ANIME.DELAY200, payload: {do: DO.GLITCH, active: state.active, player: state.soldiers[state.active].player, payload: {}}});
  return state;
};
