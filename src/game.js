import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import Player from "./classes/Player";
import World from "./classes/World";
var indexCurrentPlayer = -1;

$(document).ready(function() {
	$("#btn-info-player3").hide();
	$("#btn-info-player4").hide();
	let players = JSON.parse(localStorage.getItem("players"));
	let univers = localStorage.getItem("univers");
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));

	window.app = new App(players, univers);
	console.log("app.players", window.app.players);
	render(window.app.grid);
	appendInfoPlayer(window.app.players);
	//à appeler à chaque tour
	let infoPlayerTop = renderInfoPlayerTop(window.app.players);
	$(".container-info-player-top").append(infoPlayerTop);
	if (window.app.players.length > 2) {
		let infoPlayer3 = renderInfoPlayer3(window.app.players);
		$(".container-info-player3").append(infoPlayer3);
	}
	if (window.app.players.length > 3) {
		let infoPlayer4 = renderInfoPlayer4(window.app.players);
		$(".container-info-player4").append(infoPlayer4);
	}
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
	setTimeout(function() {
		alert("coucou " + player.playerName + " c'est à toi de jouer !");
		$(".player-" + player.playerNum).addClass("zoom");
		appendInfoPlayer2(player);
		player.showMove(app.grid);
		render(app.grid);

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
				console.log("mouvement accepté");
				player.move(x, y, window.app.grid);
				render(app.grid);
				setTimeout(function() {
					player.hasObjectToTake(x, y, window.app.grid);
					render(app.grid);
					$(".case").unbind("click", monCallback);
					nextPlayer();
				}, 100);
			} else {
				alert("vous ne pouvez pas aller sur cette case");
			}
		};
		$(".case").bind("click", monCallback);
	}, 2000);
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
function appendInfoPlayer2(player) {
	let info = renderInfoPlayer2(player);
	$("#info-player").append(info);
}
function renderInfoPlayer2(player) {}
function appendInfoPlayer(players) {
	for (let p = 0; p < players.length; p++) {
		const player = players[p];
		const numPlayer = p + 1;
		$("#btn-info-player" + numPlayer).show();
		$("#btn-info-player" + numPlayer).click(() => {
			if ($("#info-player" + numPlayer).text().length === 0) {
				let info = renderInfoPlayer(player);
				$("#info-player" + numPlayer).append(info);
				$("#info-player" + numPlayer).slideDown();
			} else {
				$("#info-player" + numPlayer).empty();
			}
		});
	}
}
function renderInfoPlayer(player) {
	let accessory = "";
	if (player.accessories[1]) {
		accessory =
			`<img src="../images/accessories/` +
			player.accessories[1].imageGrid +
			`.png" class="d-block w-100" alt="...">
		<div>` +
			player.accessories[1].text +
			`<br/>
		avantage : ` +
			player.accessories[1].avantageText +
			`<br/>Cet avantage est ` +
			player.accessories[1].temporality +
			`<div>`;
	}
	//console.log("player.accessories", player.accessories[0]);
	return (
		`<div class="info-player  col-12">
	<div class='info-player-text info-player-titre pt-4'>Joueur ` +
		player.playerNum +
		`</div>
	<div class=" info-player-text info-player-name"> Nom : ` +
		player.playerName +
		`</div>
	<img src="../images/players/img/hero` +
		player.heroNum +
		`.jpg" class="d-block w-100" alt="...">
		<input type="range" class="info-player-text info-player-pt-vie" name="ptVie"
		min="0" max="` +
		player.ptVieMax +
		`" value="` +
		player.ptVie +
		`" disabled>
		<div class="info-player-text">
		<p> Type : ` +
		player.type +
		`</p>
		<p>Point fort : ` +
		player.pointFort.text +
		`</p>
		</div>
		<div class="row">
		<div class="col-6 info-player-accessory">
		<img src="../images/accessories/` +
		player.accessories[0].imageGrid +
		`.png" class="d-block w-100" alt="...">
		<p>` +
		player.accessories[0].text +
		`</p>
		<p>Dégats : ` +
		player.accessories[0].degat +
		`</p>

		</div>
		<div class="col-6 info-player-accessory">` +
		accessory +
		`
		</div>
		</div>
	</div>`
	);
}

