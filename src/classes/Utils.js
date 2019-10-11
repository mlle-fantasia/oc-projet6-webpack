import config from "../conf.json";
import Player from "./Player";
import Obstacle from "./Obstacle";
import Accessory from "./Accessory.js";
import Weapon from "./Weapon.js";

export default class Utils {
	constructor() {}
	static isExistCell(x, y) {
		if (x >= config.nbCasesX || y >= config.nbCasesY || x < 0 || y < 0) {
			return false;
		} else {
			return true;
		}
	}
	static isFreeCell(x, y, grid) {
		let cell = grid[x][y];
		if (cell.objects.length) {
			return false;
		} else {
			return true;
		}
	}
	static isFreePlayerCell(x, y, grid) {
		// pour un grille carrée
		let cellEmpty = this.isFreeCell(x, y, grid);
		if (!cellEmpty) return false;
		let cellLeft, cellRight, cellTop, cellBottom;
		x > 0 ? (cellLeft = grid[x - 1][y]) : (cellLeft = grid[x][y]);
		x < grid.length - 1 ? (cellRight = grid[x + 1][y]) : (cellRight = grid[x][y]);
		y > 0 ? (cellTop = grid[x][y - 1]) : (cellTop = grid[x][y]);
		y < grid.length - 1 ? (cellBottom = grid[x][y + 1]) : (cellBottom = grid[x][y]);
		if (
			(cellLeft.objects.length && cellLeft.objects[0] instanceof Player) ||
			(cellRight.objects.length && cellRight.objects[0] instanceof Player) ||
			(cellTop.objects.length && cellTop.objects[0] instanceof Player) ||
			(cellBottom.objects.length && cellBottom.objects[0] instanceof Player)
		) {
			return false;
		} else {
			return true;
		}
	}
	// renvoie les déplacements possibles du joueur
	static testMove(grid, x, y, ptfort) {
		let avantage = false;
		if (ptfort.value === "fast") {
			avantage = this.calculChanceAvantage(ptfort);
		}
		this.testMoveLeft(x, y, grid, avantage);
		this.testMoveTop(x, y, grid, avantage);

		this.testMoveBottom(x, y, grid, avantage);
		this.testMoveRight(x, y, grid, avantage);
	}
	static testMoveLeft(x, y, grid, avantage) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = y - 1; i >= y - nbCaseMaxToMove; i--) {
			if (this.isExistCell(x, i)) {
				let cellEmpty = this.isFreeCell(x, i, grid);
				if (cellEmpty) {
					grid[x][i].movable = true;
				} else {
					if (grid[x][i].objects[0] instanceof Player || grid[x][i].objects[0] instanceof Obstacle) {
						console.log("grid[x][i]", grid[x][i]);
						grid[x][i].movable = false;
						return;
					} else {
						console.log("grid[x][i] movable ok arme", grid[x][i].objects[0]);
						grid[x][i].movable = true;
					}
				}
			}
		}
	}
	static testMoveTop(x, y, grid, avantage) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = x - 1; i >= x - nbCaseMaxToMove; i--) {
			if (this.isExistCell(i, y)) {
				let cellEmpty = this.isFreeCell(i, y, grid);
				if (cellEmpty) {
					grid[i][y].movable = true;
				} else {
					if (grid[i][y].objects[0] instanceof Player || grid[i][y].objects[0] instanceof Obstacle) {
						grid[i][y].movable = false;
						return;
					} else {
						grid[i][y].movable = true;
					}
				}
			}
		}
	}
	static testMoveBottom(x, y, grid, avantage) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = x + 1; i <= x + nbCaseMaxToMove; i++) {
			if (this.isExistCell(i, y)) {
				let cellEmpty = this.isFreeCell(i, y, grid);
				if (cellEmpty) {
					grid[i][y].movable = true;
				} else {
					if (grid[i][y].objects[0] instanceof Player || grid[i][y].objects[0] instanceof Obstacle) {
						grid[i][y].movable = false;
						return;
					} else {
						grid[i][y].movable = true;
					}
				}
			}
		}
	}

	static testMoveRight(x, y, grid, avantage) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = y + 1; i <= y + nbCaseMaxToMove; i++) {
			if (this.isExistCell(x, i)) {
				let cellEmpty = this.isFreeCell(x, i, grid);
				if (cellEmpty) {
					grid[x][i].movable = true;
				} else {
					if (grid[x][i].objects[0] instanceof Player || grid[x][i].objects[0] instanceof Obstacle) {
						grid[x][i].movable = false;
						return;
					} else {
						grid[x][i].movable = true;
					}
				}
			}
		}
	}

	// test s'il y a un joueur à côté
	static testAttack(x, y, grid, player) {}

	static calculChanceAvantage(ptfort) {
		let chance = Math.floor(Math.random() * Math.floor(100));
		console.log("chance", chance);
		if (chance <= ptfort.chance) {
			return true;
		} else {
			return false;
		}
	}
}
