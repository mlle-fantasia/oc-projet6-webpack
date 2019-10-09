import World from "./World";
import config from "../conf.json";
import Utils from "./Utils";

export default class App {
	constructor(players, univers) {
		this.initWorld(players, univers);
	}

	initWorld(players, univers) {
		this.world = new World(players, univers);
		this.grid = this.world.generateWorld();
		this.players = this.world.players;
	}

	showMove(player) {
		Utils.testMove(this.grid, player);
	}
}
