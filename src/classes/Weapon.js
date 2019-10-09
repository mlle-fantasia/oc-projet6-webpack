const WEAPON = [
	{ value: "dague-etincelante", text: "jolie dague étincelante", degat: 9, initial: true },
	{ value: "nenya", text: "Nenya l'annaeu magique", degat: 20, initial: false },
	{ value: "dard", text: "Dard, la dague elfique", degat: 10, initial: true },
	{ value: "narsil", text: "Narsil, la flemme de l'ouest", degat: 15, initial: false },
	{ value: "hache", text: "hache", degat: 12, initial: true }
];
export default class Weapon {
	constructor(initial) {
		let weapon = this.defineWeapon(initial);
		this.weapon = weapon.text;
		this.imageGrid = weapon.value;
		this.degat = weapon.degat;
		this.initial = weapon.initial;
	}

	defineWeapon(initial) {
		/* 		let weaweapon;
		const intialWeapons = WEAPON.filter(w => w.initial);
		console.log("intialWeapons", intialWeapons);

		weaweapon = intialWeapons[Math.floor(intialWeapons.length * Math.random())];
		console.log("weaweapon", weaweapon);
		return weaweapon; */
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
