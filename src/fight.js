import "./scss/main.scss";
import $ from "jquery";
import "babel-polyfill";
import Utils from "./classes/Utils";
import Modal from "./classes/Modal";

const ANIMATE = ["shew", "rotate", "rotateX", "rotateY", "rotate3d", "scale"];
let playerDefence = JSON.parse(localStorage.getItem("playerToFight"));
let playerAttack = JSON.parse(localStorage.getItem("player"));
let combatants = [{ type: "defence", player: playerDefence }, { type: "attack", player: playerAttack }];
let univers = localStorage.getItem("univers");
let remainingPlayers = localStorage.getItem("remainingPlayers");
let attackAgain = { attack: false, number: 0 };
$(document).ready(function() {
	calculFight(playerDefence);
	calculFight(playerAttack);
	$(".btn-player-defence").prop("disabled", true);
	$(".btn-player-attack").prop("disabled", false);
	if (!playerAttack.potion) {
		$("#btn-use-potion-player-attack").prop("disabled", true);
	}
	$("#game").addClass("game-" + univers);
	$(".fight-background").addClass("world" + univers + "-background");
	let elementPlayerAttack = $(
		" <img class='img-attack-player' src='images/players/grid/player" + playerAttack.heroNum + "figure.png' alt='image du joueur qui attaque'/>"
	);
	let elementPlayerDefence = $(
		"<img class='img-defence-player' src='images/players/grid/player" + playerDefence.heroNum + "figure.png' alt='image du joueur qui defend'/>"
	);
	$(".attack-player").append($(elementPlayerAttack));
	$(".defence-player").append($(elementPlayerDefence));
	let infoplayerDefence = renderInfoPlayer(playerDefence);
	let infoplayerAttack = renderInfoPlayer(playerAttack);
	$(".info-attack-player").append(infoplayerAttack);
	$(".info-defence-player").append(infoplayerDefence);

	renderptViePlayer(playerDefence, "defence");
	renderptViePlayer(playerAttack, "attack");
	console.log("playerAttack.heroNum", playerAttack.heroNum);

	if (univers === "6" || (univers === "5" && (playerAttack.heroNum === 9 || playerAttack.heroNum === 8))) {
		ennemieAttack();
	}

	$(".btn-attack").click(element => {
		let typePlayer = element.target.dataset.type;
		let tabPlayer = combatants.filter(p => {
			return p.type === typePlayer;
		});
		let player = tabPlayer[0];
		let tabOtherPlayer = combatants.filter(p => {
			return p.type !== typePlayer;
		});
		let otherPlayer = tabOtherPlayer[0];

		$(".btn-player-" + player.type).prop("disabled", true);

		otherPlayer.player.ptVie = otherPlayer.player.ptVie - (player.player.force - otherPlayer.player.resistance);
		renderptViePlayer(otherPlayer.player, otherPlayer.type, player.player);
		let animate = ANIMATE[Math.floor(ANIMATE.length * Math.random())];
		$(".img-" + player.type + "-player").addClass("translate-" + player.type);
		setTimeout(() => {
			$(".img-" + player.type + "-player").removeClass("translate-" + player.type);
			$(".img-" + otherPlayer.type + "-player").addClass(animate);
			setTimeout(() => {
				$(".img-" + otherPlayer.type + "-player").removeClass(animate);
				if (player.player.pointFort.value === "attack") {
					if (Utils.calculChanceAvantage(player.player.pointFort)) {
						if (attackAgain.number === 0) {
							attackAgain = { attack: true, number: 1 };
						} else {
							attackAgain = { attack: false, number: 0 };
						}
					}
				}
				if (attackAgain.attack) {
					$(".btn-player-" + player.type).prop("disabled", false);
					if (!player.player.potion) {
						$("#btn-use-potion-player-" + player.type).prop("disabled", true);
					}
				} else {
					$("#btn-attack-player-" + otherPlayer.type).prop("disabled", false);
					if (otherPlayer.player.potion) {
						$("#btn-use-potion-player-" + otherPlayer.type).prop("disabled", false);
					}
				}
				if ((univers === "6" || univers === "5") && otherPlayer.player.ptVie > 0) {
					ennemieAttack();
				}
			}, 1000);
		}, 1000);
	});

	$(".btn-use-potion").click(element => {
		let typePlayer = element.target.dataset.type;
		let playerPotion = combatants.filter(p => {
			return p.type === typePlayer;
		});
		let otherPlayer = combatants.filter(p => {
			return p.type !== typePlayer;
		});
		usePotion(playerPotion[0].player, typePlayer, otherPlayer[0].player);
	});

	/* 	$("#retour-test").click(async () => {
		if (univers === "1" || univers === "2" || univers === "3") {
			//localStorage.setItem("player", JSON.stringify(playerAttack));
			//localStorage.setItem("playerToFight", JSON.stringify(playerDefence));
			retourGame();
			return;
		}
		let responseModal = await Utils.showModal(playerAttack, "quete" + univers + "Modal3", null);
		if (responseModal) {
			if (univers === "6") {
				let responseModal = await Utils.showModal(playerAttack, "quete6Modal3success", null);
				if (responseModal) {
					//localStorage.setItem("player", JSON.stringify(playerAttack));
					retourGame();
				}
			}
		} else {
			Utils.showModal(playerAttack, "quete" + univers + "Modal3fail", null);
		}
	}); */
});
function ennemieAttack() {
	$(".btn-player-attack").hide();
	playerDefence.ptVie = playerDefence.ptVie - (playerAttack.force - playerDefence.resistance);
	renderptViePlayer(playerDefence, "defence", playerAttack);
	let animate = ANIMATE[Math.floor(ANIMATE.length * Math.random())];
	$(".img-attack-player").addClass("translate-attack");
	setTimeout(() => {
		$(".img-attack-player").removeClass("translate-attack");
		$(".img-defence-player").addClass(animate);
		setTimeout(() => {
			$(".img-defence-player").removeClass(animate);
			$("#btn-attack-player-defence").prop("disabled", false);
			if (playerDefence.potion) {
				$("#btn-use-potion-player-defence").prop("disabled", false);
			}
		}, 1000);
	}, 1000);
}
function usePotion(player, type, otherPlayer) {
	if (player.accessories[1].sousType === "potion") {
		player.ptVie += player.accessories[1].avantage;
		player.potion = false;
	}
	renderptViePlayer(player, "defence", otherPlayer);
	player.accessories.splice(1);
	$(".info-" + type + "-player").empty();
	let infoplayer = renderInfoPlayer(player);
	$(".info-" + type + "-player").append(infoplayer);
}
function calculFight(player) {
	player.potion = false;
	let force = 0;
	let resistance = 0;
	force = player.accessories[0].degat;
	if (player.accessories.length > 1) {
		if (player.accessories[1].sousType === "protection") {
			resistance = player.accessories[1].avantage;
		}
		if (player.accessories[1].sousType === "potion") {
			player.potion = true;
		}
	}
	player.force = force;
	player.resistance = resistance;
}
function renderptViePlayer(playerToMaj, type, player) {
	$(".player-" + type + "-vie").text(playerToMaj.ptVie < 0 ? 0 : playerToMaj.ptVie);
	if (playerToMaj.ptVie <= 0) {
		setTimeout(async () => {
			$("." + type + "-player").fadeOut("slow");
			setTimeout(async () => {
				await endGame(playerToMaj, player);
			}, 1000);
		}, 1000);
	}
}
async function endGame(playerToMaj, player) {
	if (univers === "6") {
		let responseModal = await Utils.showModal(playerAttack, "quete" + univers + "Modal3", null);
		if (responseModal) {
			if (univers === "6") {
				let responseModal = await Utils.showModal(playerAttack, "quete6Modal3success", null);
				if (responseModal) {
					let newGrid = deletePlayer();
					retourGame(newGrid);
				}
			}
		} else {
			let responseModal2 = await Utils.showModal(playerAttack, "quete" + univers + "Modal3fail", null, univers);
			console.log("responseModal2", responseModal2);
			if (responseModal2) {
				window.location.href = "index.html";
			}
		}
	} else {
		let responseModal = await Utils.showModal(player, "winFight", null, null, null, null, remainingPlayers);
		if (responseModal) {
			if (remainingPlayers > 0) {
				let newGrid = deletePlayer(playerToMaj);
				retourGame(newGrid);
			} else {
				window.location.href = "index.html";
			}
		}
	}
}
function deletePlayer(player) {
	let grid = JSON.parse(localStorage.getItem("grid"));
	if (player) {
		grid[player.placeX][player.placeY].objects = [];
		localStorage.setItem("playerDead", JSON.stringify(player));
	}
	return grid;
}
function retourGame(newGrid) {
	localStorage.setItem("univers", univers);
	localStorage.setItem("retour", true);
	localStorage.setItem("grid", JSON.stringify(newGrid));
	window.location.href = "game.html";
}

