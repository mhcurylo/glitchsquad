import {PLAYER} from '../Enums/enums';
import {Soldier} from './interfaces';
import {soldierSquadie, soldierHeavy} from './classes';
import {GameState} from '../Engine/interfaces';

export function createSquads(state: GameState): GameState {
  return newSquadToState(PLAYER.ONE, newSquadToState(PLAYER.TWO, state)); 

  function newSquadToState(player: PLAYER, state: GameState): GameState {
    const squad = createSquad(player);
    state.soldiers = state.soldiers.concat(squad);
    state.hexMap.forEach(l => l.forEach(h => h.player === player ? h.soldiers = squad : ''));

    return state;
    
    function createSquad(player: PLAYER): Soldier[] {
      return [soldierSquadie(player, 'S1'), 
        soldierSquadie(player, 'S2'),
        soldierSquadie(player, 'S3'),
        soldierHeavy(player, 'HVY')];
    }
  }
}
