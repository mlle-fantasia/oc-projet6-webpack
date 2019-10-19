import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import Player from "./classes/Player";
//import modalComponent from "../public/include/modal";
import Weapon from "./classes/Weapon";
import Modal from "./classes/modal";
var indexCurrentPlayer = -1;

$(document).ready(function() {
	let players = JSON.parse(localStorage.getItem("players"));
	let univers = localStorage.getItem("univers");
	$("#game").addClass("game-" + univers);
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));

	window.app = new App(players, univers);
	console.log("app.players", window.app.players);
	render(window.app.grid);
	renderInfoAllPlayer(window.app.players);
	//tour par tour
	nextPlayer();
});
function nextPlayer() {
	indexCurrentPlayer++;
	//window.app.currentPlayer = app.players[indexCurrentPlayer];
	let player = app.players[indexCurrentPlayer % window.app.players.length];
	renderYourTurn(player);
}
function renderYourTurn(player) {
	$(".info-current-player").empty();
	let info = renderInfoCurrentPlayer(player);
	$(".info-current-player").append(info);
	player.showMove(app.grid);
	render(app.grid);
	renderInfoAllPlayer(window.app.players);
	$(".player-" + player.playerNum).addClass("zoom");

	let monCallback = event => {
		let x, y;
		let object = false;
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
			object = true;
		} else {
			x = parseInt($(event.target).attr("data-x"));
			y = parseInt($(event.target).attr("data-y"));
		}

		if (player.isMovableCell(x, y, window.app.grid)) {
			player.move(x, y, window.app.grid);
			render(app.grid);
			let isObject = player.hasObjectToTake(x, y, window.app.grid);
			if (isObject) {
				let modal = new Modal(isObject.constructor.name, isObject);
				$("#game").prepend(modal.render());
				$(".modal-response").click(e => {
					if (e.target.dataset.response) {
						player.takeObject(x, y, app.grid);
					}
					$(".container-modal-component").remove();
					render(app.grid);
					$(".case").unbind("click", monCallback);
					nextPlayer();
				});
				return;
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
async function doRequests(uris) {
	for (const uri of uris) {
		await fetch(uri);
		await wait(1000);
	}
}
async function wait(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
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
