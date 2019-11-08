const ACCESSORY = [
	{ value: "potion_life", text: "Potion de vie", avantage: 5, avantageText: "redonne 3 points de vie", temporality: "punctual", univers: "all" },
	{
		value: "potion_strength",
		text: "Potion de force",
		avantage: 3,
		avantageText: "donne plus 2 de force au prochain coup",
		temporality: "punctual",
		univers: "all"
	},
	{
		value: "potion_healfy",
		text: "Potion de soin à la telas",
		avantage: 4,
		avantageText: "redonne 2 points de vie",
		temporality: "punctual",
		univers: "all"
	},
	{ value: "hat", text: "casque pointu du Gondor", avantage: 1, avantageText: "ajoute 1 de résistance", temporality: "perpetual", univers: "all" },
	{ value: "armor", text: "armure du Rohan", avantage: 2, avantageText: "", temporality: "perpetual", univers: "all" },
	{ value: "mitril", text: "chemise en mitril", avantage: 3, avantageText: "ajoute 3 de résistance", temporality: "perpetual", univers: "all" },
	{
		value: "cote_maille",
		text: "côte de maille un peu trop sérée à la poitrine",
		avantage: 2,
		avantageText: "ajoute 2 de résistance",
		temporality: "perpetual",
		univers: "all"
	},
	{ value: "boot", text: "bottes étanches", avantage: 1, avantageText: "ajoute un de déplacement", temporality: "perpetual", univers: "all" },
	{ value: "bouclier", text: "le bouclier", avantageText: "possède 10 de dégat", avantage: 10, univers: "4", temporality: "perpetual" },
	{ value: "cotte", text: "la cotte", avantageText: "possède 15 de dégat", avantage: 15, univers: "4", temporality: "perpetual" },
	{ value: "heaume", text: "le heaume", avantageText: "possède 9 de dégat", avantage: 9, univers: "4", temporality: "perpetual" }
];

export default class Accessory {
	constructor(value = null) {
		let accessory;
		if (value) {
			accessory = ACCESSORY.find(a => {
				return a.value === value;
			});
		} else {
			let accessories = ACCESSORY.filter(a => {
				return a.univers === "all";
			});
			accessory = accessories[Math.floor(accessories.length * Math.random())];
		}
		this.text = accessory.text;
		this.imageGrid = accessory.value;
		this.avantage = accessory.avantage;
		this.avantageText = accessory.avantageText;
		this.temporality = accessory.temporality;
		this.type = "Accessory";
		this.value = accessory.value;
	}
}
