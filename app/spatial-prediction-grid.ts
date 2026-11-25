export const ANIMATION_SECONDS = 8;
export const GRID_COLUMNS = 12;
export const GRID_ROWS = 10;
export const LAND_PATH = "M240 285 920 330 760 805 80 760Z";
export const BASE_PATH = "M80 760 760 805 920 330 920 367 760 842 80 797Z";

const palette = ["#91d9cc", "#b8ebd3", "#c8e7be", "#e9e0ba", "#f5d3b8", "#d5c5ed"];
const locations = [
  { id: "observation-1", column: 2, row: 2 },
  { id: "observation-2", column: 2, row: 7 },
  { id: "observation-3", column: 10, row: 6 },
];

// Distance is measured in the map grid, before the perspective projection.
function project(column: number, row: number) {
  return { x: 240 + column / GRID_COLUMNS * 680 - row / GRID_ROWS * 160,
    y: 285 + column / GRID_COLUMNS * 45 + row / GRID_ROWS * 475 };
}

function cellColor(column: number, row: number) {
  const field = Math.sin(column * .53) + Math.cos(row * .67) + .6 * Math.sin((column + row) * .61);
  const band = Math.max(0, Math.min(palette.length - 1, Math.floor((field + 2.6) / 5.2 * palette.length)));
  return palette[band];
}

export const OBSERVATION_SITES = locations.map(site => ({
  ...site, ...project(site.column + .5, site.row + .5), color: cellColor(site.column, site.row),
}));

const cells = Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, id) => {
  const column = id % GRID_COLUMNS;
  const row = Math.floor(id / GRID_COLUMNS);
  const distanceSquared = Math.min(...locations.map(site => (column - site.column) ** 2 + (row - site.row) ** 2));
  const distance = Math.sqrt(distanceSquared);
  const corners = [project(column, row), project(column + 1, row), project(column + 1, row + 1), project(column, row + 1)];
  return {
    id, column, row, distance, observed: distance === 0,
    path: corners.map((point, index) => `${index ? "L" : "M"}${point.x} ${point.y}`).join(" ") + "Z",
    color: cellColor(column, row),
  };
});
const maximumDistance = Math.max(...cells.map(cell => cell.distance));

export const GRID_CELLS = cells.map(cell => ({
  ...cell,
  // All equally distant cells begin together; the three observations stay visible.
  startPercent: (1 + cell.distance / maximumDistance * 3.8) / ANIMATION_SECONDS * 100,
  endPercent: (1.22 + cell.distance / maximumDistance * 3.8) / ANIMATION_SECONDS * 100,
}));
