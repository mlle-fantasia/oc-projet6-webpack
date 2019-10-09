import config from "../conf.json";
import Player from "./Player";

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
	static testMove(grid, player) {
		let avantage = false;
		let x = player.placeX;
		let y = player.placeY;
		if (player.pointFort.value === "fast") {
			avantage = calculChanceAvantage(player);
		}
		this.testMoveLeft(x, y, grid, avantage);
		this.testMoveTop(x, y, grid, avantage);

		this.testMoveBottom(x, y, grid, avantage);
		this.testMoveRight(x, y, grid, avantage);

		/* this.testMoveRight(x, y, grid, avantage);
		this.testMoveBottom(y, x, y + 1, grid, avantage);
		this.testMoveLeft(y, x, y - 1, grid, avantage); */
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
					grid[x][i].movable = false;
					return;
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
					grid[i][y].movable = false;
					return;
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
					grid[i][y].movable = false;
					return;
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
					grid[x][i].movable = false;
					return;
				}
			}
		}
	}

	/* static testMoveOneDirection(val1, val2, val3, grid, avantage) {
		console.log("val1, val2, val3", val1, val2, val3);
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		if (val3 > val1) {
			for (let i = val3; i <= val1 + nbCaseMaxToMove; i++) {
				if (this.isExistCell(val1, val2)) {
					let cellEmpty = this.isFreeCell(i, val2, grid);
					if (cellEmpty) {
						grid[val2][i].movable = true;
						console.log("grid[i][y] empty", grid[val2][i]);
					} else {
						grid[val2][i].movable = false;
						console.log("grid[i][y] not empty", grid[val2][i]);
						return;
					}
				}
			}
		}
		if (val3 < val1) {
			for (let i = val3; i <= val1 - nbCaseMaxToMove; i++) {
				if (this.isExistCell(val1, val2)) {
					let cellEmpty = this.isFreeCell(i, val2, grid);
					if (cellEmpty) {
						grid[i][val2].movable = true;
						console.log("grid[i][y] empty", grid[i][val2]);
					} else {
						grid[i][val2].movable = false;
						console.log("grid[i][y] not empty", grid[i][val2]);
						return;
					}
				}
			}
		} */
	/* for (let i = x - 1; i <= x - nbCaseMaxToMove; i++) {
			if (this.isExistCell(x, y)) {
				let cellEmpty = this.isFreeCell(i, y, grid);

				if (cellEmpty) {
					grid[i][y].movable = true;
					console.log("grid[i][y]", grid[i][y]);
				} else {
					grid[i][y].movable = false;
				}
			}
		}
		for (let i = y + 1; i <= y + nbCaseMaxToMove; i++) {
			if (this.isExistCell(x, y)) {
				let cellEmpty = this.isFreeCell(x, i, grid);

				if (cellEmpty) {
					grid[x][i].movable = true;
				} else {
					grid[x][i].movable = false;
				}
			}
		}
		for (let i = y - 1; i <= y - nbCaseMaxToMove; i++) {
			if (this.isExistCell(x, y)) {
				let cellEmpty = this.isFreeCell(x, i, grid);

				if (cellEmpty) {
					grid[x][i].movable = true;
				} else {
					grid[x][i].movable = false;
				}
			}
		} */
	/* } */

	// test s'il y a un joueur à côté
	static testAttack(x, y, grid, player) {}

	calculChanceAvantage(player) {
		let chance = Math.floor(Math.random() * Math.floor(100));
		console.log("chance", chance);
		if (chance <= player.pointFort.chance) {
			return true;
		} else {
			return false;
		}
	}
}
