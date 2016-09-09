import {SKILL, SOLDIER, PLAYER} from '../Enums/enums';
import {Soldier} from './interfaces';
import {NAMES} from './names';
const n = NAMES.split(',');

function getName() {
  return n[Math.floor(Math.random() * n.length)];
}

export function soldierSquadie(player: PLAYER, name: string): Soldier {
  return {
    type: SOLDIER.SQUADIE,
    code: 'SQ',
    moves: 2,
    movesPerTurn: 2,
    initiative: 5 + Math.random() * 5,
    KIA: false,
    skills: [SKILL.EVAC, SKILL.MOVE, SKILL.SHOOT_RIFLE, SKILL.OPEN, SKILL.GRAB_DISC, SKILL.SKIP],
    player: player,
    name: getName(),
    x: 1,
    y: 1,
    i: 0
  }
}

export function soldierHeavy(player: PLAYER, name: string): Soldier {
  return {
    type: SOLDIER.HEAVY,
    code: 'HE',
    moves: 1,
    movesPerTurn: 1,
    initiative: 3 + Math.random() * 3,
    KIA: false,
    skills: [SKILL.EVAC, SKILL.MOVE, SKILL.SHOOT_HEAVY, SKILL.OPEN, SKILL.GRAB_DISC, SKILL.SKIP],
    player: player,
    name: getName(),
    x: 1,
    y: 1,
    i: 0
  }
}
