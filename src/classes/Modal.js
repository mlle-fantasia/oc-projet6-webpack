import Accessory from "./Accessory";
import Weapon from "./Weapon";
import Player from "./Player";

export default class Modal {
	constructor(player, type, object, remainingPlayer = false) {
		this.type = type;
		this.title = TYPE[type].title;
		this.text = TYPE[type].text;
		this.object = object;
		this.player = player;
		console.log("remainingPlayer", remainingPlayer);
		this.retour = parseInt(remainingPlayer) > 0 ? true : false;
		//remainingPlayer ? (this.retour = true) : (this.retour = false);
	}

	render() {
		let btnNo = "";
		if (TYPE[this.type].btnNo) {
			btnNo = `<button class="form-control modal-response btn-modal-no" data-response="false">` + TYPE[this.type].btnNo + `</button> `;
		}
		let btnYes = "";
		if (this.type === "winFight") {
			console.log("this.type, this.retour", this.type, this.retour);
			btnYes = this.retour ? "Retour grille" : "Retour accueil";
		} else {
			btnYes = TYPE[this.type].btnYes;
		}
		if (this.type === "Cell") {
			this.object = null;
		}
		let image = "";
		if (TYPE[this.type].image) {
			image =
				`
<div class="quete-image-modal" >
	<img class="" src="images/modal/` +
				TYPE[this.type].image +
				`.png" alt="illustration de la quete">
</div>
`;
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
			image +
			`
					</div>
					<div class="modal-footer">
						` +
			btnNo +
			`
						<button class="form-control modal-response btn-modal-yes" data-response="true">` +
			btnYes +
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
	stealObject: {
		title: "Object à voler !",
		text: "L'occasion se présente à vous de voler un accessoire à un autre joueur, voulez-vous agir ? ",
		btnYes: "Je vole !",
		btnNo: "Je ne vole pas"
	},
	winFight: {
		title: "Vous avez gagné",
		text: "Vous avez terrassé votre ennemie, félicitation",
		btnYes: ""
	},
	quete6Modal1: {
		title: "Détruire l'anneau unique",
		text:
			"Après avoir traverser la terre du milieu, non sans embuches et mauvaises rencontres, vous avez enfin réussi à attendre le seul endroit de de la terre du milieu que l'on ne peut atendre : Le Mordor et la montagne du destin ! la dernière ligne droite est devant vous, atteignez la porte et jetez l'anneau !",
		image: "quete6Modal1",
		btnYes: "Je vois la porte"
	},
	quete6Modal2: {
		title: "Détruire l'anneau unique",
		text:
			"Vous voila au coeur de la montagne du destin, là au Sauron le seigneur des ténèbres forgea en secret le maître anneau il y a 3000 ans. Mais un être ne veut pas que vous détruisiez l'anneau, Golum vous attaque, défendez vous !",
		image: "quete6Modal2",
		btnYes: "ahh !!!"
	},
	quete6Modal3: {
		title: "Détruire l'anneau unique",
		text: "Bien joué ! Golum est tombé dans la lave. il vous reste à jeter l'anneau dans le feu ! Allez-vous jeter votre précieux ? ",
		image: "quete6Modal3",
		btnYes: "Je le jete",
		btnNo: "Je le garde"
	},
	quete6Modal3fail: {
		title: "Détruire l'anneau unique",
		text:
			"Le coeur des homme est aisement coruptible et l'anneau à sa volonté propre, vous avez cédez à son pouvoir et échoué dans votre mission. L'anneau vous trahira en vous menant à la mort et toutes les contrées de la terre du milieu tomberont sous l'emprise de Sauron...",
		image: "quete6Modal3fail",
		btnYes: "..."
	},
	quete6Modal3success: {
		title: "Détruire l'anneau unique",
		text:
			"Vous avez pris la bonne décision, vous avez accompli la tâche qui vous a été confiée ! Jeter l'anneau dans le feu était le seul moyen de le détruire et de libérer la terre du milieu de l'emprise de Sauron. Mais le volcan commence à se reveiller, il vous faut sortir maintenant et éviter de mourir des rochers en fusion",
		image: "quete6Modal3success",
		btnYes: "Je fuis !"
	},
	quete6ModalSuccess: {
		title: "Détruire l'anneau unique",
		text: "La montagne peut exploser, vous avez atteint des aigles, ils vont vous enmener en lieu sûr",
		btnYes: "houra !"
	},
	quete6ModalDead: {
		title: "Détruire l'anneau unique",
		text:
			"Vous êtes mort par la montagne du destin en furie ! Vous avez quand meme sauvé la terre du milieu, votre honneur est sauf, vous allez rejoindre vos ailleux et vous n'aurez pas honte.",
		btnYes: ":'("
	},
	quete4Modal1: {
		title: "Sauver Gondolin",
		text:
			"C'est lors de votre passage à Vinyamar, au bord de Belegaer, la grande mer qu'Ulmo le seigneur des eaux vous est apparut, il est sortit d'une tempête venu de l'ouest. il vous dit d'endosser le heaume, la cotte, l'épée et le bouclier laissés par Turgon dans la grande salle du trône, de quiter cet endroit et de trouver Gondolin afin de délivrer son message. ",
		image: "quete4Modal1",
		btnYes: "Je part"
	},
	quete4Modal2: {
		title: "Sauver Gondolin",
		text:
			"Bravo vous avez enfin trouvé le passage sous les montagnes qui mène à la cité cachée de gondolin ! c'est un tunnel creusé dans la pierre dure par les eaux qui s'écoulaient du flanc de la montagne. Passé le seuil tout est sombre noir. vous cheminé à l'aveuglette et avec précaussion lorsque vous êtes arreté par la garde de la cité. Vous connaissez maintenant le chemin secret, vous allez entrer dans la cité mais jamais plus vous n'en resortirez or par la porte de la mort.",
		image: "quete4Modal2",
		btnYes: "Je rentre"
	},
	quete4Modal2: {
		title: "Sauver Gondolin",
		text:
			"Vous êtes passé par des tunnels sous la montagne, des ponts, des des chemins escarpés, de longs escaliers, des pentes sinueuses et avez   passé les septs portes qui mènes à Gondolin : la porte de bois, la porte de pierre, la porte de bronze, la porte de fer forgé, la porte de marble blanc, la porte d'argent, et enfin, la porte d'or.",
		image: "quete4Modal2",
		btnYes: "Je rentre"
	},
	quete5Modal1: {
		title: "Récupérer les Silmaril",
		text:
			"Vous voila embarqué dans une perieuse aventure : récupérer les Silmaril de la couronne de l'ainu melko en personne, l'ennemie  le plus plussant ",
		image: "quete5Modal1",
		btnYes: "Je part"
	},
	quete5Modal2: {
		title: "Récupérer les Silmaril",
		text: "",
		image: "quete5Modal2",
		btnYes: "Je rentre",
		btnNo: "Je rentre pas"
	}
};
