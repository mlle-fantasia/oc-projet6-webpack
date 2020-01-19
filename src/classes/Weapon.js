const WEAPON = [
	{
		value: "dague_etincelante",
		text: "jolie dague étincelante",
		avantageText: "possède 9 de dégat",
		degat: 9,
		initial: true,
		univers: "all",
		type: "weapon"
	},
	{
		value: "nenya",
		text: "Nenya l'annaeu magique",
		avantageText: "possède 20 de dégat",
		degat: 20,
		initial: false,
		univers: "all",
		type: "weapon"
	},
	{ value: "dard", text: "Dard, la dague elfique", avantageText: "possède 10 de dégat", degat: 10, initial: true, univers: "all", type: "weapon" },
	{
		value: "narsil",
		text: "Narsil, la flemme de l'ouest",
		avantageText: "possède 15 de dégat",
		degat: 15,
		initial: false,
		univers: "all",
		type: "weapon"
	},
	{ value: "hache", text: "hache", avantageText: "possède 12 de dégat", degat: 12, initial: true, univers: "all", type: "weapon" },

	{ value: "epee", text: "l'epee", avantageText: "possède 15 de dégat", degat: 15, univers: "4", type: "weapon" },
	{ value: "cailloux", text: "un cailloux", avantageText: "fabrication local et naturelle", degat: 8, univers: "6", type: "weapon" },
	{ value: "marteau", text: "un marteau", avantageText: "", degat: 20, univers: "5", type: "weapon" }
];

export default class Weapon {
	constructor(initial, value = null) {
		let weapon;
		if (value) {
			weapon = WEAPON.find(w => {
				return w.value === value;
			});
		} else {
			weapon = this.defineWeapon(initial);
		}

		this.text = weapon.text;
		this.avantageText = weapon.avantageText;
		this.imageGrid = weapon.value;
		this.degat = weapon.degat;
		this.initial = weapon.initial;
		this.type = "Weapon";
		this.value = weapon.value;
	}

	defineWeapon(initial) {
		let weaweapon;
		if (initial === "initial") {
			const intialWeapons = WEAPON.filter(w => w.initial);
			weaweapon = intialWeapons[Math.floor(intialWeapons.length * Math.random())];
			return weaweapon;
		} else {
			const Weapons = WEAPON.filter(w => w.univers === "all");
			weaweapon = Weapons[Math.floor(Weapons.length * Math.random())];
			return weaweapon;
		}
	}
}
