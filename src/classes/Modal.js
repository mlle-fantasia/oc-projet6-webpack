import Accessory from "./Accessory";
import Weapon from "./Weapon";
import Player from "./Player";

export default class Modal {
	constructor(player, type, object) {
		this.type = type;
		this.title = TYPE[type].title;
		this.text = TYPE[type].text;
		this.object = object;
		this.player = player;
	}

	render() {
		let btnNo = "";
		if (TYPE[this.type].btnNo) {
			btnNo = `<button class="form-control modal-response btn-modal-no" data-response="false">` + TYPE[this.type].btnNo + `</button> `;
		}
		console.log("this.object", this.object);
		if (this.type === "Cell") {
			this.object = null;
		}

		let object = "";
		if (this.object && (this.object instanceof Weapon || this.object instanceof Accessory)) {
			let temporalite = "";
			if (this.object.temporality) {
				temporalite = `<div class=""><span class="bold"> temporalité :</span> ` + this.object.temporality + `</div>`;
			}
			object =
				`<div class="d-flex flex-row modal-container-info-object">
					<div class="modal-background-anneau d-flex" >
						<img class="" src="images/accessories/` +
				this.object.imageGrid +
				`.png" alt="image objet trouvé">
					</div>
					<div class="d-flex flex-column modal-info-text">
					<div><span class="bold"> Objet :</span> ` +
				this.object.text +
				`</div>
					<div class=""><span class="bold"> Avantage :</span> ` +
				this.object.avantageText +
				`</div>
				` +
				temporalite +
				`
					</div>
				</div>`;
		}
		if (this.object && this.object instanceof Player) {
			object =
				`<div class="d-flex flex-row modal-container-info-object">
					<div class="background-cercle-player-hero d-flex modal-background-cercle-player-hero" >
						<img class="info-player2-img info-player2-img-hero " src="images/players/img/` +
				this.object.image +
				`.jpg" alt="image du joueur copié">
					</div>
					<div class="d-flex flex-column modal-info-text">
					<div class="">` +
				this.object.hero +
				`</div>
					<div><span class="bold"> Son nom :</span> ` +
				this.object.playerName +
				`</div>
					<div class=""><span class="bold"> Son point fort :</span> ` +
				this.object.pointFort.text +
				`</div>
				
					</div>
				</div>`;
		}

		let modal =
			`
			<div class="container-modal-component d-flex flex-row">
				<div class="modal-component">
					<div class="modal-title tolkien">
				` +
			this.title +
			`
					</div>
					<div class="modal-content"><p>
				` +
			this.player.playerName +
			` !  ` +
			this.text +
			`
					</p>
					` +
			object +
			`
					</div>
					<div class="modal-footer">
						` +
			btnNo +
			`
						<button class="form-control modal-response btn-modal-yes" data-response="true">` +
			TYPE[this.type].btnYes +
			`</button>
					</div>
				</div>
			</div>
	`;

		return modal;
	}
}

const TYPE = {
	errorMove: {
		title: "Désolé",
		text: "Vous ne pouvez pas aller sur cette case",
		btnYes: "OK"
	},
	fight: {
		title: "Combat !!",
		text: "un joueur se trouve à coté de vous, voulez-vous l'attaquer ? ",
		btnYes: "OUI",
		btnNo: "Non"
	},
	powerCopy: {
		title: "Pouvoir Copié",
		text: "Ce tour ci, avez copié les pouvoirs du joueur suivant : ",
		btnYes: "OK ;)"
	},
	moveObstacle: {
		title: "Déplacer un obstacle",
		text: "Vous ne pouvez déplacer un obstacle, voulez vous le faire",
		btnYes: "OUI",
		btnNo: "Non"
	},
	Accessory: {
		title: "Accessoire trouvé",
		text: "Vous venez de trouver un accessoire, voulez-vous le rammaser ? ",
		btnYes: "Je le prend !",
		btnNo: "Je le laisse"
	},
	Weapon: {
		title: "arme trouvée",
		text: "Vous venez de trouver une arme, voulez-vous la rammaser et remplacer votre arme actuelle ? ",
		btnYes: "Je la prend !",
		btnNo: "Je la laisse"
	},
	steal: {
		title: "Object à voler !",
		text: "L'occasion se présente à vous de voler un accessoire à un autre joueur, voulez-vous agir ? ",
		btnYes: "Je vole !",
		btnNo: "Je ne vole pas"
	},
	quete3Modal1: {
		title: "Détruire l'anneau unique",
		text:
			"Après avoir traverser la terre du milieu, non sans embuches et mauvaises rencontres, vous avez enfin réussi à attendre le seul endroit de de la terre du milieu que l'on ne peut atendre : Le Mordor et la montagne du destin ! la dernière ligne droite est devant vous, atteignez la porte et jetez l'anneau !",
		btnYes: "Je vois la porte"
	},
	quete3Modal2: {
		title: "Détruire l'anneau unique",
		text:
			"Vous voila au coeur de la montagne du destin, là au Sauron le seigneur des ténèbres forgea en secret le maître anneau il y a 3000 ans. Mais un être ne veut pas que vous détruisiez l'anneau, Golum vous attaque, défendez vous !",
		btnYes: "ahh !!!"
	},
	quete3Modal3: {
		title: "Détruire l'anneau unique",
		text: "Bien joué ! Golum est tombé dans la lave. il vous reste à jeter l'anneau dans le feu ! Allez-vous jeter votre précieux ? ",
		btnYes: "Je le jete",
		btnNo: "Je le garde"
	},
	quete3Modal3fail: {
		title: "Détruire l'anneau unique",
		text:
			"Le coeur des homme est aisement coruptible et l'anneau à sa volonté propre, vous avez cédez à son pouvoir et échoué dans votre mission. L'anneau vous trahira en vous menant à la mort et toutes les contrées de la terre du milieu tomberont sous l'emprise de Sauron...",
		btnYes: "..."
	},
	quete3Modal3sucess: {
		title: "Détruire l'anneau unique",
		text:
			"Vous avez pris la bonne décision. jeter l'anneau dans le feu était le seul moyen de le détruire et de libérer la terre du milieu de l'emprise de Sauron. Mais le volcan commence à se reveiller, il vous faut sortir maintenant et éviter de mourir des rochers en fusion",
		btnYes: "Je fuis !"
	},
	quete3ModalSucess: {
		title: "Détruire l'anneau unique",
		text: "Bravo vous avez accompli la tâche qui vous a été confiée !  les aigles vont vous enmener en lieu sûr",
		btnYes: "houra !"
	}
};
