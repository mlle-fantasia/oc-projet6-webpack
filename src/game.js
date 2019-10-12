import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import Player from "./classes/Player";
import World from "./classes/World";
var indexCurrentPlayer = 0;
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

	//tour par tour
	nextPlayer();
});
function nextPlayer() {
	window.app.currentPlayer = app.players[indexCurrentPlayer];
	let player = app.players[indexCurrentPlayer];
	renderYourTurn(player);
}
function renderYourTurn(player) {
	setTimeout(function() {
		alert("coucou " + player.playerName + " c'est à toi de jouer !");
		player.showMove(app.grid);
		render(app.grid);
		$(".case").click(event => {
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
				}, 100);
			} else {
				alert("vous ne pouvez pas aller sur cette case");
			}
		});
		indexCurrentPlayer++;
	}, 2000);
	/* let modal =
		`<div class="modal fade hide" tabindex="-1" role="dialog" id="modalYourTurn">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
		 <div class="modal-header">
			<h5 class="modal-title text-center">` +
		player.name +
		`</h5>
		 </div>
		 <div class="modal-body">
			<p>A vous de jouer !!!</p>
		 </div>
		 <div class="modal-footer">
			<button type="button" class="btn btn-primary">OK</button>
		 </div>
	  </div>
	</div>
 </div>`;
	$("#game").prepend(modal);
	$.noConflict();
	$("#modalYourTurn").modal("show"); */
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
			let image = $("<div class='img-object-grid " + object.imageGrid + " '></div>");
			newCase.append(image);
			if (object instanceof Player) {
				for (let i = 0; i < object.accessories.length; i++) {
					const accessory = object.accessories[i];
					let image = $("<div class='img-accessory-grid " + accessory.imageGrid + " '></div>");
					newCase.append(image);
				}
			}
		}
	}
}
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
		<div class="col-6 info-player-accessory">
		</div>
		</div>
	</div>`
	);
}
