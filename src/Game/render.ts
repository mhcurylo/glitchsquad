import {GameState} from '../Engine/interfaces';
import {LOCATION} from '../Enums/enums';
import {mapRender} from '../Hex/render';
import {squadRender} from '../Soldier/render';

export function gameRender(state: GameState): string {
  return state.location === LOCATION.GAME ? timerender(state) : ``;
  
  function timerender(state: GameState): string {
    console.time('render time');
    const s = render(state);
    console.timeEnd('render time');
    return s;
  }
  
  
  function render(state: GameState): string {
    return `
    <div class="game-play">
      <div class="info-header">HOT SEAT</div>
      <div class="game-hex"> ${mapRender(state)}</div>
      <div class="squads-display"> ${squadRender(state.soldiers, state, true)}</div>
    </div>
 `;
  }
}
