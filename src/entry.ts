import {start} from './Engine/main.ts';
import './main.scss';
declare const exports;  


if (typeof window === 'undefined') {
    exports['glitchsquadserver'] = start;
} else {
   window['glitchsquadclient'] = start;
}
