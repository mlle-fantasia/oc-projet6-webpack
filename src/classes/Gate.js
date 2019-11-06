export default class Gate {
	constructor(univers, aigle) {
		if (aigle) {
			this.imageGrid = "Gate" + univers + "-grid-aigle";
		} else {
			this.imageGrid = "Gate" + univers + "-grid";
		}
		this.type = "Gate";
	}
}
