import {GameState, Action, Behaviour} from '../Engine/interfaces';
import {DO, ANIME, SKILL} from '../Enums/enums';
import {Soldier} from './interfaces';

export function skillBehave(skill: SKILL, soldier: Soldier, state: GameState): Behaviour[] {
  switch (skill) {
    case SKILL.SKIP:
      return skip(state);
  };

  function skip(state) {
     return [{id: `skip-${state.active}`, event: 'onclick', action: {do: DO.SKIP, payload: {}}}];
  };
} 

