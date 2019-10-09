import config from "../conf.json";
import Utils from "./Utils";
import Cell from "./Cell";
import Player from "./Player";
import Obstacle from "./Obstacle";
import Weapon from "./Weapon";
import Accessory from "./Accessory";

export default class World {
	constructor(players, univers) {
		this.players = players;
		this.univers = univers;
		this.nbWeapon = this.players.length;
		this.nbObject = this.players.length;
		this.worldSizeY = config.nbCasesY;
		this.worldSizeX = config.nbCasesX;
		this.grid = [];
	}
	generatePlayers() {
		this.players = this.players.map((player, index) => {
			return new Player(player.playerName, player.hero, index + 1);
		});
	}
	generateWorld() {
		this.generatePlayers();
		for (let x = 0; x < this.worldSizeX; x++) {
			let line = [];
			for (let y = 0; y < this.worldSizeY; y++) {
				line.push(new Cell(x, y, []));
			}
			this.grid.push(line);
		}
		this.placeObstacles();
		this.placePlayers();
		this.placeAccessories("weapon");
		this.placeAccessories("accessory");

		console.log("grid", this.grid); //à laisser
		return this.grid;
	}

	placePlayers() {
		for (let i = 0; i < this.players.length; i++) {
			const player = this.players[i];
			this.placeOnePlayer(player, i + 1);
		}
	}
	placeOnePlayer(player, numPlayer) {
		let x = Math.floor(Math.random() * Math.floor(this.worldSizeX));
		let y = Math.floor(Math.random() * Math.floor(this.worldSizeY));
		if (Utils.isFreePlayerCell(x, y, this.grid)) {
			let newWeapon = new Weapon("initial");
			let newPlayer = this.players[numPlayer - 1];
			newPlayer.accessories = [newWeapon];
			newPlayer.placeX = x;
			newPlayer.placeY = y;
			let newCell = new Cell(x, y, [newPlayer]);
			this.updateCell(x, y, newCell);
		} else {
			this.placeOnePlayer(player);
		}
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
			this.updateCell(x, y, newCell);
		} else {
			this.placeOneObstacle();
		}
	}
	placeAccessories(objectToPlace) {
		for (let i = 0; i < this.players.length; i++) {
			this.placeOneAccessory(objectToPlace);
		}
	}
	placeOneAccessory(objectToPlace) {
		let x = Math.floor(Math.random() * Math.floor(this.worldSizeX));
		let y = Math.floor(Math.random() * Math.floor(this.worldSizeY));
		if (Utils.isFreeCell(x, y, this.grid)) {
			let newAccessory;
			if (objectToPlace === "accessory") {
				newAccessory = new Accessory();
			}
			if (objectToPlace === "weapon") {
				newAccessory = new Weapon();
			}

			let newCell = new Cell(x, y, [newAccessory]);
			this.updateCell(x, y, newCell);
		} else {
			this.placeOneAccessory(objectToPlace);
		}
	}
	updateCell(x, y, cell) {
		// todo gérer les erreurs
		this.grid[x][y] = cell;
	}
}
