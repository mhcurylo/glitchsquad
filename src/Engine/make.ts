import {GameState, Action, Behaviour, Animation} from './interfaces';

export function makeRender(renderers: Array<(GameState) => void>, dom: any) {
  return function(state: GameState): void {
    const newGameStateHTML = renderers.reduce((p, c) => p + c(state), '');
    dom.innerHTML = newGameStateHTML;
  }
}

export function behave(behaviours: Behaviour[], doIt: (Action) => void): void {
  behaviours.forEach(b => {
    const e = document.getElementById(b.id);
    e ? e[b.event] = () => doIt(b.action) : '';
  })
}

export function makeAnimate(animators: Array<(animation: Animation, doIt: (Action) => void) => void>) {
  return function animate(animations: Animation[], doIt: (Action) => void): void {
    animations.forEach(animation => animators.forEach(a => a(animation, doIt)));
  }
}

export function makeReducer(reducers: Array<(GameState, Action) => GameState>) {
  return function(state: GameState, action: Action): GameState {
    return reducers.reduce((p, c) => c(p, action), state);
  }
}

