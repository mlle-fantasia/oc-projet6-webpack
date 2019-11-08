export default class Obstacle {
	constructor(univers, destroyedCell = false) {
		this.imageGrid = destroyedCell ? "world" + univers + "-nocell" : "world" + univers + "-grid";
		this.type = destroyedCell ? "Lave" : "Obstacle";
	}
}
