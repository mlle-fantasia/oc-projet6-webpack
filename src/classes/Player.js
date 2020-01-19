import Cell from "./Cell";
import Utils from "./Utils";
import Accessory from "./Accessory";
import Weapon from "./Weapon";
import Obstacle from "./Obstacle";
import Gate from "./Gate";

export default class Player {
	constructor(name, heroNum, playerNum, accessories, canMove = false) {
		let forceOrc = Math.trunc(Math.random() * (20 - 8) + 8);
		const tabHeroes = Utils.tabHeroes();
		tabHeroes[8].pointVie = forceOrc;

		this.canMove = canMove;
		this.playerName = name;
		this.playerNum = playerNum;
		this.heroNum = heroNum;
		this.hero = tabHeroes[heroNum].text;
		this.image = "hero" + heroNum;
		this.imageGrid = "hero" + heroNum + "-grid";
		this.ptVieMax = tabHeroes[heroNum].pointVie;
		this.ptVie = tabHeroes[heroNum].pointVie;
		this.type = tabHeroes[heroNum].type;
		this.pointFort = tabHeroes[heroNum].pointFort;
		this.accessories = accessories;
		this.placeX;
		this.placeY;
		this.movableCell;
		this.type = "Player";
		//this.playerInfo = this.showPlayerInfo();
	}
	showMove(grid) {
		this.movableCell = Utils.showMove(grid, this.placeX, this.placeY, this.pointFort);
	}

	// test si une case est movable , return true ou false
	isMovableCell(x, y, grid) {
		if (grid[x][y].movable === true) {
			return true;
		} else {
			return false;
		}
	}
	move(x, y, grid) {
		if (grid[this.placeX][this.placeY].objects.length > 1) {
			grid[this.placeX][this.placeY].objects.splice(1, 1);
		} else {
			grid[this.placeX][this.placeY].objects = [];
		}
		let reste = grid[this.placeX][this.placeY].objects;
		let oldPlayerCell = new Cell(x, y, reste);
		//let oldPlayerCell = new Cell(this.placeX, this.placeY, []);
		Utils.updateCell(this.placeX, this.placeY, oldPlayerCell, grid);
		this.placeX = x;
		this.placeY = y;
		let newPlayerCell;
		if (grid[x][y].objects && grid[x][y].objects.length) {
			grid[x][y].objects.push(this);
			newPlayerCell = grid[x][y];
		} else {
			newPlayerCell = new Cell(x, y, [this]);
		}
		Utils.updateCell(x, y, newPlayerCell, grid);
		//console.log("newPlayerCell", newPlayerCell);
		for (let c = 0; c < this.movableCell.length; c++) {
			const coordinate = this.movableCell[c];
			grid[coordinate.x][coordinate.y].movable = false;
		}
	}
	moveObstacle(isObsToMove, grid, univers) {
		let emptyCell = new Cell(this.placeX, this.placeY, []);
		Utils.updateCell(this.placeX, this.placeY, emptyCell, grid);
		this.placeX = isObsToMove.cellObsFrom.x;
		this.placeY = isObsToMove.cellObsFrom.y;
		let newPlayerCell = new Cell(this.placeX, this.placeY, [this]);
		Utils.updateCell(this.placeX, this.placeY, newPlayerCell, grid);
		let obs = new Obstacle(univers);
		let newObstacleCell = new Cell(this.placeX, this.placeY, [obs]);
		Utils.updateCell(isObsToMove.cellObsTo.x, isObsToMove.cellObsTo.y, newObstacleCell, grid);
	}
	stealObject(isPlayerToSteal) {
		let objectSteal = isPlayerToSteal.accessories[1];
		this.accessories[1] = objectSteal;
		isPlayerToSteal.accessories.splice(1, 1);
	}
	hasGate(x, y, grid, retour = false) {
		if (grid[x][y].objects.length < 2) {
			return false;
		}
		if (grid[x][y].objects[0] instanceof Gate) {
			if (retour) {
				if (grid[x][y].objects[0].imageGrid === "Gate6-grid-aigle" || grid[x][y].objects[0].imageGrid === "Gate5-grid") {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		}
	}
	hasObjectToTake(x, y, grid) {
		if (grid[x][y].objects.length < 2) return false;
		if (grid[x][y].objects[0] instanceof Gate) return false;
		let object = grid[x][y].objects[0];
		return object;
	}

	takeObject(x, y, grid, univers) {
		let objectGrid = grid[x][y].objects[0];
		let weaponPlayer = this.accessories[0];
		let accessoryPlayer;
		if (this.accessories[1]) {
			accessoryPlayer = this.accessories[1];
		}
		if (objectGrid instanceof Weapon) {
			this.accessories[0] = objectGrid;
			grid[x][y].objects[0] = weaponPlayer;
		}
		if (objectGrid instanceof Accessory) {
			if (univers === "5" || univers === "4") {
				this.accessories.push(objectGrid);
				grid[x][y].objects.shift();
			} else {
				this.accessories[1] = objectGrid;
				if (accessoryPlayer) {
					grid[x][y].objects[0] = accessoryPlayer;
				} else {
					grid[x][y].objects.shift();
				}
			}
		}
	}
}
