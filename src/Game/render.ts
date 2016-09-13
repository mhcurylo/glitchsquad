import {GameState} from '../Engine/interfaces';
import {LOCATION} from '../Enums/enums';
import {mapRender} from '../Hex/render';
import {squadRender} from '../Soldier/render';

export function gameRender(state: GameState): string {
  return state.location === LOCATION.GAME ? render(state) : ``;
}

function render(state: GameState): string {
    return `
    <div class="game-play ${state.glitch ? 'glitch' : ''}">
      <div class="game-hex"> ${mapRender(state)}</div>
      <div class="squads-display"> ${squadRender([0, 1, 2, 3, 4, 5, 6, 7], state, true)}</div>
    </div>
 `;
}

