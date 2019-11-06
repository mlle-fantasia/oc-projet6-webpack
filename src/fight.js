import "./scss/main.scss";
import $ from "jquery";
import "babel-polyfill";
import Utils from "./classes/Utils";

const ANIMATE = ["shew", "rotate", "rotateX", "rotateY", "rotate3d", "scale"];
let playerDefence = JSON.parse(localStorage.getItem("playerToFight"));
let playerAttack = JSON.parse(localStorage.getItem("player"));
let indexCurrentPlayer = playerAttack;
let univers = localStorage.getItem("univers");
$(document).ready(function() {
	$(".btn-playerDefence").prop("disabled", true);
	$(".btn-playerAttack").prop("disabled", false);
	$("#fight").addClass("game-" + univers);
	$(".fight-background").addClass("world" + univers + "-background");
	let elementPlayerAttack = $(
		" <img class='img-attack-player' src='images/players/grid/player" + playerAttack.heroNum + "figure.png' alt='image du joueur qui attaque'/>"
	);
	let elementPlayerDefence = $(
		"<img class='img-defence-player' src='images/players/grid/player" + playerDefence.heroNum + "figure.png' alt='image du joueur qui defend'/>"
	);
	$(".attack-player").append($(elementPlayerAttack));
	$(".defence-player").append($(elementPlayerDefence));
	let infoplayerDefence = renderInfoPlayerAttack(playerDefence);
	let infoplayerAttack = renderInfoPlayerAttack(playerAttack);
	$(".info-attack-player").append(infoplayerAttack);
	$(".info-defence-player").append(infoplayerDefence);

	$("#btn-attack-playerDefence").click(() => {
		$(".btn-playerDefence").prop("disabled", true);
		$(".btn-playerAttack").prop("disabled", false);
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
		$(".btn-playerDefence").prop("disabled", false);
		$(".btn-playerAttack").prop("disabled", true);
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

	$("#retour-test").click(async () => {
		console.log("quete" + univers + "Modal3");
		let responseModal = await Utils.showModal(playerAttack, "quete" + univers + "Modal3", null);
		if (responseModal) {
			console.log("univers", univers);
			if (univers === "6") {
				let responseModal = await Utils.showModal(playerAttack, "quete6Modal3success", null);
				if (responseModal) {
					localStorage.setItem("player", JSON.stringify(playerAttack));
					localStorage.setItem("univers", univers);
					localStorage.setItem("retour", true);
					localStorage.setItem("grid", localStorage.getItem("grid"));
					window.location.href = "game.html";
				}
			}
		} else {
			Utils.showModal(playerAttack, "quete" + univers + "Modal3fail", null);
		}
	});
});

function renderInfoPlayerAttack(player) {
	console.log("player", player);
	let weapon = "";
	let infoWeapon = "";
	if (player.accessories[0]) {
		weapon = 'src="images/accessories/' + player.accessories[0].imageGrid + '.png" alt="image arme"';
		infoWeapon =
			'<div class="info-name info-weapon weapon-text tolkien">' +
			player.accessories[0].text +
			'</div><div class="info-name info-weapon weapon-avantage">' +
			player.accessories[0].avantageText +
			"</div>";
	}
	let accessory = "";
	let infoAccessory = "";
	if (player.accessories && player.accessories[1]) {
		accessory = 'src="images/accessories/' + player.accessories[1].imageGrid + '.png" alt="image accessoire"';
		let temp = player.accessories[1].temporality === "perpetual" ? "avantage permanent" : "avantage ponctuel";
		infoAccessory =
			`<div class="info-name info-accessory accessory-text tolkien">` +
			player.accessories[1].text +
			`</div>
		<div class="info-name info-accessory accessory-avantage">` +
			player.accessories[1].avantageText +
			`</div>
			<div class="info-name info-accessory accessory-temp">` +
			temp +
			`</div>`;
	}
	let heroSize = $(".info-attack-player").width();
	let ArmorSize = $(".info-attack-player").width() / 2;
	let AccessorySize = $(".info-attack-player").width() / 3;
	console.log("player.accessories ", player.accessories);
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
		` +
		infoWeapon +
		`
		</div>
	</div>
	
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
