import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import Player from "./classes/Player";
//import modalComponent from "../public/include/modal";
import Weapon from "./classes/Weapon";
import Modal from "./classes/modal";
import Utils from "./classes/Utils";
var indexCurrentPlayer = -1;
let players = JSON.parse(localStorage.getItem("players"));
let univers = localStorage.getItem("univers");
$(document).ready(function() {
	$("#game").addClass("game-" + univers);
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));

	window.app = new App(players, univers);
	console.log("app.players", app.players);
	render(app.grid);
	renderInfoAllPlayer(app.players);
	//tour par tour
	nextPlayer();
});
function nextPlayer() {
	indexCurrentPlayer++;
	//window.app.currentPlayer = app.players[indexCurrentPlayer];
	let player = app.players[indexCurrentPlayer % app.players.length];
	renderYourTurn(player);
}
function renderYourTurn(player) {
	$(".info-current-player").empty();
	let info = renderInfoCurrentPlayer(player);
	$(".info-current-player").append(info);
	player.showMove(app.grid);
	render(app.grid);
	console.log("app.players", app.players);
	renderInfoAllPlayer(app.players);
	$(".player-" + player.playerNum).addClass("zoom");

	let monCallback = event => {
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
		console.log("app.grid[x][y]", app.grid[x][y]);
		if (player.isMovableCell(x, y, app.grid)) {
			player.move(x, y, app.grid);
			render(app.grid);
			let isObject = player.hasObjectToTake(x, y, window.app.grid);
			if (isObject && player.accessories.length < 2) {
				showModal(player, "takeObject", isObject, x, y);
				return;
			}
			let isObsToMove = avantageHero4(player, x, y);
			if (isObsToMove) {
				showModal(player, "moveObstacle", isObsToMove, x, y);
				return;
			}
			let isPlayerToSteal = avantageHero3(player, x, y);
			if (isPlayerToSteal) {
				showModal(player, "stealObject", isPlayerToSteal.accessories[1], x, y, isPlayerToSteal);
			}
			render(app.grid);
			$(".case").unbind("click", monCallback);
			nextPlayer();
		} else {
			let modal = new Modal("errorMove", null);
			$("#game").prepend(modal.render());
			$(".modal-response").click(e => {
				$(".container-modal-component").remove();
			});
		}
	};
	$(".case").bind("click", monCallback);
}
function showModal(player, functionToCall, object, x, y, isPlayerToSteal) {
	let modalType = object.constructor.name;
	if (functionToCall === "moveObstacle") {
	}
	if (functionToCall === "stealObject") {
		modalType = "steal";
	}
	let modal = new Modal(modalType, object);
	$("#game").prepend(modal.render());
	$(".modal-response").click(e => {
		if (e.target.dataset.response === "true") {
			switch (functionToCall) {
				case "takeObject":
					player.takeObject(x, y, app.grid);
					break;
				case "moveObstacle":
					player.moveObstacle(object, app.grid, univers);
					break;
				case "stealObject":
					player.stealObject(isPlayerToSteal);
					break;
			}
			$(".container-modal-component").remove();
			render(app.grid);
		} else {
			$(".container-modal-component").remove();
			if (functionToCall === "takeObject") {
				let isObsToMove = avantageHero4(player, x, y);
				if (isObsToMove) {
					showModal(player, "moveObstacle", isObsToMove, x, y);
				}
			}
			if (functionToCall === "takeObject" || functionToCall === "moveObstacle") {
				let isPlayerToSteal = avantageHero3(player);
				if (isPlayerToSteal) {
					showModal(player, "stealObject", isPlayerToSteal.accessories[1], x, y, isPlayerToSteal);
				}
			}
			if (functionToCall === "takeObject" || functionToCall === "moveObstacle" || functionToCall === "stealObject") {
				let isPlayerToFight = testAttaque(player);
				if (isPlayerToFight) {
					showModal(player, "fight", isPlayerToFight, x, y);
				}
			}
		}
		render(app.grid);
		console.log("fin", app.grid);
		nextPlayer();
	});
}
function testAttaque(player) {
	console.log("attaque ? ");
}

function avantageHero4(player, x, y) {
	if (player.heroNum !== 4) {
		return false;
	}
	if (Utils.calculChanceAvantage(player.pointFort)) {
		let isObsToMove = Utils.isObstacleNear(x, y, app.grid, false);
		return isObsToMove;
	}
}
function avantageHero3(player) {
	if (player.heroNum !== 3) {
		return false;
	}
	if (Utils.calculChanceAvantage(player.pointFort)) {
		let playerToSteal = window.app.players[Math.floor(window.app.players.length * Math.random())];
		if (playerToSteal.playerNum === player.playerNum) {
			console.log("moi");
			avantageHero3(player);
		} else {
			if (playerToSteal.accessories.length < 2) {
				console.log("pas d'objet à voler");
				playerToSteal = null;
			}
			console.log("playerToSteal", playerToSteal);
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
	let widthPlayer = $(".info-all-players").width() / 2;
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
