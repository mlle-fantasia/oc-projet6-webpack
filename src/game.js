import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import "babel-polyfill";
import Player from "./classes/Player";
import Modal from "./classes/Modal";
import Utils from "./classes/Utils";
import Weapon from "./classes/Weapon";
import Accessory from "./classes/Accessory";

var indexCurrentPlayer = -1;
let players = JSON.parse(localStorage.getItem("players"));
let univers = localStorage.getItem("univers");
let retour = localStorage.getItem("retour");
let isEnd = false;
let remainingOrcs = 6;

$(document).ready(function() {
	$("#game").addClass("game-" + univers);
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));

	if (localStorage.getItem("grid")) {
		let grid = JSON.parse(localStorage.getItem("grid"));
		if (localStorage.getItem("playerDead")) {
			let playerDead = JSON.parse(localStorage.getItem("playerDead"));
			let indexPlayerDead = players.findIndex(element => element.name === playerDead.name);
			players.splice(indexPlayerDead, 1);
		}
		window.app = new App(players, univers, grid);
	} else {
		window.app = new App(players, univers);
	}
	console.log("grid", app.grid); //à laisser
	render(app.grid);

	renderInfoAllPlayer(app.players);
	//tour par tour
	if ((univers === "4" || univers === "5" || univers === "6") && !retour) {
		Utils.showModal(app.players[0], "quete" + univers + "Modal1", null, null, univers);
	}
	nextPlayer();
});
async function nextPlayer() {
	indexCurrentPlayer++;
	const players = app.players.filter(player => player.canMove);
	let player = players[indexCurrentPlayer % players.length];
	await renderYourTurn(player);
}
async function renderYourTurn(player) {
	$(".info-current-player").empty();
	if (player.heroNum === 6) {
		let otherPlayer = app.players.filter(p => {
			return p.playerNum != player.playerNum;
		});
		let playerToCopy = otherPlayer[Math.floor(otherPlayer.length * Math.random())];
		if (playerToCopy) {
			player.pointFort = playerToCopy.pointFort;
			//let responseModal = await Utils.showModal(player, "powerCopy", playerToCopy);
		}
	}
	let infoHtml = renderInfoCurrentPlayer(player);
	let tabAccessoryHtml = renderAccessoriesCurentPlayer(player);
	$(".info-current-player").append(infoHtml);
	for (let i = 0; i < tabAccessoryHtml.length; i++) {
		const html = tabAccessoryHtml[i];
		$(".info-current-player").append(html);
	}
	player.showMove(app.grid);
	render(app.grid);
	renderInfoAllPlayer(app.players);
	$(".player-" + player.playerNum).addClass("zoom");
	$(".icon-info-accessory").click(async event => {
		let x = parseInt(
			$(event.target)
				.parent()
				.attr("data-x")
		);
		let y = parseInt(
			$(event.target)
				.parent()
				.attr("data-y")
		);
		let isObject = app.grid[x][y].objects[0];
		if (isObject) {
			await Utils.showModal(player, "showObject", isObject);
		}
		event.stopPropagation();
	});
	$(".case").click(async () => {
		// get x et y de la case cliquée
		let x, y;
		if ($(event.target).hasClass("img-object-grid")) {
			x = parseInt(
				$(event.target)
					.parent()
					.attr("data-x")
			);
			y = parseInt(
				$(event.target)
					.parent()
					.attr("data-y")
			);
		} else {
			x = parseInt($(event.target).attr("data-x"));
			y = parseInt($(event.target).attr("data-y"));
		}

		if (player.isMovableCell(x, y, app.grid)) {
			player.move(x, y, app.grid);

			if (univers === "6" && retour) {
				isEnd = app.destroyCell(app.grid, univers);
			}
			if (univers === "5") {
				const orcs = app.players.filter(player => !player.canMove);
				app.moveOrcs(orcs, app.grid);
			}
			render(app.grid);
			if (isEnd) {
				let responseModal = await Utils.showModal(player, "quete" + univers + "ModalDead");
				if (responseModal) {
					window.location.href = "index.html";
				}
			}
			let isObject = player.hasObjectToTake(x, y, app.grid);
			if (isObject) {
				if (
					univers === "5" ||
					univers === "4" ||
					player.accessories.length < 2 ||
					(player.accessories.length === 2 && !(isObject instanceof Accessory))
				) {
					let responseModal = await Utils.showModal(player, "takeObject", isObject);
					if (responseModal) {
						player.takeObject(x, y, app.grid, univers);
					}
				}
			}
			let isGate = player.hasGate(x, y, app.grid, retour);

			if (isGate) {
				if (univers === "5") {
					let responseModal = await Utils.showModal(player, "quete4Modal4", null, null, univers);
					if (responseModal) {
						let melkoArme = new Weapon(null, "melko");
						let melko = new Player("Melko", 9, 2, [melkoArme]);
						goPageFight(player, melko, true);
					}
				}
				if (univers === "4") {
					let responseModal = await Utils.showModal(player, "quete4Modal2", null, null, univers);
					if (responseModal) {
						let responseModal = await Utils.showModal(player, "quete4Modal3", null, null, univers);
						if (responseModal) {
							let nbArmee = Math.trunc(Math.random() * (5 - 2) + 2);
							let armee = [];
							for (let i = 0; i < nbArmee; i++) {
								let arme = new Weapon("initial");
								armee.push(new Player("orcs", 8, 2, [arme]));
							}
							goPageFight(player, armee, true);
						}
					}
				}
				if (!retour) {
					let responseModal = await Utils.showModal(player, "quete" + univers + "Modal2", null, null, univers);
					if (responseModal) {
						if (univers === "6") {
							let golumArme = new Weapon(null, "cailloux");
							let golum = new Player("Golum", 7, 2, [golumArme]);
							goPageFight(player, golum, true);
						}

						/* localStorage.setItem("playerToFight", JSON.stringify(player));
						let golumArme = new Weapon(null, "cailloux");
						localStorage.setItem("player", JSON.stringify(new Player("Golum", 7, 2, [golumArme])));
						localStorage.setItem("univers", univers);
						localStorage.setItem("grid", JSON.stringify(app.grid));
						window.location.href = "fight.html"; */
					}
				} else {
					if (univers === "6") {
						let responseModal = await Utils.showModal(player, "quete" + univers + "ModalSuccess", null, null, univers);
						if (responseModal) {
							window.location.href = "index.html";
						}
					}
				}
			}
			let isObsToMove = avantageHero4(player, x, y);
			if (isObsToMove) {
				let responseModal = await Utils.showModal(player, "moveObstacle", isObsToMove);
				if (responseModal) {
					player.moveObstacle(isObsToMove, app.grid, univers);
				}
			}
			let isPlayerToSteal = avantageHeroSteal(player, x, y);
			if (isPlayerToSteal) {
				let responseModal = await Utils.showModal(player, "stealObject", isPlayerToSteal.accessories[1]);
				if (responseModal) {
					player.stealObject(isPlayerToSteal);
				}
			}
			let isPlayerToFight = testAttaque(player.placeX, player.placeY);
			if (isPlayerToFight) {
				if (isPlayerToFight.heroNum === 8) {
					goPageFight(player, isPlayerToFight, true);
				} else {
					let responseModal = await Utils.showModal(player, "fight", isPlayerToFight);
					if (responseModal) {
						goPageFight(player, isPlayerToFight);
					}
				}
			}
			nextPlayer();
		} else {
			let modal = new Modal(player, "errorMove", null);
			$("#game").prepend(modal.render());
			$(".modal-response").click(e => {
				$(".container-modal-component").remove();
			});
		}
	});
}
function goPageFight(player, isPlayerToFight, attackMe = false) {
	if (attackMe) {
		localStorage.setItem("player", JSON.stringify(isPlayerToFight));
		localStorage.setItem("playerToFight", JSON.stringify(player));
	} else {
		localStorage.setItem("player", JSON.stringify(player));
		localStorage.setItem("playerToFight", JSON.stringify(isPlayerToFight));
	}
	localStorage.setItem("grid", JSON.stringify(app.grid));
	localStorage.setItem("univers", univers);
	let remainingPlayers = 0;
	if (players.length > 2) {
		remainingPlayers = players.length - 2;
	}
	if (univers === "5") {
		remainingPlayers = remainingOrcs;
		remainingOrcs--;
	}
	localStorage.setItem("remainingPlayers", remainingPlayers);
	window.location.href = "fight.html";
}
function testAttaque(x, y) {
	let isPlayerToFight = Utils.isPlayerToFight(x, y, app.grid, 1);
	if (isPlayerToFight) {
		return isPlayerToFight;
	} else {
		return false;
	}
}

