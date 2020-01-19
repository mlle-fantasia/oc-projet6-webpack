import config from "../conf.json";
import Player from "./Player";
import Obstacle from "./Obstacle";
import Modal from "./Modal.js";
import "babel-polyfill";
import Weapon from "./Weapon.js";

export default class Utils {
	constructor() {}

	static tabHeroes() {
		const tabHeroes = {
			1: {
				text: "L'elfe inventeur fou",
				type: "motorisé",
				pointVie: 30,
				force: 10,
				pointFort: { value: "fast", text: "peut avancer plus vite", chance: 100 },
				image: "/images/players/img/hero1.jpg"
			},
			2: {
				text: "L'elfe dresseur le dragon",
				type: "ailé",
				pointVie: 30,
				force: 10,
				pointFort: { value: "attack", text: "peut attaquer deux fois", chance: 100 },
				image: "/images/players/img/hero2.jpg"
			},
			3: {
				text: "Le mercenaire venu du sud",
				type: "énervé",
				pointVie: 30,
				force: 10,
				pointFort: { value: "steal", text: "peut voler un objet", chance: 100 },
				image: "/images/players/img/hero3.jpg"
			},
			4: {
				text: "L'homme des cavernes aveugle",
				type: "force-calme",
				pointVie: 30,
				force: 10,
				pointFort: { value: "move", text: "peut déplacer les obstacles", chance: 100 },
				image: "/images/players/img/hero4.jpg"
			},
			5: {
				text: "Le gardien de la citadelle",
				type: "patriote",
				pointVie: 30,
				force: 10,
				pointFort: { value: "long", text: "peut attaquer de plus loin", chance: 100 },
				image: "/images/players/img/hero5.jpg"
			},
			6: {
				text: "Le maître du destin",
				type: "joueur",
				pointVie: 30,
				force: 10,
				pointFort: { value: "copy", text: "peut imiter le point fort d'un autre joueur", chance: 100 },
				image: "/images/players/img/hero6.jpg"
			},
			7: {
				text: "Le puant",
				type: "dépendant",
				pointVie: 30,
				force: 10,
				pointFort: { value: "teath", text: "à les dents asserrées", chance: 100 },
				image: ""
			},
			8: {
				text: "Elfe dechu",
				type: "",
				pointVie: 15,
				force: 10,
				pointFort: { value: "orc", text: "", chance: 100 },
				image: ""
			},
			9: {
				text: "Ainur Dechu",
				type: "",
				pointVie: 50,
				force: 10,
				pointFort: { value: "melko", text: "A la puissance d'un dieu", chance: 100 },
				image: ""
			}
		};
		return tabHeroes;
	}

	static showModal(player, functionToCall, object, remainingPlayers, univers) {
		if (functionToCall === "takeObject") {
			functionToCall = object.constructor.name;
		}
		console.log("univers", univers);
		let modal = new Modal(player, functionToCall, object, remainingPlayers, univers);
		$("#game").prepend(modal.render());
		let resonseModal = "pas encore de réponse";
		return new Promise(resolve => {
			$(".modal-response").click(e => {
				$(".container-modal-component").remove();
				resolve(e.target.dataset.response === "true" || e.target.dataset.response === "univers");
			});
		});
	}

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
	static defineXandY() {
		let x = Math.floor(Math.random() * Math.floor(config.nbCasesX));
		let y = Math.floor(Math.random() * Math.floor(config.nbCasesY));
		return { x, y };
	}
	static isPlayerToFight(x, y, grid, distance) {
		let playersToFight = [];
		for (let i = y - 1; i >= y - distance; i--) {
			if (this.isExistCell(x, i)) {
				if (!this.isFreeCell(x, i, grid)) {
					if (grid[x][i].objects[0] instanceof Player) {
						playersToFight.push(grid[x][i].objects[0]);
					}
					if (grid[x][i].objects.length > 1 && grid[x][i].objects[1] instanceof Player) {
						playersToFight.push(grid[x][i].objects[1]);
					}
				}
			}
		}
		for (let i = x - 1; i >= x - distance; i--) {
			if (this.isExistCell(i, y)) {
				if (!this.isFreeCell(i, y, grid)) {
					if (grid[i][y].objects[0] instanceof Player) {
						playersToFight.push(grid[i][y].objects[0]);
					}
					if (grid[i][y].objects.length > 1 && grid[i][y].objects[1] instanceof Player) {
						playersToFight.push(grid[i][y].objects[1]);
					}
				}
			}
		}
		for (let i = x + 1; i <= x + distance; i++) {
			if (this.isExistCell(i, y)) {
				if (!this.isFreeCell(i, y, grid)) {
					if (grid[i][y].objects[0] instanceof Player) {
						playersToFight.push(grid[i][y].objects[0]);
					}
					if (grid[i][y].objects.length > 1 && grid[i][y].objects[1] instanceof Player) {
						playersToFight.push(grid[i][y].objects[1]);
					}
				}
			}
		}
		for (let i = y + 1; i <= y + distance; i++) {
			if (this.isExistCell(x, i)) {
				if (!this.isFreeCell(x, i, grid)) {
					if (grid[x][i].objects[0] instanceof Player) {
						playersToFight.push(grid[x][i].objects[0]);
					}
					if (grid[x][i].objects.length > 1 && grid[x][i].objects[1] instanceof Player) {
						playersToFight.push(grid[x][i].objects[1]);
					}
				}
			}
		}
		if (playersToFight.length) {
			return playersToFight[Math.floor(playersToFight.length * Math.random())];
		} else {
			return false;
		}
	}

