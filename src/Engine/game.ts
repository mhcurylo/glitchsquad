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
    if (action.do === DO.GLITCH ||(this.actions.length > 4 && Math.random() > 0.98)) {
      return this.glitch(this.cloneDeep(this.initState), [...this.actions]);
    }
    const state = this.reducer(this.state, action);
    this.saveState(state, action);
    this.render(state);
    this.behave(state.behaviours, this.act);
    this.animate(state.animations, this.act);
    state.animations = [];
    this.state = state;
  }

  private saveState(state: GameState, action: Action): void {
    if (action.do === DO.PLAYGAME) {
      this.initState = this.cloneDeep(state); 
      this.actions = [];
    } else {
      this.actions.push(action);
    }
  }

  private glitch(state: GameState, actions: Action[]): void {
    const action = actions.shift();
    state.active = action.active;
    const nstate: GameState = this.reducer(state, action);
    this.render(nstate);
    if (actions.length > 0) {
      nstate.animations = [];
      setTimeout(() => this.glitch(nstate, actions), 200); 
    } else {
      console.log(nstate, action);
      nstate.animations = nstate.animations.filter(a => a.payload ? a.payload.do !== DO.GLITCH : true);
      this.behave(nstate.behaviours, this.act);
      this.animate(nstate.animations, this.act);
      state.animations = [];
      this.state = nstate;
    }
  }

  private cloneDeep<T>(soa: T): T {
    return JSON.parse(JSON.stringify(soa));
  }
}
