import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import "babel-polyfill";
import Player from "./classes/Player";
import Modal from "./classes/Modal";
import Utils from "./classes/Utils";

var indexCurrentPlayer = -1;
let players = JSON.parse(localStorage.getItem("players"));
let univers = localStorage.getItem("univers");
let retour = localStorage.getItem("retour");
let isEnd = false;

$(document).ready(function() {
	$("#game").addClass("game-" + univers);
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));

	if (localStorage.getItem("grid")) {
		let grid = JSON.parse(localStorage.getItem("grid"));
		window.app = new App(players, univers, grid);
	} else {
		window.app = new App(players, univers);
	}
	console.log("grid", app.grid); //à laisser
	render(app.grid);

	renderInfoAllPlayer(app.players);
	//tour par tour
	if ((univers === "4" || univers === "5" || univers === "6") && !retour) {
		Utils.showModal(app.players[0], "quete" + univers + "Modal1", null);
	}
	nextPlayer();
});
async function nextPlayer() {
	console.log("indexCurrentPlayer", indexCurrentPlayer);
	indexCurrentPlayer++;
	//window.app.currentPlayer = app.players[indexCurrentPlayer];
	let player = app.players[indexCurrentPlayer % app.players.length];
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
			console.log("player", player);
			//let responseModal = await Utils.showModal(player, "powerCopy", playerToCopy);
		}
	}
	let info = renderInfoCurrentPlayer(player);
	$(".info-current-player").append(info);
	player.showMove(app.grid);
	render(app.grid);
	renderInfoAllPlayer(app.players);
	$(".player-" + player.playerNum).addClass("zoom");

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
			render(app.grid);
			if (isEnd) {
				let responseModal = await Utils.showModal(player, "quete" + univers + "ModalDead", null);
				if (responseModal) {
					window.location.href = "index.html";
				}
			}
			let isObject = player.hasObjectToTake(x, y, app.grid);
			if (isObject && player.accessories.length < 2) {
				let responseModal = await Utils.showModal(player, "takeObject", isObject, x, y);
				if (responseModal) {
					player.takeObject(x, y, app.grid);
				}
			}
			let isGate = player.hasGate(x, y, app.grid, retour);
			if (isGate) {
				if (!retour) {
					let responseModal = await Utils.showModal(player, "quete" + univers + "Modal2", null);
					if (responseModal) {
						localStorage.setItem("player", JSON.stringify(player));
						localStorage.setItem(
							"playerToFight",
							JSON.stringify(new Player("Golum", 7, 2, [{ text: "", avantageText: "", imageGrid: "" }]))
						);
						localStorage.setItem("univers", univers);
						localStorage.setItem("grid", JSON.stringify(app.grid));
						window.location.href = "fight.html";
					}
				} else {
					let responseModal = await Utils.showModal(player, "quete" + univers + "ModalSuccess", null);
					if (responseModal) {
						window.location.href = "index.html";
					}
				}
			}
			let isObsToMove = avantageHero4(player, x, y);
			if (isObsToMove) {
				let responseModal = await Utils.showModal(player, "moveObstacle", isObsToMove, x, y);
				if (responseModal) {
					player.moveObstacle(isObsToMove, app.grid, univers);
				}
			}
			let isPlayerToSteal = avantageHero3(player, x, y);
			if (isPlayerToSteal) {
				let responseModal = await Utils.showModal(player, "stealObject", isPlayerToSteal.accessories[1], x, y, isPlayerToSteal);
				if (responseModal) {
					player.stealObject(isPlayerToSteal);
				}
			}
			let isPlayerToFight = testAttaque(player.placeX, player.placeY);
			if (isPlayerToFight) {
				let responseModal = await Utils.showModal(player, "fight", isPlayerToFight, x, y);
				if (responseModal) {
					//player.attack(isPlayerToFight);
					localStorage.setItem("player", JSON.stringify(player));
					localStorage.setItem("playerToFight", JSON.stringify(isPlayerToFight));
					localStorage.setItem("grid", JSON.stringify(app.grid));
					localStorage.setItem("univers", univers);
					window.location.href = "fight.html";
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

function testAttaque(x, y) {
	let isPlayerToFight = Utils.isPlayerToFight(x, y, app.grid, 1);
	if (isPlayerToFight) {
		console.log("combat !!!!", isPlayerToFight);
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
function avantageHero3(player) {
	if (player.pointFort.value !== "steal") {
		return false;
	}
	if (Utils.calculChanceAvantage(player.pointFort)) {
		let otherPlayer = window.app.players.filter(p => {
			return p.playerNum != player.playerNum;
		});
		let playerToSteal = otherPlayer[Math.floor(otherPlayer.length * Math.random())];
		if (playerToSteal.playerNum === player.playerNum) {
			avantageHero3(player);
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
			newCase.append(image);
			if (object instanceof Player) {
				let accessories = $("<div class='d-flex flex-row container-accessories'></div>");
				newCase.append(accessories);
				for (let i = 0; i < object.accessories.length; i++) {
					const accessory = object.accessories[i];
					let image = $("<div class='img-accessory-grid " + accessory.imageGrid + " '></div>");
					accessories.append(image);
				}
			}
		}
	}
}

function renderInfoCurrentPlayer(player) {
	let accessory = "";
	let infoAccessory = "";
	if (player.accessories[1]) {
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
	let heroSize = $(".info-current-player").width();
	let ArmorSize = $(".info-current-player").width() / 2;
	let AccessorySize = $(".info-current-player").width() / 3;
	return (
		`
		<div class="d-flex flex-column cercle-hero">
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
	<div class="info-name info-weapon weapon-text tolkien">` +
		player.accessories[0].text +
		`</div>
	<div class="info-name info-weapon weapon-avantage">` +
		player.accessories[0].avantageText +
		`</div>
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
function renderInfoAllPlayer(players) {
	$(".info-all-players").empty();
	$(".info-all-players").append(`<div class="info-name tolkien">Les joueurs</div>`);
	let widthPlayer = $(".info-all-players").width() / 2.5;
	for (let p = 0; p < players.length; p++) {
		const player = players[p];
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