	// test si un joueur se trouve à côté de la case fournie en paramètre
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
			let nbObsNear = this.isObstacleNear(x, y, grid, true);
			if (nbObsNear > 1) {
				return false;
			} else {
				return true;
			}
		}
	}

	// test si un obstacle se trouve à côté de la case fournie en paramètre
	// si en paramètre est donné "nombre" renvoie le nombre d'obstacle à proximité
	// si non, renvoie les coordonnées de la case où se situ l'obstacle
	static isObstacleNear(x, y, grid, nombre) {
		// pour un grille carrée
		let nbObstacle = [];
		let cellLeft, cellRight, cellTop, cellBottom;
		x > 0 ? (cellLeft = grid[x - 1][y]) : (cellLeft = grid[x][y]);
		x < grid.length - 1 ? (cellRight = grid[x + 1][y]) : (cellRight = grid[x][y]);
		y > 0 ? (cellTop = grid[x][y - 1]) : (cellTop = grid[x][y]);
		y < grid.length - 1 ? (cellBottom = grid[x][y + 1]) : (cellBottom = grid[x][y]);
		if (cellLeft.objects.length && cellLeft.objects[0] instanceof Obstacle) {
			nbObstacle.push(cellLeft);
		}
		if (cellRight.objects.length && cellRight.objects[0] instanceof Obstacle) {
			nbObstacle.push(cellRight);
		}
		if (cellTop.objects.length && cellTop.objects[0] instanceof Obstacle) {
			nbObstacle.push(cellTop);
		}
		if (cellBottom.objects.length && cellBottom.objects[0] instanceof Obstacle) {
			nbObstacle.push(cellBottom);
		}
		if (nombre) {
			return nbObstacle.length;
		} else {
			if (nbObstacle.length) {
				let cellObsFrom = nbObstacle[Math.floor(nbObstacle.length * Math.random())];
				let cellObsTo = { x: 0, y: 0 };
				if (x === cellObsFrom.x) {
					if (cellObsFrom.y > 0 && cellObsFrom.y < 9) {
						y < cellObsFrom.y ? (cellObsTo.y = cellObsFrom.y + 1) : (cellObsTo.y = cellObsFrom.y - 1);
						cellObsTo.x = cellObsFrom.x;
					} else {
						return false;
					}
				}
				if (y === cellObsFrom.y) {
					if (cellObsFrom.x > 0 && cellObsFrom.x < 9) {
						x < cellObsFrom.x ? (cellObsTo.x = cellObsFrom.x + 1) : (cellObsTo.x = cellObsFrom.x - 1);
						cellObsTo.y = cellObsFrom.y;
					} else {
						return false;
					}
				}
				if (this.isFreeCell) {
					return { cellObsFrom, cellObsTo };
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}
	// renvoie les déplacements possibles du joueur
	static showMove(grid, x, y, ptfort) {
		let tabMovableCell = [];
		let avantage = false;
		if (ptfort.value === "fast") {
			avantage = this.calculChanceAvantage(ptfort);
		}
		this.testMoveLeft(x, y, grid, avantage, tabMovableCell);
		this.testMoveTop(x, y, grid, avantage, tabMovableCell);
		this.testMoveBottom(x, y, grid, avantage, tabMovableCell);
		this.testMoveRight(x, y, grid, avantage, tabMovableCell);
		return tabMovableCell;
	}
	static testMoveLeft(x, y, grid, avantage, tabMovableCell) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = y - 1; i >= y - nbCaseMaxToMove; i--) {
			if (this.isExistCell(x, i)) {
				let cellEmpty = this.isFreeCell(x, i, grid);
				if (cellEmpty) {
					grid[x][i].movable = true;
					tabMovableCell.push({ x: x, y: i });
				} else {
					if (
						grid[x][i].objects[0] instanceof Player ||
						grid[x][i].objects[0] instanceof Obstacle ||
						(grid[x][i].objects[1] && grid[x][i].objects[1] instanceof Player)
					) {
						grid[x][i].movable = false;
						return;
					} else {
						grid[x][i].movable = true;
						tabMovableCell.push({ x: x, y: i });
					}
				}
			}
		}
	}
	static testMoveTop(x, y, grid, avantage, tabMovableCell) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = x - 1; i >= x - nbCaseMaxToMove; i--) {
			if (this.isExistCell(i, y)) {
				let cellEmpty = this.isFreeCell(i, y, grid);
				if (cellEmpty) {
					grid[i][y].movable = true;
					tabMovableCell.push({ x: i, y: y });
				} else {
					if (
						grid[i][y].objects[0] instanceof Player ||
						grid[i][y].objects[0] instanceof Obstacle ||
						(grid[i][y].objects[1] && grid[i][y].objects[1] instanceof Player)
					) {
						grid[i][y].movable = false;
						return;
					} else {
						grid[i][y].movable = true;
						tabMovableCell.push({ x: i, y: y });
					}
				}
			}
		}
	}
	static testMoveBottom(x, y, grid, avantage, tabMovableCell) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = x + 1; i <= x + nbCaseMaxToMove; i++) {
			if (this.isExistCell(i, y)) {
				let cellEmpty = this.isFreeCell(i, y, grid);
				if (cellEmpty) {
					grid[i][y].movable = true;
					tabMovableCell.push({ x: i, y: y });
				} else {
					if (
						grid[i][y].objects[0] instanceof Player ||
						grid[i][y].objects[0] instanceof Obstacle ||
						(grid[i][y].objects[1] && grid[i][y].objects[1] instanceof Player)
					) {
						grid[i][y].movable = false;
						return;
					} else {
						grid[i][y].movable = true;
						tabMovableCell.push({ x: i, y: y });
					}
				}
			}
		}
	}

	static testMoveRight(x, y, grid, avantage, tabMovableCell) {
		let nbCaseMaxToMove = 3;
		if (avantage) {
			nbCaseMaxToMove = 4;
		}
		for (let i = y + 1; i <= y + nbCaseMaxToMove; i++) {
			if (this.isExistCell(x, i)) {
				let cellEmpty = this.isFreeCell(x, i, grid);
				if (cellEmpty) {
					grid[x][i].movable = true;
					tabMovableCell.push({ x: x, y: i });
				} else {
					if (
						grid[x][i].objects[0] instanceof Player ||
						grid[x][i].objects[0] instanceof Obstacle ||
						(grid[x][i].objects[1] && grid[x][i].objects[1] instanceof Player)
					) {
						grid[x][i].movable = false;
						return;
					} else {
						grid[x][i].movable = true;
						tabMovableCell.push({ x: x, y: i });
					}
				}
			}
		}
	}

	static calculChanceAvantage(ptfort) {
		let chance = Math.floor(Math.random() * Math.floor(100));
		//console.log("chance", chance);
		if (chance <= ptfort.chance) {
			return true;
		} else {
			return false;
		}
	}
	static updateCell(x, y, cell, grid) {
		// todo gérer les erreurs
		grid[x][y] = cell;
	}
}
