import {Action, Behaviour, GameState, Animation} from '../Engine/interfaces';
import {DO, PLAYER} from '../Enums/enums';
import {User} from './interfaces';
import {cloneDeep} from '../Engine/make';

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
    this.initState = cloneDeep(state); 
    this.actions = []; 
    this.act({do: DO.NOT, active: 0, player: 0, payload: {}});
  }
  
  public end() {
    this.p0 ? this.removeUser(this.p0) : '';
    this.p1 ? this.removeUser(this.p1) : '';
    this.p0 = undefined;
    this.p1 = undefined;
  }

  private act(action: Action): void {
    if (action.do === DO.GLITCH || (this.actions.length > 4 && Math.random() > 0.985)) {
      return this.glitch(cloneDeep(this.initState), [...this.actions]);
    }
    const state = this.reducer((this.state), action);
    this.saveState(state, action);
    this.animate(state.animations
      .find(a => (a.payload && a.payload.do === DO.GLITCH)) ?
        state.animations
          .filter(a => (a.payload && a.payload.do === DO.GLITCH)) 
        : state.animations, this.act);
    state.animations = [];
    this.state = state;
    this.emit(state);
    action.do === DO.WIN ? this.win() : '';
  }
 
  private win() {
    this.p0.waiting = false;
    this.p1.waiting = false;
    this.end();
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

  private removeUser(p: User) {
    if (p) {
      p.socket ? p.socket['removeAllListeners']('action') : '';
      p.oponnent = undefined;
      p.game = undefined;
      p.asPlayer = undefined;
    }
  }

  private emit(state):void {
    const state0 = cloneDeep(state);
    const state1 = cloneDeep(state);
    state0.iam = PLAYER.ONE;
    state1.iam = PLAYER.TWO;    
    this.p0 ? this.p0.socket['emit']('state', state0) : '';
    this.p1 ? this.p1.socket['emit']('state', state1) : '';
  }

  private saveState(state: GameState, action: Action): void {
    action.do !== DO.WIN ? this.actions.push(action) : '';
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
	.find(a => (a.payload && a.payload.do === DO.WIN)) ? 
         [nstate.animations
	  .find(a => (a.payload && a.payload.do === DO.WIN))] : nstate.animations; 
      }
      this.animate(nstate.animations, this.act);
      this.state = nstate;
      this.emit(nstate);
      action.do === DO.WIN ? this.win() : '';
    }
  }
}
