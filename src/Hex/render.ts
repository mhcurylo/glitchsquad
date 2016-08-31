import {WALL, SOLDIER} from '../Enums/enums';
import {Hex} from './interfaces';
import {GameState} from '../Engine/interfaces';


export function mapRender(state: GameState): string {
  return `<div id="hexmap" class="hexcontainer"> 
      ${state.hexMap.reduce((p, n, i) => p + lineRender(n, i), '')}
    </div>`;

  function lineRender(line: Hex[], lnum: number): string {
    return `<ol class="hexline hexline-${lnum % 2 ? 'even' : 'odd'}"> 
     ${line.reduce((p, n, i) => p + hexRender(n, lnum, i), '')} 
    </ol>`

    function hexRender(hex: Hex, lnum: number, cnum: number): string {
      return `<li class="hex 
	      ${hex.walls.reduce((p, n, i) => p + ' hw-' + i + '-' + '-' + n, '')}" 
	      id="hex-${lnum}-${cnum}">
         <div class="char">${hex.char}</div>
         <div class="sub">${hex.sub}</div>
         <div class="hoover">${hex.hoover}</div>
      </li>`;
    };
  }
};

