import {start} from './Engine/main.ts';
import './main.scss';
declare const exports;  
declare const module;

if (typeof window === 'undefined') {
  this['glitchsquad'] = 'aaa';
} else {
   window['glitchsquadclient'] = start;
}
