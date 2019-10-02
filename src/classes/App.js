import World from "./World";
import config from "../conf.json";

export default class App {
	constructor(players, univers) {
		this.initWorld(players, univers);
	}

	initWorld(players, univers) {
		this.world = new World(players, univers);
		this.grid = this.world.generateWorld();
	}
}
