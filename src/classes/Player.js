export default class Player {
	constructor(name, heroNum, playerNum, accessories) {
		const tabVariablePlayer = {
			ptVie: [10, 12, 14, 10, 12, 13],
			force: [10, 12, 14, 10, 12, 13],
			type: ["motorisé", "ailé", "énervé", "force-calme", "patriote", "hasardeux"],
			pointFort: [
				{ value: "fast", text: "peut se déplacer plus vite" },
				{ value: "attack", text: "peut attaquer deux fois" },
				{ value: "steal", text: "peut voler un objet" },
				{ value: "move", text: "peut déplacer les obstacles" },
				{ value: "long", text: "peut attaquer de plus loin" },
				{ value: "critique", text: "à plus de chance de faire des coups critique" }
			]
		};
		this.playerName = name;
		this.playerNum = playerNum;
		this.heroNum = heroNum;
		this.image = "hero" + heroNum + "-img";
		this.imageGrid = "hero" + heroNum + "-grid";
		this.ptVieMax = tabVariablePlayer.ptVie[heroNum - 1];
		this.ptVie = tabVariablePlayer.ptVie[heroNum - 1];
		this.type = tabVariablePlayer.type[heroNum - 1];
		this.pointFort = tabVariablePlayer.pointFort[heroNum - 1];
		this.accessories = accessories;
		//this.playerInfo = this.showPlayerInfo();
	}

	/* 	showPlayerInfo() {
		return (
			`<div class="info-player">
		<div class='info-player-text info-player-titre pt-4'>Joueur ` +
			this.playerNum +
			`</div>
		<div class=" info-player-text info-player-name"> Nom : ` +
			this.playerName +
			`</div>
		<img src="../images/players/img/hero` +
			this.heroNum +
			`.jpg" class="d-block w-100" alt="...">
			<input type="range" class="info-player-text info-player-pt-vie" name="ptVie"
         min="0" max="` +
			this.ptVieMax +
			`" value="` +
			this.ptVie +
			`" disabled>
			<div class="info-player-text">
			<p> Type : ` +
			this.type +
			`</p>
			<p>Point fort : ` +
			this.pointFort.text +
			`</p>
			</div>
			<div class="row">
			<div class="col-6 info-player-weapon">
			</div>
			<div class="col-6 info-player-accessory">
			</div>
			</div>
		</div>`
		);
	}*/
}
