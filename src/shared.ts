import {glitchSquadServer} from './Server/main';
import {start} from './Engine/main.ts';
import './main.scss';
declare const module;

const glitchSquad = {};
glitchSquad['client'] = start;
glitchSquad['server'] = glitchSquadServer;

module.exports = glitchSquad;
