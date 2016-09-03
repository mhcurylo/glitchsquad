import {Soldier} from './interfaces';

export function squadRender(soldiers: Soldier[]): string {
  return `<div class="soldiers">
	${soldiers.reduce((p, c) => p + renderSoldier(c), '')}
</div>`;
};

export function renderSoldier(soldier: Soldier) {
  return `<div class="soldier s-t-${soldier.type}
			      s-p-${soldier.player}
			      ${soldier.KIA ? 's-kia' : ''}
                              ${soldier.active ? 's-act' : ''}
			      ${soldier.classNames ? soldier.classNames : ''}">
   <div class="s-code">${soldier.code}</div>
   <div class="s-name">${soldier.name}</div>
  </div>`; 
};
