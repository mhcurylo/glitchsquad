import {Action, Behaviour, GameState, Animation} from '../Engine/interfaces';
import {DO, PLAYER} from '../Enums/enums';
import {User} from './interfaces';

export class OnlineGame {
  initState: GameState;
  actions: Action[] = [];

  constructor(private p0: User,
              private p1: User,
              private state: GameState,
              private reducer: (state: GameState, actions: Action) => GameState,
              private animate: (animations: Animation[], doIt: (Action) => void) => void) {
    this.act = this.act.bind(this);
    this.glitch = this.glitch.bind(this);
    this.reducer = this.reducer.bind(this);
    this.animate = this.animate.bind(this);
    this.initPlayers();
    this.initState = this.cloneDeep(state); 
    this.actions = []; 
    this.act({do: DO.NOT, active: 0, player: 0, payload: {}});
  }
  
  private act(action: Action): void {
    if (action.do === DO.GLITCH || (this.actions.length > 4 && Math.random() > 0.985)) {
      return this.glitch(this.cloneDeep(this.initState), [...this.actions]);
    }
    const state = this.reducer(this.state, action);
    this.saveState(state, action);
    this.animate(state.animations
      .findIndex(a => (a.payload && a.payload.do === DO.GLITCH)) > -1 ?
        state.animations
          .filter(a => (a.payload && a.payload.do === DO.GLITCH)) 
        : state.animations, this.act);
    state.animations = [];
    this.state = state;
    this.emit(state);
  }

  private initPlayers() {
    this.p0.asPlayer = PLAYER.ONE;
    this.p1.asPlayer = PLAYER.TWO;
    this.p0.oponnent = this.p1;
    this.p1.oponnent = this.p0;
    this.p0.game = this;
    this.p1.game = this;
    this.p0.socket['on']('action', a => (a.player === PLAYER.ONE) ? this.act(a) : '');
    this.p1.socket['on']('action', a => (a.player === PLAYER.TWO) ? this.act(a) : '');
    this.p0.socket['on']('disconnect', () => this.end());
    this.p1.socket['on']('disconnect', () => this.end());
  }

  private end() {
    this.p0.socket ? this.p0.socket['removeAllListeners']('action') : '';
    this.p1.socket ? this.p1.socket['removeAllListeners']('action') : '';
  }

  private emit(state):void {
    const state0 = state;
    const state1 = state;    
    this.p0.socket['emit']('state', state0);
    this.p1.socket['emit']('state', state1);
  }

  private saveState(state: GameState, action: Action): void {
    if (action.do === DO.PLAYGAME) {
      this.initState = this.cloneDeep(state); 
      this.actions = []; 
    } else {
      action.do !== DO.WIN ? this.actions.push(action) : '';
    }
  }

  private glitch(state: GameState, actions: Action[]): void {
    const action = actions.shift();
    state.active = action.active;
    if (actions.length > 0) {
      state.glitch = true;
      const nstate: GameState = this.reducer(state, action);
      nstate.animations = [];
      this.emit(nstate);
      setTimeout(() => this.glitch(nstate, actions), 140); 
    } else {
      state.glitch = false;
      const nstate: GameState = this.reducer(state, action);
      if (nstate.animations && nstate.animations.length > 0) {
      nstate.animations = nstate.animations
        .filter(a => a.payload ? a.payload.do !== DO.GLITCH : true);
      nstate.animations = nstate.animations
        .findIndex(a => (a.payload && a.payload.do === DO.WIN)) > -1 ?
        nstate.animations
          .filter(a => (a.payload && a.payload.do === DO.SKIP)) : nstate.animations; 
      }
      this.animate(nstate.animations, this.act);
      this.state = nstate;
      this.emit(nstate);
    }
  }

  private cloneDeep<T>(soa: T): T {
    return JSON.parse(JSON.stringify(soa));
  }
}
