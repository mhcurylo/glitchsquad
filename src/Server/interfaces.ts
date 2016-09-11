import {PLAYER} from '../Enums/enums';
import {OnlineGame} from './game';

export interface User {
  socket: any,
  game?: OnlineGame,
  asPlayer?: PLAYER,
  oponnent?: User
}


