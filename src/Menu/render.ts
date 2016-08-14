import {GameState} from '../Engine/interfaces';
import {LOCATION} from '../Enums/location';

const menuMarkup = `
  <h1> GlitchSquad </h1>
  <h2> Squad Turn Action </h2>
  <button id="play-game">PLAY!</button>
`;

export function menuRender(state: GameState) {
  return state.location === LOCATION.MENU ? menuMarkup : ``;
}
