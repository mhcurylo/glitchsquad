import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {DO, ANIME, SKILL} from '../Enums/enums';
import {Soldier} from './interfaces';
import {Hex, HexMap} from '../Hex/interfaces';
import {getCords, canMove} from '../Game/mapCheck';

export function updateBehaviour(state: GameState): GameState {
  state.behaviours = [];
  state.hexMap.forEach(l => l.forEach(h => h.acts = []));
  return moves(skip(state));
};

function skip(state: GameState): GameState {
  state.behaviours.push({id: `skip-${state.active}`, event: 'onclick', action: {do: DO.SKIP, payload: {}}});
  return state;
};
  
function moves(state: GameState): GameState {
  const {x, y} = state.soldiers[state.active];
  const movxy = <{x: number, y: number}[]>Array.from(new Array(6), (a, i) => movesTo(x, y, i, state.hexMap)).filter(a => !!a); 
    
  movxy.forEach(m => {
    state.behaviours.push(moveBehave(m.x, m.y));
    state.hexMap[m.y][m.x].acts.push(SKILL.MOVE);
  });

  return state;

  function movesTo(ox: number, oy: number, d: number, map: HexMap)  {
    const {x, y} = getCords(ox, oy, d);
 
    return canMove(ox, oy, x, y, map) ? {x, y} : false;
  };

  function moveBehave (x: number, y: number): Behaviour {
    return {
      id: `hex-${x}-${y}`,
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


