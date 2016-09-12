import {Soldier} from './interfaces';
import {GameState} from '../Engine/interfaces';

export function squadRender(soldiers: number[], state: GameState, full?: boolean): string {
  return `<div class="soldiers">
	${soldiers.reduce((p, c) => p + renderSoldier(state.soldiers[c]), '')}
</div>`;
  
  function renderSoldier(soldier: Soldier): string {
    const act = soldier.i === state.active;
    return `<div class="soldier s-t-${soldier.type}
			      s-p-${soldier.player} 
			      ${soldier.KIA ? ' s-kia' : ''}
			      ${act ? ' s-act' : ''}
			      ${soldier.disc ? ' s-data' : ''}">
     <div class="s-code">${soldier.code}</div>
     <div class="s-name">${soldier.name}</div>
     ${(full && act) ? '<div class="s-player"> P' + (soldier.player + 1) + '</div>' : ''}
     ${(full && act && !soldier.KIA && soldier.moves) ? acts() : ''}
    </div>`;
    
    function acts() {
      return `
     <div class="acts">
       <div class="ap">AP: ${soldier.moves}/${soldier.movesPerTurn}</div>
       <div id="skip-${soldier.i}">SKIP</div>
       ${on(state.disc) && !soldier.disc ? '<div class="s-action" id="grab-' + soldier.i + '"}>GRAB</div>' : ''}
       ${(soldier.disc && (on(state.evac[soldier.player]))) ? '<div class="s-action" id="evac-' + soldier.i + '">EVAC</div>' : ''}
     </div>
    `;
      function on(l: number[]): boolean {
        return (soldier.x === l[0] && soldier.y === l[1]);
      }
    }
  };
};

