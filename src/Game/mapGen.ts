import {WALL} from '../Enums/enums';
import {Hex, HexMap} from '../Hex/interfaces';
import {randomHex} from '../Hex/hexCreate';

export function mapGen(): HexMap {
  return randomMap();
  
  function randomMap(): HexMap {
    return Array.from(new Array(10), randomLine);
    
    function randomLine(): Hex[] {
      return Array.from(new Array(13), randomHex);
    }
  }
}
