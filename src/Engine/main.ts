import {Action, Behaviour, GameState} from './interfaces';
import {makeRender, behave, makeReducer} from './make';
import {Game} from './game';
import {DO} from '../Enums/do';
import {MenuState} from '../Menu/state';
import {menuRender} from '../Menu/render';

function titleReducer(state: GameState, action: Action): GameState {
  switch (action.do) {
    case DO.NOT:
      return state;
    default: 
      return state;
  }
}

export function start(dom: any) {
  const state = new MenuState();
  const render = makeRender([menuRender], dom);
  const reduce = makeReducer([titleReducer]);
  const game: Game = new Game(state, render, behave, reduce);
}
