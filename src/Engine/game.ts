import {Action, Behaviour, GameState, Animation} from './interfaces';
import {DO} from '../Enums/do';

export class Game {
  initState: GameState;
  actions: Action[] = [];

  constructor(private state: GameState,
              private render: (state: GameState) => void,
              private behave: (behaviours: Behaviour[], doIt: (Action) => void) => void,
              private reducer: (state: GameState, actions: Action) => GameState,
              private animate: (animations: Animation[], doIt: (Action) => void) => void) {
    this.act = this.act.bind(this);
    this.glitch = this.glitch.bind(this);
    this.act({do: DO.NOT, active: 0, player: 0, payload: {}});
  }
  
  private act(action: Action): void {
    const state = this.reducer(this.state, action);
    
    this.saveState(state, action);
    if (action.do === DO.GLITCH) {
      return this.glitch(this.cloneSOA(this.initState), [...this.actions]);
    }

    this.render(state);
    this.behave(state.behaviours, this.act);
    this.animate(state.animations, this.act);
    state.animations = [];
    this.state = state;
  }

  private saveState(state: GameState, action: Action): void {
    if (action.do === DO.PLAYGAME) {
      this.initState = this.cloneSOA(state); 
      this.actions = [];
    } else {
      this.actions.push(action);
    }
  }

  private glitch(state: GameState, actions: Action[]): void {

  }

  private cloneSOA<T>(soa: T): T {
    return JSON.parse(JSON.stringify(soa));
  }
}