function avantageHero4(player, x, y) {
	if (player.pointFort.value !== "move") {
		return false;
	}
	if (Utils.calculChanceAvantage(player.pointFort)) {
		let isObsToMove = Utils.isObstacleNear(x, y, app.grid, false);
		return isObsToMove;
	}
}
function avantageHeroSteal(player) {
	if (player.pointFort.value !== "steal") {
		return false;
	}
	if (Utils.calculChanceAvantage(player.pointFort)) {
		let otherPlayer = window.app.players.filter(p => {
			return p.playerNum != player.playerNum;
		});
		let playerToSteal = otherPlayer[Math.floor(otherPlayer.length * Math.random())];
		if (!playerToSteal) return;
		if (playerToSteal.playerNum === player.playerNum) {
			avantageHeroSteal(player);
		} else {
			if (playerToSteal.accessories.length < 2) {
				playerToSteal = null;
			}
			return playerToSteal;
		}
	}
}
function render(grid) {
	$(".grid").empty();
	let cellSize = $(".world").width() / grid.length;
	for (let x = 0; x < grid.length; x++) {
		const line = grid[x];
		let newLine = $("<div class='line'></div>");
		$(".grid").append(newLine);
		for (let y = 0; y < line.length; y++) {
			const cell = line[y];
			let newCase = $(
				"<div class='case movable-" +
					cell.movable +
					"' data-x='" +
					x +
					"' data-y='" +
					y +
					"' style='width:" +
					cellSize +
					"px;height:" +
					cellSize +
					"px'></div>"
			);
			renderObjectCell(cell, newCase);
			newLine.append(newCase);
		}
	}
}

