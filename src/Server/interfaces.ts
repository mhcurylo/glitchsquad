import {PLAYER} from '../Enums/enums';
import {OnlineGame} from './game';

export interface User {
  socket: any,
  waiting: boolean,
  game?: OnlineGame,
  asPlayer?: PLAYER,
  oponnent?: User
}


