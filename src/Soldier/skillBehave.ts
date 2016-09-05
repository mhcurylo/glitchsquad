import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {DO, ANIME, SKILL} from '../Enums/enums';
import {Soldier} from './interfaces';
import {Hex, HexMap} from '../Hex/interfaces';
import {getCords, canMove, canOpen} from '../Game/mapCheck';
import {HackWallData} from '../Game/interfaces';

export function updateBehaviour(state: GameState): GameState {
  state.behaviours = [];
  state.hexMap.forEach(l => l.forEach(h => h.acts = []));
  return hack(moves(skip(state)));
};

function skip(state: GameState): GameState {
  const {KIA, moves, skills} = state.soldiers[state.active];
  ((!KIA) && (moves) && (skills.indexOf(SKILL.SKIP) > 0)) ? 
  state.behaviours.push({id: `skip-${state.active}`, display: 'SKIP',  event: 'onclick', action: {do: DO.SKIP, payload: {}}})
  : '';
  return state;
};

function hack(state: GameState): GameState {
  const {x, y, KIA, moves, skills} = state.soldiers[state.active];
  if ((KIA) || (!moves) || (skills.indexOf(SKILL.SKIP) === -1)) {
    return state;
  }

  const openxy = <HackWallData[]>Array.from(new Array(6), (a, d) => canOpen(x, y, d, state.hexMap)).filter(a => !!a);
  
  openxy.forEach(hwd => {
    const ob = openBehave(hwd);
    state.behaviours.push(ob);
    state.hexMap[hwd.dy][hwd.dx].acts.push(ob);
  });

  return state;

  function openBehave (hwd: HackWallData): Behaviour {
    return {
      id: `hex-${hwd.tx}-${hwd.ty}-${DO.HACK}`,
      display: 'HACK',
      color: 'darkgrey',
      event: 'onclick',
       action: {
	 do: DO.HACK,
         payload: {
          hwd: hwd
        } 
      }
    }
  };
};

function moves(state: GameState): GameState {
  const {x, y, KIA, moves, skills, player} = state.soldiers[state.active];
  if ((KIA) || (!moves) || (skills.indexOf(SKILL.SKIP) === -1)) {
    return state;
  }
  const movxy = <{x: number, y: number}[]>Array.from(new Array(6), (a, i) => movesTo(x, y, i, state.hexMap)).filter(a => !!a);
    
  movxy.forEach(m => {
    const mb = moveBehave(m.x, m.y);
    state.behaviours.push(mb);
    state.hexMap[m.y][m.x].acts.push(mb);
  });

  return state;

  function movesTo(ox: number, oy: number, d: number, map: HexMap)  {
    const {x, y} = getCords(ox, oy, d);
 
    return canMove(ox, oy, d, map) ? {x, y} : false;
  };

  function moveBehave (x: number, y: number): Behaviour {
    return {
      id: `hex-${x}-${y}-${DO.MOVE}`,
      display: 'MOVE',
      color: `p${player}`,
      event: 'onclick',
       action: {
	 do: DO.MOVE,
         payload: {
          x: x, 
          y: y
        } 
      }
    }
  };
};


