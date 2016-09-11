import {User} from './interfaces';
import {Action} from '../Engine/interfaces';
import {OnlineGame} from './game';
import {waitingForOponnent, waitingForOponnentOponnentLeft} from './state';
import {makeReducer, makeAnimate} from '../Engine/make';
import {gameAnimate} from '../Game/animate';
import {gameReducer} from '../Game/reducer';
import {menuReducer} from '../Menu/reducer';
import {gamePlay} from '../Game/state';

const reduce = makeReducer([menuReducer, gameReducer]);
const animate = makeAnimate([gameAnimate]);
const users: User[] = [];

export function start(u0: User, u1: User) {
  const state = gamePlay();
  state.local = false;
  new OnlineGame(u0, u1, state, reduce, animate);
}

export function glitchSquadServer(socket: any) {
  const usr: User = {socket};
  users.push(usr);
  findOponnent(usr);

  socket['on']("disconnect", function () {
    console.log("Disconnected: " + socket['id']);
    removeUser(usr);
    if (usr.oponnent) {
      oponnentLeft(usr.oponnent);
    }
  });
};

function findOponnent(usr: User): void {
  const oponnent = users.find(u => !u.oponnent && u !== usr);
  if (oponnent) {
    start(usr, oponnent);
  } else {
    usr.socket['emit']('state', waitingForOponnent());
  };
}

function removeUser(usr: User): void {
  users.splice(users.indexOf(usr), 1);
}
function oponnentLeft(usr: User): void {
  usr.game = undefined;
  usr.asPlayer = undefined;
  usr.oponnent = undefined;
  usr.socket['emit']('state', waitingForOponnentOponnentLeft());
}
