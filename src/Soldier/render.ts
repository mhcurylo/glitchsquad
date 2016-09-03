import {Soldier} from './interfaces';
import {GameState} from '../Engine/interfaces';

export function squadRender(soldiers: Soldier[], state: GameState, full?: boolean): string {
  return `<div class="soldiers">
	${soldiers.reduce((p, c) => p + renderSoldier(c), '')}
</div>`;

  function renderSoldier(soldier: Soldier): string {
    const act = soldier.i === state.active;
    return `<div class="soldier s-t-${soldier.type}
			      s-p-${soldier.player}
			      ${soldier.KIA ? 's-kia' : ''}
			      ${act ? 's-act' : ''}
			      ${soldier.classNames ? soldier.classNames : ''}">
     <div class="s-code">${soldier.code}</div>
     <div class="s-name">${soldier.name}</div>
     ${(full && act) ? acts() : ''}
    </div>`; 

    function acts() {
      return `
     <div class="acts">
       <div id="skip-${soldier.i}">SKIP</div>
       ${on(state.disc) ? '<div class="s-action">GRAB</div>' : ''}
       ${(on(state.disc) && (state.evac[soldier.player])) ? '<div class="s-action">EVAC</div>' : ''}
     </div>
    `;
      function on(l: number[]): boolean {
        return (soldier.x === l[0] && soldier.y === l[1]);
      }
    }
  };
};

