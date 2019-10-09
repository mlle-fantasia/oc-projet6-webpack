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
		this.worldSizeY = 10;
		this.worldSizeX = 10;
		this.grid = [];
	}
	generatePlayers() {
		this.players = this.players.map((player, index) => {
			return new Player(player.playerName, player.hero, index + 1);
		});
	}
	generateWorld() {
		this.generatePlayers();
		for (let y = 0; y < this.worldSizeY; y++) {
			let line = [];
			for (let x = 0; x < this.worldSizeX; x++) {
				line.push(new Cell([]));
			}
			this.grid.push(line);
		}
		this.placePlayers();
		this.placeObstacles();
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
			let newPlayer = this.players[Math.floor(this.players.length * Math.random())];
			newPlayer.accessories = [newWeapon];
			let newCell = new Cell([newPlayer]);
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
			let newCell = new Cell([newObstacle]);
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
				newAccessory = newAccessory = new Accessory();
			}
			if (objectToPlace === "weapon") {
				newAccessory = newAccessory = new Weapon();
			}

			let newCell = new Cell([newAccessory]);
			this.updateCell(x, y, newCell);
		} else {
			this.placeOneAccessory();
		}
	}
	updateCell(x, y, cell) {
		// todo gérer les erreurs
		this.grid[x][y] = cell;
	}
}
