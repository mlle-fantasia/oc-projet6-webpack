export default class Weapon {
	constructor() {
		const WEAPON = [
			{ value: "dague-etincelante", text: "jolie dague étincelante", degat: 9 },
			{ value: "nenya", text: "Nenya l'annaeu magique", degat: 20 },
			{ value: "dard", text: "Dard, la dague elfique", degat: 10 },
			{ value: "narsil", text: "Narsil, la flemme de l'ouest", degat: 15 },
			{ value: "hache", text: "hache", degat: 12 }
		];

		let weapon = WEAPON[Math.floor(WEAPON.length * Math.random())];
		console.log("weapon", weapon);
		this.weapon = weapon.text;
		this.imageGrid = weapon.value + "-grid";
		this.degat = weapon.degat;
	}
}
