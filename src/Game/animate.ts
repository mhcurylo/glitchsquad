import {ANIME, DO} from '../Enums/enums';
import {Animation, Action} from '../Engine/interfaces';

export function gameAnimate (animation: Animation, doIt: (action: Action) => void): void {
   switch (animation.anime) {
     case ANIME.CHECKLEVEL:
       setTimeout(() => doIt({do: DO.CHECKLEVEL, payload: {}}), 1900);
     case ANIME.DELAY200:
       setTimeout(() => doIt(animation.payload), 200);
   };
}
