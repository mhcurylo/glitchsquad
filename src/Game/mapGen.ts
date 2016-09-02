import {WALL, HEX, PLAYER} from '../Enums/enums';
import {Hex, HexMap} from '../Hex/interfaces';
import {randomHex, discHex, evacHex} from '../Hex/hexCreate';

export const cords = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]],
               [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];

export const size = [8, 10];

//placement of the data case, p1, p2
const placements = [
  [[1, size[1]/2 - 1], [size[0] - 1, 1], [size[0] - 2, size[1] - 2]],
  [[size[0] - 1, size[1]/2 - 1], [1, 1], [1, size[1] -3]],
  [[size[0]/2 - 1, 1], [1, size[1]-2], [size[0]-2, size[1] -2]],
  [[size[0]/2 - 1, size[1]-1], [1, 1], [size[0]-2, 1]]
];

export function mapGen(): HexMap {
  return trimMap(placeItems(randomMap()));
  
  function randomMap(): HexMap {
    return Array.from(new Array(size[0]), randomLine);
    
    function randomLine(): Hex[] {
      return Array.from(new Array(size[1]), randomHex);
    }
  }

  function placeItems(map: HexMap): HexMap {
    const place = placements[Math.floor(Math.random()*placements.length)];
    const pop = Math.random() > 0.5;
    const d = place[0];
    const p1 = place[pop ? 1 : 2];
    const p2 = place[pop ? 2 : 1]; 
    map[d[0]][d[1]] = discHex();
    map[p1[0]][p1[1]] = evacHex(PLAYER.ONE);
    map[p2[0]][p2[1]] = evacHex(PLAYER.TWO);

    return map;   
  }

  function trimMap(map: HexMap): HexMap {
    return map.map((l, li) => l.map((h, hi) => trimHex(l, li, h, hi)));

    function trimHex(l ,li, h, hi) {
      h.walls = h.walls.map((w, wi) => trimWall(l, li, h, hi, w, wi));
      return h;
 
      function trimWall(l, li, h, hi, w, wi) {
	if ((w !== WALL.NOT) && (h.type !== HEX.EMPTY)) {
          let [y, x] = cords[li % 2][wi];
          x = x + li;
	  y = y + hi;

	  if ((x < 0) || (y < 0) || (size[0] - 1 < x) || (size[1] - 1 < y)) {
	     return maybeTrim(w);
	  }
	  const nei = map[x][y];
	  
          if   ((nei.type === HEX.EMPTY) || (nei.walls[(wi + 3) % 6] === WALL.NOT)) {
            return maybeTrim(w);
	  }     
       	}
	return w;
        
        function maybeTrim(w: WALL) {
          return Math.random() > 0.00 ? WALL.NOT : w;
        }
      };
    };
  };
}

