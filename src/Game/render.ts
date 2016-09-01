import {GameState} from '../Engine/interfaces';
import {LOCATION} from '../Enums/enums';
import {mapRender} from '../Hex/render';

export function gameRender(state: GameState): string {
 return state.location === LOCATION.GAME ? render(state) : ``;

 function render(state: GameState): string {
   return `
    <div class="game-play">
    <div class="info-header">HOT SEAT</div>
    <div class="menu-hex"> ${mapRender(state)}
    <div>
    </div>
 `;
 }
}
