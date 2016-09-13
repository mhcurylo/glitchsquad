import {GameState, Behaviour} from '../Engine/interfaces';
import {mapGen} from './mapGen';
import {LOCATION, ANIME, HEX, PLAYER} from '../Enums/enums';
import {createSquads} from '../Soldier/squad';
import {nextSoldier} from './reducer';

export function gamePlay(): GameState {
  const state = {
    location: LOCATION.GAME,
    hexMap: mapGen(),
    behaviours: [],
    animations: [{anime: ANIME.CHECKLEVEL, payload: {}}],
    soldiers: [],
    active:-1,
    lastWinner: false,
    local: true,
    disc: [],
    evac: [[], []]
  };
  state.hexMap.forEach(l => l.forEach(h => {
    switch (h.type) {
      case HEX.DISC:
        return state.disc = [h.x, h.y];
      case HEX.EVAC:
        return h.player === PLAYER.ONE ? state.evac[0] = [h.x, h.y] : state.evac[1] = [h.x, h.y];
    }
  }));
  
  return nextSoldier(createSquads(state));
}
