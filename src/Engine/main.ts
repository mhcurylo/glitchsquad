import {Action, Behaviour, GameState} from './interfaces';
import {makeRender, behave, makeReducer, makeAnimate} from './make';
import {Game} from './game';
import {DO} from '../Enums/do';
import {MenuState} from '../Menu/state';
import {menuRender} from '../Menu/render';
import {gameRender} from '../Game/render';
import {gameAnimate} from '../Game/animate';
import {gameReducer} from '../Game/reducer';
import {menuReducer} from '../Menu/reducer';
import {GamePlay} from '../Game/state';

export function start(dom: any) {
  const state = new MenuState();
//  const mapTest = new GamePlay();
  const render = makeRender([menuRender, gameRender], dom);
  const reduce = makeReducer([menuReducer, gameReducer]);
  const animate = makeAnimate([gameAnimate]);
  new Game(state, render, behave, reduce, animate);
}
