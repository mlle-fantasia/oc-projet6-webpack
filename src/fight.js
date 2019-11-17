import "./scss/main.scss";
import $ from "jquery";
import "babel-polyfill";
import Utils from "./classes/Utils";

const ANIMATE = ["shew", "rotate", "rotateX", "rotateY", "rotate3d", "scale"];
let playerDefence = JSON.parse(localStorage.getItem("playerToFight"));
let playerAttack = JSON.parse(localStorage.getItem("player"));
let combatants = [{ type: "defence", player: playerDefence }, { type: "attack", player: playerAttack }];
let indexCurrentPlayer = playerAttack;
let univers = localStorage.getItem("univers");
let remainingPlayers = localStorage.getItem("remainingPlayers");
$(document).ready(function() {
	$(".btn-playerDefence").prop("disabled", true);
	$(".btn-playerAttack").prop("disabled", false);
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
	calculFight(playerDefence);
	calculFight(playerAttack);

	$("#btn-attack-playerDefence").click(() => {
		$(".btn-playerDefence").prop("disabled", true);
		$("#btn-attack-playerAttack").prop("disabled", false);
		if (playerAttack.potion) {
			$("#btn-use-potion-playerAttack").prop("disabled", false);
		}
		playerAttack.ptVie = playerAttack.ptVie - (playerDefence.force - playerAttack.resistance);
		renderptViePlayer(playerAttack, "attack", playerDefence);

		let animate = ANIMATE[Math.floor(ANIMATE.length * Math.random())];
		$(".img-defence-player").addClass("translate-defence");
		setTimeout(() => {
			$(".img-defence-player").removeClass("translate-defence");
			$(".img-attack-player").addClass(animate);
			setTimeout(() => {
				$(".img-attack-player").removeClass(animate);
			}, 1000);
		}, 1000);
	});
	$("#btn-attack-playerAttack").click(() => {
		$("#btn-attack-playerDefence").prop("disabled", false);
		$(".btn-playerAttack").prop("disabled", true);
		if (playerDefence.potion) {
			$("#btn-use-potion-playerDefence").prop("disabled", false);
		}
		playerDefence.ptVie = playerDefence.ptVie - (playerAttack.force - playerDefence.resistance);
		renderptViePlayer(playerDefence, "defence", playerAttack);

		let animate = ANIMATE[Math.floor(ANIMATE.length * Math.random())];
		$(".img-attack-player").addClass("translate-attack");
		setTimeout(() => {
			$(".img-attack-player").removeClass("translate-attack");
			$(".img-defence-player").addClass(animate);
			setTimeout(() => {
				$(".img-defence-player").removeClass(animate);
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

	$("#retour-test").click(async () => {
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
	});
});
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
	$(".player-" + type + "-vie").text(playerToMaj.ptVie);
	if (playerToMaj.ptVie <= 0) {
		setTimeout(async () => {
			$("." + type + "-player").fadeOut("slow");
			setTimeout(async () => {
				let responseModal = await Utils.showModal(player, "winFight", null, remainingPlayers);
				if (responseModal) {
					let newGrid = deletePlayer(playerToMaj);
					if (remainingPlayers > 0) {
						retourGame(newGrid);
					} else {
						window.location.href = "index.html";
					}
				}
			}, 1000);
		}, 1000);
	}
}
function deletePlayer(player) {
	let grid = JSON.parse(localStorage.getItem("grid"));
	grid[player.placeX][player.placeY].objects = [];
	localStorage.setItem("playerDead", JSON.stringify(player));
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
