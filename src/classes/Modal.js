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
	}
};
export default class Modal {
	constructor(type, object) {
		this.type = type;
		this.title = TYPE[type].title;
		this.text = TYPE[type].text;
		this.object = object;
	}

	render() {
		let btnNo = "";
		if (this.type !== "errorMove") {
			btnNo = `<button class="form-control modal-response btn-modal-no" data-response="false">` + TYPE[this.type].btnNo + `</button> `;
		}
		let temporalite = "";
		if (this.object.temporality) {
			temporalite = `<div class=""><span class="bold"> temporalité :</span> ` + this.object.temporality + `</div>`;
		}
		let object = "";
		if (this.object) {
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
