import {WALL} from '../Enums/enums';

export interface HackWallData {
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  td: number;
}

export interface WallCoords {
  x: number,
  y: number,
  d: number,
  type?: WALL 
}
