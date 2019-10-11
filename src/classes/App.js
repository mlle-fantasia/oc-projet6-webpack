import World from "./World";
import config from "../conf.json";
import Utils from "./Utils";
import Player from "./Player";
import Weapon from "./Weapon";
import Accessory from "./Accessory";

export default class App {
	constructor(initPlayers, univers) {
		this.initWorld(initPlayers, univers);
	}

	initWorld(initPlayers, univers) {
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
			let newplayer = new Player(player.playerName, player.hero, p + 1, [weapon]);
			players.push(newplayer);
		}
		return players;
	}
	generateWeapon() {
		let weapons = [];
		for (let i = 0; i < this.players.length; i++) {
			weapons.push(new Weapon());
		}
		return weapons;
	}
	generateAccessories() {
		let accessories = [];
		for (let i = 0; i < this.players.length; i++) {
			accessories.push(new Accessory());
		}
		return accessories;
	}
}
