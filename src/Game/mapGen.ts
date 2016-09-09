import {WALL, HEX, PLAYER} from '../Enums/enums';
import {Hex, HexMap} from '../Hex/interfaces';
import {randomHex, discHex, evacHex} from '../Hex/hexCreate';
import {getCords} from './mapCheck';
import {size} from './mapSize';

//placement of the data case, p1, p2
const placements = [
  [[1, size[1] / 2 - 1], [size[0] - 1, 1], [size[0] - 2, size[1] - 2]],
  [[size[0] - 1, size[1] / 2 - 1], [1, 1], [1, size[1] - 3]],
  [[size[0] / 2 - 1, 1], [1, size[1] - 2], [size[0] - 2, size[1] - 2]],
  [[size[0] / 2 - 1, size[1] - 1], [1, 1], [size[0] - 2, 1]]
];

export function mapGen(): HexMap {
  return trimMap(placeItems(randomMap()));
  
  function randomMap(): HexMap {
    return Array.from(new Array(size[0]), (a, y) => randomLine(y));
    
    function randomLine(y: number): Hex[] {
      return Array.from(new Array(size[1]), (b, x) => randomHex(x, y));
    }
  }
  
  function placeItems(map: HexMap): HexMap {
    const place = placements[Math.floor(Math.random() * placements.length)];
    const pop = Math.random() > 0.5;
    const d = place[0];
    const p1 = place[pop ? 1 : 2];
    const p2 = place[pop ? 2 : 1];
    map[d[0]][d[1]] = discHex(d[1], d[0]);
    map[p1[0]][p1[1]] = evacHex(p1[1], p1[0], PLAYER.ONE);
    map[p2[0]][p2[1]] = evacHex(p2[1], p2[0], PLAYER.TWO);
    
    return map;
  }
  
}

export function trimMap(map: HexMap): HexMap {
  return map.map((l, li) => l.map((h, hi) => trimHex(li, h, hi)));
  
  function trimHex(li: number, h: Hex, hi: number): Hex {
    h.walls = h.walls.map((w, wi) => trimWall(li, h, hi, w, wi));
    return h;
    
    function trimWall(li: number, h: Hex, hi: number, w: WALL, wi: number): WALL {
      if ((w !== WALL.NOT) && (h.type !== HEX.EMPTY) && (h.type !== HEX.DISC)) {
        const {x, y} = getCords(hi, li, wi);
        if ((y < 0) || (x < 0) || (size[0] - 1 < y) || (size[1] - 1 < x)) {
          return maybeTrim(w, 0.2);
        }
        if (!map[y] || !map[y][x]) {
          return w;
        }
        
        const neighbour = map[y][x];
        
        if ((neighbour.type === HEX.EMPTY) || (neighbour.walls[(wi + 3) % 6] === WALL.NOT)) {
          return maybeTrim(w, 0.1);
        }
      }
      return w;
      
      function maybeTrim(w: WALL, chance: number) {
        return Math.random() > chance ? WALL.NOT : w;
      }
    }
  }
}

