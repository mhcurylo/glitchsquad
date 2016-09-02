import {GameState, Behaviour} from '../Engine/interfaces';
import {mapGen} from './mapGen';
import {LOCATION, ANIME} from '../Enums/enums';
import {createSquads} from '../Soldier/squad';

export function gamePlay(): GameState {
  const state = {
    location: LOCATION.GAME,
    hexMap: mapGen(),
    behaviours: [],
    animations: [{anime: ANIME.CHECKLEVEL, payload: {}}],
    soldiers: []
  };
  return createSquads(state);
}
