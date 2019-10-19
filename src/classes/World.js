import config from "../conf.json";
import Utils from "./Utils";
import Cell from "./Cell";
import Obstacle from "./Obstacle";

export default class World {
	constructor(univers) {
		this.univers = univers;
		/* this.nbWeapon = this.players.length;
		this.nbObject = this.players.length; */
		this.worldSizeY = config.nbCasesY;
		this.worldSizeX = config.nbCasesX;
		this.grid = [];
	}

	generateWorld(players, weapons, accessories) {
		for (let x = 0; x < this.worldSizeX; x++) {
			let line = [];
			for (let y = 0; y < this.worldSizeY; y++) {
				line.push(new Cell(x, y, []));
			}
			this.grid.push(line);
		}
		this.placeObstacles();
		this.placePlayers(players);
		this.placeAccessories("weapon", weapons);
		this.placeAccessories("accessory", accessories);

		console.log("grid", this.grid); //à laisser
		return this.grid;
	}
	placeObstacles() {
		for (let i = 0; i < config.nbObstacles; i++) {
			this.placeOneObstacle();
		}
	}
	placeOneObstacle() {
		let x = Math.floor(Math.random() * Math.floor(this.worldSizeX));
		let y = Math.floor(Math.random() * Math.floor(this.worldSizeY));
		if (Utils.isFreeCell(x, y, this.grid)) {
			let newObstacle = new Obstacle(this.univers);
			let newCell = new Cell(x, y, [newObstacle]);
			Utils.updateCell(x, y, newCell, this.grid);
		} else {
			this.placeOneObstacle();
		}
	}
	placePlayers(players) {
		for (let i = 0; i < players.length; i++) {
			const player = players[i];
			this.placeOnePlayer(player);
		}
	}
	placeOnePlayer(player) {
		let x = Math.floor(Math.random() * Math.floor(this.worldSizeX));
		let y = Math.floor(Math.random() * Math.floor(this.worldSizeY));
		if (Utils.isFreePlayerCell(x, y, this.grid)) {
			player.placeX = x;
			player.placeY = y;
			let newCell = new Cell(x, y, [player]);
			Utils.updateCell(x, y, newCell, this.grid);
		} else {
			this.placeOnePlayer(player);
		}
	}

	placeAccessories(objectToPlace, tabObjects) {
		for (let i = 0; i < tabObjects.length; i++) {
			const object = tabObjects[i];
			this.placeOneAccessory(objectToPlace, object);
		}
	}
	placeOneAccessory(objectToPlace, object) {
		let x = Math.floor(Math.random() * Math.floor(this.worldSizeX));
		let y = Math.floor(Math.random() * Math.floor(this.worldSizeY));
		if (Utils.isFreeCell(x, y, this.grid)) {
			let newCell = new Cell(x, y, [object]);
			Utils.updateCell(x, y, newCell, this.grid);
		} else {
			this.placeOneAccessory(objectToPlace, object);
		}
	}
}
