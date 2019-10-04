const ACCESSORY = [
	{ value: "potion_life", text: "Potion de vie", avantage: 5, temporality: "punctual" },
	{ value: "potion_strength", text: "Potion de force", avantage: 3, temporality: "punctual" },
	{ value: "potion_healfy", text: "Potion de soin à la telas", avantage: 4, temporality: "punctual" },
	{ value: "hat", text: "casque pointu du Gondor", avantage: 1, temporality: "perpetual" },
	{ value: "armor", text: "armure du Rohan", avantage: 2, temporality: "perpetual" },
	{ value: "mitril", text: "chemise en mitril", avantage: 3, temporality: "perpetual" },
	{ value: "cote_maille", text: "côte de maille un peu trop sérée à la poitrine", avantage: 2, temporality: "perpetual" },
	{ value: "boot", text: "bottes étanches", avantage: 1, temporality: "perpetual" }
];

export default class Accessory {
	constructor() {
		let accessory = ACCESSORY[Math.floor(ACCESSORY.length * Math.random())];
		this.Accessory = accessory.text;
		this.imageGrid = accessory.value + "-grid";
		this.avantage = accessory.avantage;
		this.temporality = accessory.temporality;
	}
}
