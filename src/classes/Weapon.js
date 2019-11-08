const WEAPON = [
	{ value: "dague-etincelante", text: "jolie dague étincelante", avantageText: "possède 9 de dégat", degat: 9, initial: true },
	{ value: "nenya", text: "Nenya l'annaeu magique", avantageText: "possède 20 de dégat", degat: 20, initial: false },
	{ value: "dard", text: "Dard, la dague elfique", avantageText: "possède 10 de dégat", degat: 10, initial: true },
	{ value: "narsil", text: "Narsil, la flemme de l'ouest", avantageText: "possède 15 de dégat", degat: 15, initial: false },
	{ value: "hache", text: "hache", avantageText: "possède 12 de dégat", degat: 12, initial: true }
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
			weaweapon = WEAPON[Math.floor(WEAPON.length * Math.random())];
			return weaweapon;
		}
	}
}
