export default class Cell {
	constructor(univers, objects) {
		this.background = this.defineBackground(univers);
		this.objects = [...objects];
	}
	defineBackground(univers) {
		const FIELDS = { 1: "salt-desert", 2: "grass", 4: "ice", 3: "ocean" };
		return FIELDS[univers];
	}
}

//class Fields {}
