const ACCESSORY = [
	{
		value: "potion_life",
		text: "Potion de vie",
		avantage: 5,
		avantageText: "redonne 5 points de vie",
		temporality: "punctual",
		univers: "all",
		type: "potion"
	},
	{
		value: "potion_strength",
		text: "Potion de force",
		avantage: 7,
		avantageText: "redonne 7 points de vie",
		temporality: "punctual",
		univers: "all",
		type: "potion"
	},
	{
		value: "potion_healfy",
		text: "Potion de soin à la telas",
		avantage: 4,
		avantageText: "redonne 4 points de vie",
		temporality: "punctual",
		univers: "all",
		type: "potion"
	},
	{
		value: "hat",
		text: "casque pointu du Gondor",
		avantage: 1,
		avantageText: "ajoute 1 de résistance",
		temporality: "perpetual",
		univers: "all",
		type: "protection"
	},
	{
		value: "armor",
		text: "armure du Rohan",
		avantage: 2,
		avantageText: "ajoute 2 de résistance",
		temporality: "perpetual",
		univers: "all",
		type: "protection"
	},
	{
		value: "mitril",
		text: "chemise en mitril",
		avantage: 3,
		avantageText: "ajoute 3 de résistance",
		temporality: "perpetual",
		univers: "all",
		type: "protection"
	},
	{
		value: "cote_maille",
		text: "côte de maille un peu trop sérée à la poitrine",
		avantage: 2,
		avantageText: "ajoute 2 de résistance",
		temporality: "perpetual",
		univers: "all",
		type: "protection"
	},
	{
		value: "boot",
		text: "bottes étanches",
		avantage: 1,
		avantageText: "ajoute 1 de déplacement",
		temporality: "perpetual",
		univers: "all",
		type: "deplacement"
	},
	{
		value: "bouclier",
		text: "le bouclier",
		avantageText: "ajoute 2 de résistance",
		avantage: 2,
		univers: "4",
		temporality: "perpetual",
		type: "protection"
	},
	{
		value: "cotte",
		text: "la cotte",
		avantageText: "ajoute 3 de résistance",
		avantage: 3,
		univers: "4",
		temporality: "perpetual",
		type: "protection"
	},
	{
		value: "heaume",
		text: "le heaume",
		avantageText: "ajoute 4 de résistance",
		avantage: 4,
		univers: "4",
		temporality: "perpetual",
		type: "protection"
	}
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
		this.sousType = accessory.type;
		this.value = accessory.value;
	}
}
