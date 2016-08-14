export const enum WALL {
  FULL,
  HALF,
  NONE
}

export const enum SOLIDERTYPE {
  NONE,
  ASSALUT,
  SOLIDER,
  HEAVY,
  MARKSMAN,
}

export interface Hex {
  walls: Wall[];
  solider: SOLIDER;
  letter: string;
}
