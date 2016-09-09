import {WALL, SOLDIER, HEX, SKILL} from '../Enums/enums';
import {Hex} from './interfaces';
import {GameState, Behaviour} from '../Engine/interfaces';
import {squadRender} from '../Soldier/render';

export function mapRender(state: GameState): string {
  return `<div id="hexmap" class="hexcontainer"> 
      ${state.hexMap.reduce((p, n, i) => p + lineRender(n, i), '')}
    </div>`;
  
  function lineRender(line: Hex[], lnum: number): string {
    return `<ol class="hexline hexline-${lnum % 2 ? 'even' : 'odd'}"> 
     ${line.reduce((p, n) => p + hexRender(n), '')} 
    </ol>`
    
    function hexRender(hex: Hex): string {
      return `<li class="hex ${hex.type === HEX.EMPTY ? 'empty' : ''}  
                     ${hex.classNames ? hex.classNames : ''}"
	      id="hex-${hex.x}-${hex.y}">
	       ${hex.type !== HEX.EMPTY ? walls(hex.walls) : ''}
               ${squadRender(hex.soldiers, state)}
	       ${(hex.type === HEX.CHAR) && (hex.char !== ' ') ? '<div class="char">' + hex.char + '</div>' : ''}
	       ${hex.type === HEX.DISC ? '<div class="evac disc">DATA</div>' : ''}
	       ${hex.type === HEX.EVAC ? '<div class="evac c-p' + hex.player + '">evac</div>' : ''}
	       ${acts(hex.acts)}
	  </li>`;
      function acts(behaviours: Behaviour[]): string {
        return `<div class="h-acts l${behaviours.length}">` + behaviours.reduce((p, c, i) => p +
          `<div class="h-act ${c.color}" 
	 id="${c.id}"><span>${c.display}</span></div>
        `, '') + '</div>';
      }
      
      function walls(walls: WALL[]): string {
        return walls.reduce((p, n, i) => p + `<div class="hw hw-a-${i} hw-t-${n}"></div>`, '')
      }
    }
  }
};

