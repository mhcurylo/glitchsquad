import {GameState} from '../Engine/interfaces';
import {LOCATION} from '../Enums/enums';
import {mapRender} from '../Hex/render';

export function menuRender(state: GameState): string {
  return state.location === LOCATION.MENU ? render(state) : ``;
  
  function render(state: GameState): string {
    return `
    <div class="info-header">Glitchsquad 2016</div>
    <div class="menu-hex"> ${mapRender(state)}
    <div>
 `;
  }
}