function renderInfoPlayerTop(players) {
	let player1 = players[0];
	let player2 = players[1];
	let accessoryPlayer1 = player1.accessories[1] ? ' src="images/accessories/' + player1.accessories[1].imageGrid + '.png" alt="image hero 1"' : "";
	let accessoryPlayer2 = player2.accessories[1] ? ' src="images/accessories/' + player2.accessories[1].imageGrid + '.png" alt="image hero 2"' : "";
	return (
		`
		<div class="info-player2 d-flex flex-row justify-content-between">
			<div class="col-md-5">
				<div class="row d-flex flex-row align-items-start">
					<div class="col-md-6 d-flex flex-column px-0">
						<div class="info-player2-name">` +
		player1.playerName +
		`</div>
						<div class="bacground-info-player2 overlay">
							<div class="container-info-playe2-vie-top-left">
								<div id="triangle-1"></div>
								<div id="triangle-2"></div>
							</div>
							<div class="info-playe2-vie-top">` +
		player1.ptVie +
		`</div>
							<img class="info-player2-img info-player2-img-hero " src="images/players/img/hero` +
		player1.heroNum +
		`.jpg"
								alt="image hero">
						</div>

					</div>
					<div class="col-md-4 px-0">
						<div class="bacground-info-player2 overlay">
							<img class="info-player2-img info-player2-img-armor" src="images/accessories/` +
		player1.accessories[0].imageGrid +
		`.png"
								alt="image hero">
						</div>
					</div>
					<div class="col-md-2 px-0">
						<div class="bacground-info-player2 overlay">
						<img class="info-player2-img info-player2-img-accessory" ` +
		accessoryPlayer1 +
		`
		>		
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-5">
				<div class="row d-flex flex-row align-items-start">
					<div class="col-md-2 px-0">
						<div class="bacground-info-player2 overlay">
							<img class="info-player2-img info-player2-img-accessory"` +
		accessoryPlayer2 +
		`
								>
						</div>
					</div>
					<div class="col-md-4 px-0">
						<div class="bacground-info-player2 overlay">
							<img class="info-player2-img info-player2-img-armor" src="images/accessories/` +
		player2.accessories[0].imageGrid +
		`.png"
								alt="image hero">
						</div>
					</div>
					<div class="col-md-6 d-flex flex-column px-0">
						<div class="info-player2-name">` +
		player2.playerName +
		`</div>
						<div class="bacground-info-player2 overlay">
							<div class="container-info-playe2-vie-top-right">
								<div id="triangle-1"></div>
								<div id="triangle-2"></div>
							</div>
							<div class="info-playe2-vie-top">` +
		player2.ptVie +
		`</div>
							<img class="info-player2-img info-player2-img-hero " src="images/players/img/hero` +
		player2.heroNum +
		`.jpg"
								alt="image hero">
						</div>

					</div>
				</div>
			</div>
		</div>
	`
	);
}
function renderInfoPlayer3(players) {
	let player = players[2];
	return (
		`<div class="row d-flex flex-row align-items-end">
<div class="col-md-6 d-flex flex-column px-0">
	<div class="bacground-info-player2 overlay">
		<div class="container-info-playe2-vie-bot-left">
			<div id="triangle-1"></div>
			<div id="triangle-2"></div>
		</div>
		<div class="info-playe2-vie-bot">` +
		player.ptVie +
		`</div>
		<img class="info-player2-img info-player2-img-hero " src="images/players/img/hero2.jpg"
			alt="image hero">
	</div>
	<div class="info-player2-name">` +
		player.playerName +
		`</div>
</div>
<div class="col-md-4 px-0">
	<div class="bacground-info-player2 overlay">
		<img class="info-player2-img info-player2-img-armor" src="images/accessories/dard.png"
			alt="image hero">
	</div>
</div>
<div class="col-md-2 px-0">
	<div class="bacground-info-player2 overlay">
		<img class="info-player2-img info-player2-img-accessory" src="images/accessories/armor.png"
			alt="image hero">
	</div>
</div>
</div>
`
	);
}
function renderInfoPlayer4(players) {
	let player = players[3];
	return (
		`<div class="row d-flex flex-row align-items-end">
		<div class="col-md-2 px-0">
			<div class="bacground-info-player2 overlay">
				<img class="info-player2-img info-player2-img-accessory" src="images/accessories/armor.png"
					alt="image hero">
			</div>
		</div>
		<div class="col-md-4 px-0">
			<div class="bacground-info-player2 overlay">
				<img class="info-player2-img info-player2-img-armor" src="images/accessories/dard.png"
					alt="image hero">
			</div>
		</div>
		<div class="col-md-6 d-flex flex-column px-0">
			<div class="bacground-info-player2 overlay">
				<div class="container-info-playe2-vie-bot-right">
					<div id="triangle-1"></div>
					<div id="triangle-2"></div>
				</div>
				<div class="info-playe2-vie-bot">` +
		player.ptVie +
		`</div>
				<img class="info-player2-img info-player2-img-hero " src="images/players/img/hero2.jpg"
					alt="image hero">
			</div>
			<div class="info-player2-name">` +
		player.playerName +
		`</div>
		</div>
	</div>
`
	);
}
