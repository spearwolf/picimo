import {
  MazeGrid,
  MazeCanvasRenderer,
  RecursiveBacktracker,
  DistanceGrid,
} from './legendary-mazes.js';

const maze          = new MazeGrid(48, 32);
const mazeBuilder   = new RecursiveBacktracker(maze);
const mazeDistances = new DistanceGrid(maze, 2);
const mazeRenderer  = new MazeCanvasRenderer(maze, ["#111", "#765", "#aaa", "#f30", "#ff3", "#3f3", "#3ff", "#03f"]);

mazeBuilder.build();
mazeDistances.build(maze.centralCell);
mazeRenderer.setDistanceGrid(mazeDistances, 2, { r: 256, g: 0, b: 32 }, { r: 230, g: 240, b: 255 });

console.log(maze);
console.log(mazeBuilder);
console.log(mazeDistances);
console.log(mazeRenderer);

console.log('maze width=', maze.width, 'height=', maze.height);

const canvas = document.getElementById('maze-canvas');

canvas.width = maze.width;
canvas.height = maze.height;

mazeRenderer.render(canvas.getContext('2d'));
