import {Action, Behaviour, GameState, Animation} from './interfaces';
import {DO} from '../Enums/do';
import {menuState} from '../Menu/state';
declare const io;

export class Game {
  initState: GameState;
  actions: Action[] = [];
  socket: any;

  constructor(private state: GameState,
              private render: (state: GameState) => void,
              private behave: (behaviours: Behaviour[], doIt: (Action) => void) => void,
              private reducer: (state: GameState, actions: Action) => GameState,
              private animate: (animations: Animation[], doIt: (Action) => void) => void) {
    this.act = this.act.bind(this);
    this.glitch = this.glitch.bind(this);
    this.render = this.render.bind(this);
    this.reducer = this.reducer.bind(this);
    this.behave = this.behave.bind(this);
    this.animate = this.animate.bind(this);
    this.act({do: DO.NOT, active: 0, player: 0, payload: {}});
  }
  
  private act(action: Action): void {
    if (this.state.local === true) {
      if (action.do === DO.ONLINE) {
        this.initSocket(); 
      }
      if (action.do === DO.GLITCH || (this.actions.length > 4 && Math.random() > 0.985)) {
        return this.glitch(this.cloneDeep(this.initState), [...this.actions]);
      }
      const state = this.reducer(this.state, action);
      this.saveState(state, action);
      this.render(state);
      this.behave(state.behaviours, this.act);
      this.animate(state.animations
        .findIndex(a => (a.payload && a.payload.do === DO.GLITCH)) > -1 ?
      state.animations
        .filter(a => (a.payload && a.payload.do === DO.GLITCH)) 
        : state.animations, this.act);
      state.animations = [];
      this.state = state;
    } else {
     this.emit(action);
    }
  }

  private emit(action: Action):void {
    console.log('emiting', action);
    this.socket['emit']('action', action);
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
      this.render(nstate);
      nstate.animations = [];
      setTimeout(() => this.glitch(nstate, actions), 140); 
    } else {
      state.glitch = false;
      const nstate: GameState = this.reducer(state, action);
      this.render(nstate);
      nstate.animations = nstate.animations
        .filter(a => a.payload ? a.payload.do !== DO.GLITCH : true);
      nstate.animations = nstate.animations
        .findIndex(a => (a.payload && a.payload.do === DO.WIN)) > -1 ?
        nstate.animations
          .filter(a => (a.payload && a.payload.do === DO.SKIP)) : nstate.animations; 
      this.behave(nstate.behaviours, this.act);
      this.animate(nstate.animations, this.act);
      this.state = nstate;
    }
  }

  private initSocket() {
    this.socket = window['io']({ upgrade: false, transports: ["websocket"] });
    this.socket['on']('state', s => {
      console.log('rec', s);     
      const stateP = s;
      this.state = stateP;
      this.render(stateP);
      this.behave(stateP.behaviours, this.act);
    });

    this.socket['on']("connect", () => {
        this.render(this.state);
        console.log('connected');
    });
    this.socket['on']("disconnect", () => {
	this.state = menuState();
        this.render(this.state);
        alert('disconnected');
    });

    this.socket['on']("error", () => {
        this.state = menuState();
        alert('server erro');
    });
  }

  private cloneDeep<T>(soa: T): T {
    return JSON.parse(JSON.stringify(soa));
  }
}
