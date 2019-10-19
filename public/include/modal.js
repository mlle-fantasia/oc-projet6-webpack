const TYPE = {
	fight: {
		title: "Combat !!",
		text: "un joueur se trouve à coté de vous, voulez-vous l'attaquer ? "
	},
	accessory: {
		title: "Accessoire trouvé",
		text: "Vous venez de trouver un accessoire, voulez-vous le rammaser ? "
	},
	weapon: {
		title: "arme trouvée",
		text: "Vous venez de trouver une arme, voulez-vous la rammaser et remplacer votre arme actuelle ? "
	}
};
const render = function render(type, object) {
	let modal =
		`
<div class="container-modal-component d-flex flex-row">
   <div class="modal-component">
      <div class="modal-title">
   ` +
		TYPE[type].title +
		`
      </div>
      <div class="modal-content">
   ` +
		TYPE[type].text +
		`
      </div>
      <div class="modal-footer">
         <button class="form-control btn-modal-non">NON</button>
         <button class="form-control btn-modal-oui">OUI</button>
      </div>
   </div>
</div>
   `;

	return modal;
};

export default {
	render
};
