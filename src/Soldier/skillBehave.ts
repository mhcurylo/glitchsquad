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
  state.behaviours.push({id: `skip-${state.active}`, display: 'SKIP',  event: 'onclick', action: {do: DO.SKIP, payload: {}}});
  return state;
};
  
function moves(state: GameState): GameState {
  const {x, y, KIA, moves} = state.soldiers[state.active];
  
    


  const movxy = ((!KIA) && (moves)) ? 
    <{x: number, y: number}[]>Array.from(new Array(6), (a, i) => movesTo(x, y, i, state.hexMap)).filter(a => !!a)
    : []; 
    
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