function renderInfoPlayer(player) {
	let weapon = "";
	let infoWeapon = "";
	if (player.accessories[0]) {
		weapon = 'src="images/accessories/' + player.accessories[0].imageGrid + '.png" alt="image arme"';
		infoWeapon =
			'<div class="container-info-name-weapon"><div class="info-name info-weapon weapon-text tolkien">' +
			player.accessories[0].text +
			'</div><div class="info-name info-weapon weapon-avantage">' +
			player.accessories[0].avantageText +
			"</div></div>";
	}
	let accessory = "";
	let infoAccessory = "";
	if (player.accessories && player.accessories[1]) {
		accessory = 'src="images/accessories/' + player.accessories[1].imageGrid + '.png" alt="image accessoire"';
		let temp = player.accessories[1].temporality === "perpetual" ? "avantage permanent" : "avantage ponctuel";
		infoAccessory =
			`<div class="container-info-name-accessory"><div class="info-name info-accessory accessory-text tolkien">` +
			player.accessories[1].text +
			`</div>
		<div class="info-name info-accessory accessory-avantage">` +
			player.accessories[1].avantageText +
			`</div>
			<div class="info-name info-accessory accessory-temp">` +
			temp +
			`</div></div>`;
	}
	let heroSize = $(".info-attack-player").width();
	let ArmorSize = $(".info-attack-player").width() / 2;
	let AccessorySize = $(".info-attack-player").width() / 3;
	return (
		`
		<div class="d-flex flex-column cercle-hero">
	<div class="info-name tolkien">` +
		player.playerName +
		`</div>
	<div class="background-cercle-player-hero" style="height:` +
		heroSize +
		`px">
		
		<img class="info-player2-img info-player2-img-hero " src="images/players/img/hero` +
		player.heroNum +
		`.jpg"
			alt="image hero">
	</div>

	<div class="info-name "> type : ` +
		player.type +
		`</div>
	<div class="info-name ">` +
		player.pointFort.text +
		`</div>
</div>
<div class=" container-info-weapon">
	<div class=" cercle-armor" style="height:` +
		ArmorSize +
		`px">
		<div class="background-cercle-anneau" >
			<img class="info-player2-img info-player2-img-armor" ` +
		weapon +
		`>
		
		</div>
	</div>
	` +
		infoWeapon +
		`
</div>
<div class=" container-info-accessory">
	<div class="cercle-accessory ">
		<div class="background-cercle-anneau" style="height:` +
		AccessorySize +
		`px">
			<img class="info-player2-img info-player2-img-accessory"` +
		accessory +
		` >
		</div>
	</div>` +
		infoAccessory +
		`
	
</div>`
	);
}
