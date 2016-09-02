import {WALL, SOLDIER, HEX} from '../Enums/enums';
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
      switch (hex.type) {
        case HEX.CHAR:
          return   `<li class="hex ${hex.classNames ? hex.classNames : ''}"  
	      id="hex-${lnum}-${cnum}">
	       ${walls(hex.walls)}
	      ${hex.char !== ' ' ? '<div class="char">' + hex.char + '</div>' : ''}
	  </li>`;
        case HEX.EVAC: 
	   return `<li class="hex ${hex.classNames ? hex.classNames : ''}"
	      id="hex-${lnum}-${cnum}">
	       ${walls(hex.walls)}
	       <div class="evac c-p${hex.player}">evac</div>
	  </li>`;
        case HEX.DISC: 
	   return `<li class="hex ${hex.classNames ? hex.classNames : ''}"
	      id="hex-${lnum}-${cnum}">
	       ${walls(hex.walls)}
               <div class="evac disc">DATA</div>
	  </li>`;
        case HEX.BASE: 
	   return `<li class="hex ${hex.classNames ? hex.classNames : ''}"
	      id="hex-${lnum}-${cnum}">
	       ${walls(hex.walls)}
	  </li>`;
        case HEX.EMPTY: 
          return  `<li class="hex empty ${hex.classNames ? hex.classNames : ''}" 
	      id="hex-${lnum}-${cnum}">
          </li>`; 
     }

    function walls(walls: WALL[]): string {
       return walls.reduce((p, n, i) => p + `<div class="hw hw-a-${i} hw-t-${n}"></div>`, '')
    }

//     return `<li class="hex ${hex.classNames ? hex.classNames : ''}  
//	      ${hex.walls.reduce((p, n, i) => p + ' hw-' + i + '-' + n, '')}" 
//	      id="hex-${lnum}-${cnum}">
//         <div class="char">${hex.char ? hex.char : ''}</div>
//         <div class="sub">${hex.sub ? hex.sub : ''}</div>
//         <div class="hoover">${hex.hoover ? hex.hoover : ''}</div>
//      </li>`;
    };
  }
};

