const ACCESSORY = [
	{ value: "potion_life", text: "Potion de vie", avantage: 5, avantagetext: "redonne 3 points de vie", temporality: "punctual" },
	{
		value: "potion_strength",
		text: "Potion de force",
		avantage: 3,
		avantagetext: "donne plus 2 de force au prochain coup",
		temporality: "punctual"
	},
	{ value: "potion_healfy", text: "Potion de soin à la telas", avantage: 4, avantagetext: "redonne 2 points de vie", temporality: "punctual" },
	{ value: "hat", text: "casque pointu du Gondor", avantage: 1, avantagetext: "ajoute 1 de résistance", temporality: "perpetual" },
	{ value: "armor", text: "armure du Rohan", avantage: 2, avantagetext: "", temporality: "perpetual" },
	{ value: "mitril", text: "chemise en mitril", avantage: 3, avantagetext: "ajoute 3 de résistance", temporality: "perpetual" },
	{
		value: "cote_maille",
		text: "côte de maille un peu trop sérée à la poitrine",
		avantage: 2,
		avantagetext: "ajoute 2 de résistance",
		temporality: "perpetual"
	},
	{ value: "boot", text: "bottes étanches", avantage: 1, avantagetext: "ajoute un de déplacement", temporality: "perpetual" }
];

export default class Accessory {
	constructor() {
		let accessory = ACCESSORY[Math.floor(ACCESSORY.length * Math.random())];
		this.text = accessory.text;
		this.imageGrid = accessory.value;
		this.avantage = accessory.avantage;
		this.avantageText = accessory.avantage;
		this.temporality = accessory.temporality;
	}
}
