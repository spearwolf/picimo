import {sample} from './utils.js';

const WALL      = 0;
const UNVISITED = 1;
const FLOOR     = 2;

export class RecursiveBacktracker {

  constructor(grid) {
    this.grid = grid;
    this.isFinished = false;
  }
  r
  start() {
    this.grid.setAll(WALL);
    this.grid.setAllCells(UNVISITED);

    const cell = this.grid.randomCell();
    cell.value = FLOOR;

    this.isHuntMode = false;
    this.visitedCells = [cell];
  }

  get currentCell() {
    if (this.visitedCells) {
      return this.visitedCells[this.visitedCells.length - 1];
    }
  }

  set currentCell(cell) {
    this.visitedCells.push(cell);
  }

  nextStep() {

    let cell;

    if (this.isHuntMode) {

      while ((cell = this.visitedCells.pop())) {

        const unvisited = cell.filterNeighbors(UNVISITED);

        if (unvisited.length > 0) {
          this.currentCell = cell;
          this.isHuntMode = false;
          return;
        }
      }

      this.isFinished = true;
      return;

    } else {

      cell = sample(this.currentCell.filterNeighbors(UNVISITED));

      if (cell) {

        cell.value = FLOOR;
        this.currentCell.setInterjacentValue(cell, FLOOR);
        this.currentCell = cell;

      } else {
        this.isHuntMode = true;
      }

    }
  }

  build() {
    this.start();
    while (!this.isFinished) {
      this.nextStep();
    }
  }

}
