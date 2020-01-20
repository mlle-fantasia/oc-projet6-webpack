import World from "./World";
import config from "../conf.json";
import Utils from "./Utils";
import Player from "./Player";
import Cell from "./Cell";
import Weapon from "./Weapon";
import Accessory from "./Accessory";
import Obstacle from "./Obstacle";

export default class App {
	constructor(initPlayers, univers, existingGrid) {
		if (existingGrid) {
			this.reInitWorld(univers, existingGrid, initPlayers);
		} else {
			this.initWorld(initPlayers, univers);
		}
	}
	reInitWorld(univers, existingGrid, initPlayers) {
		this.world = new World(univers);
		let elements = this.world.reGenerateWorld(existingGrid);
		this.grid = elements.grid;
		this.players = elements.players;
		this.univers = univers;
	}
	moveOrcs(orcs) {
		for (let i = 0; i < orcs.length; i++) {
			const orc = orcs[i];
			// l'orc à une chance sur deux de se déplacer
			let d = Math.floor(Math.random() * Math.floor(10));
			if (d > 5) continue;
			this.moveOneOrc(orc);
		}
	}
	moveOneOrc(orc) {
		let x = Math.floor(Math.random() * Math.floor(config.nbCasesX));
		let y = Math.floor(Math.random() * Math.floor(config.nbCasesY));
		if (Utils.isFreeCell(x, y, this.grid)) {
			this.grid[orc.placeX][orc.placeY].objects = [];
			orc.placeX = x;
			orc.placeY = y;
			let newOrcCell = new Cell(x, y, [orc]);
			Utils.updateCell(x, y, newOrcCell, this.grid);
		} else {
			this.moveOneOrc(orc);
		}
	}
	destroyCell(grid, univers) {
		let end = false;
		for (let i = 0; i < 3; i++) {
			let x = Math.floor(Math.random() * Math.floor(config.nbCasesX));
			let y = Math.floor(Math.random() * Math.floor(config.nbCasesY));
			if ((grid[x][y].objects.length > 1 && grid[x][y].objects[1] instanceof Player) || grid[x][y].objects[0] instanceof Player) {
				end = true;
			}
			/* if (grid[x][y].objects[0] instanceof Obstacle && grid[x][y].objects[0].type === "lave") {
				this.destroyCell(grid, univers);
			} */
			let destroyedCell = new Obstacle(univers, true);
			let newCell = new Cell(x, y, [destroyedCell]);
			Utils.updateCell(x, y, newCell, grid);
			this.grid = grid;
		}
		return end;
	}
	initWorld(initPlayers, univers) {
		this.univers = univers;
		this.players = this.generatePlayers(initPlayers);
		this.weapons = this.generateWeapon();
		this.accessories = this.generateAccessories();
		this.world = new World(univers);
		this.grid = this.world.generateWorld(this.players, this.weapons, this.accessories);
		this.currentPlayer = this.players[0];
	}
	generatePlayers(initPlayers) {
		let players = [];
		for (let p = 0; p < initPlayers.length; p++) {
			const player = initPlayers[p];
			let weapon = new Weapon("initial");
			let newplayer = new Player(player.playerName, player.heroNum, p + 1, [weapon], true);
			players.push(newplayer);
		}
		if (this.univers === "5") {
			for (let i = 1; i < 6; i++) {
				let arme = new Weapon("initial");
				let orc = new Player("Orc", 8, i + 1, [arme]);
				players.push(orc);
			}
		}
		return players;
	}
	generateWeapon() {
		let weapons = [];
		if (this.univers === "4") {
			weapons.push(new Weapon(null, "epee"));
		} else {
			for (let i = 0; i < this.players.length; i++) {
				weapons.push(new Weapon(null));
			}
		}
		return weapons;
	}
	generateAccessories() {
		let accessories = [];
		if (this.univers !== "4") {
			for (let i = 0; i < this.players.length; i++) {
				accessories.push(new Accessory());
			}
		} else {
			accessories.push(new Accessory("cotte"));
			accessories.push(new Accessory("heaume"));
			accessories.push(new Accessory("bouclier"));
			accessories.push(new Accessory("potion_healfy"));
			accessories.push(new Accessory("potion_life"));
		}
		return accessories;
	}
}
