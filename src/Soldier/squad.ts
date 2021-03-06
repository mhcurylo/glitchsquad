import {PLAYER} from '../Enums/enums';
import {Soldier} from './interfaces';
import {soldierSquadie, soldierHeavy} from './classes';
import {GameState} from '../Engine/interfaces';

export function createSquads(state: GameState): GameState {
  return placeSoldiers(setIndexes(newSquadToState(PLAYER.ONE, newSquadToState(PLAYER.TWO, state))));
  
  function newSquadToState(player: PLAYER, state: GameState): GameState {
    const squad = createSquad(player).sort(sortSoldiers);
    state.soldiers = state.soldiers.concat(squad).sort(sortSoldiers);
    state.hexMap.forEach(
      l => l.forEach(
        h => h.player === player ?
          squad.forEach(s => {
            s.x = h.x;
            s.y = h.y;
          }) : ''));
    
    return state;
    
    function sortSoldiers(a: Soldier, b: Soldier): number {
      return b.initiative - a.initiative;
    }
    
    function createSquad(player: PLAYER): Soldier[] {
      return [soldierSquadie(player, 'S1'),
        soldierSquadie(player, 'S2'),
        soldierSquadie(player, 'S3'),
        soldierHeavy(player, 'HVY')];
    }
  }
}

export function placeSoldiers(state: GameState): GameState {
  state.hexMap.forEach(l => l.forEach(h => h.soldiers = []));
  state.soldiers.forEach(s => state.hexMap[s.y][s.x].soldiers.push(s.i));
  return state;
}

export function setIndexes(state: GameState): GameState {
  state.soldiers.forEach((s, si) => s.i = si);
  return state;
}