function renderObjectCell(cell, newCase) {
	if (cell.objects && cell.objects.length) {
		for (let i = 0; i < cell.objects.length; i++) {
			const object = cell.objects[i];
			let image = $("<div class='img-object-grid " + object.imageGrid + " player-" + object.playerNum + "'></div>");
			let iconInfo = $("<div class='icon-info-accessory'></div>");
			newCase.append(image);
			if (object instanceof Accessory || object instanceof Weapon) newCase.append(iconInfo);
		}
	}
}

function renderInfoCurrentPlayer(player) {
	let heroSize = $(".info-current-player").width();
	let ArmorSize = $(".info-current-player").width() / 2;
	return (
		`<div class="d-flex flex-column cercle-hero">
	<div class="info-name tolkien">` +
		player.playerName +
		`</div>
	<div class="background-cercle-player-hero" style="height:` +
		heroSize +
		`px">
		<div class="container-info-player-vie">
			<div id="triangle-1"></div>
			<div id="triangle-2"></div>
		</div>
		<div class="info-player-vie">` +
		player.ptVie +
		`</div>
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
			<img class="info-player2-img info-player2-img-armor" src="images/accessories/` +
		player.accessories[0].imageGrid +
		`.png"
				alt="image arme">
		</div>
	</div>
	<div class="container-info-name-weapon">
	<div class="info-name info-weapon weapon-text tolkien">` +
		player.accessories[0].text +
		`</div>
	<div class="info-name info-weapon weapon-avantage">` +
		player.accessories[0].avantageText +
		`</div></div>
</div>
`
	);
}
function renderAccessoriesCurentPlayer(player) {
	let accessories = [];
	for (let i = 1; i < player.accessories.length; i++) {
		const accessory = player.accessories[i];
		let AccessorySize = $(".info-current-player").width() / 3;
		let accessorySRC = "";
		let infoAccessory = "";

		accessorySRC = 'src="images/accessories/' + accessory.imageGrid + '.png" alt="image accessoire"';
		let temp = accessory.temporality === "perpetual" ? "avantage permanent" : "avantage ponctuel";
		infoAccessory =
			`<div class="container-info-name-accessory"><div class="info-name info-accessory accessory-text tolkien">` +
			accessory.text +
			`</div>
		<div class="info-name info-accessory accessory-avantage">` +
			accessory.avantageText +
			`</div>
			<div class="info-name info-accessory accessory-temp">` +
			temp +
			`</div></div>`;

		let oneAccessory =
			`<div class=" container-info-accessory">
		<div class="cercle-accessory ">
			<div class="background-cercle-anneau" style="height:` +
			AccessorySize +
			`px">
				<img class="info-player2-img info-player2-img-accessory"` +
			accessorySRC +
			` >
			</div>
		</div>` +
			infoAccessory +
			`
		
	</div>`;
		accessories.push(oneAccessory);
	}
	return accessories;
}

function renderInfoAllPlayer(players) {
	const players2 = app.players.filter(player => player.canMove);
	$(".info-all-players").empty();
	$(".info-all-players").append(`<div class="info-name tolkien">Les joueurs</div>`);
	let widthPlayer = $(".info-all-players").width() / 2.5;
	for (let p = 0; p < players2.length; p++) {
		const player = players2[p];
		let accessory = "";
		if (player.accessories[1]) {
			accessory = 'src="images/accessories/' + player.accessories[1].imageGrid + '.png" alt="image accessoire"';
		}
		let onePlayer =
			`<div class="player" style="height:` +
			widthPlayer +
			`px">
	<div class="background-cercle-player-hero">
		<div class="container-info-players-vie">
			<div id="triangle-1"></div>
			<div id="triangle-2"></div>
		</div>
		<div class="info-players-vie">` +
			player.ptVie +
			`</div>
		<img class="info-player2-img info-player2-img-hero " src="images/players/img/hero` +
			player.heroNum +
			`.jpg"
			alt="image hero">
			<div class="background-cercle-anneau all-player-weapon">
			<img class="info-player2-img info-player2-img-armor" src="images/accessories/` +
			player.accessories[0].imageGrid +
			`.png"
			alt="image arme"></div>
			<div class="background-cercle-anneau all-player-accessory">
			<img class="info-player2-img info-player2-img-armor" ` +
			accessory +
			`></div>
	</div>
	<div class="info-name tolkien ">` +
			player.playerName +
			`</div>
</div>`;
		$(".info-all-players").append(onePlayer);
	}
}
