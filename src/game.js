import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";
import Player from "./classes/Player";

$(document).ready(function() {
	let players = JSON.parse(localStorage.getItem("players"));
	//console.log("players juste get from localstorage", players);
	let univers = localStorage.getItem("univers");
	//console.log("univers juste get from localstorage", univers);
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));

	let app = new App(players, univers);
	render(app.grid);
});

function render(grid) {
	let cellSize = $(".world").width() / grid.length;
	for (let y = 0; y < grid.length; y++) {
		const line = grid[y];
		let newLine = $("<div class='line'></div>");
		$(".grid").append(newLine);
		for (let x = 0; x < line.length; x++) {
			const cell = line[x];
			let newCase = $("<div class='case ' style='width:" + cellSize + "px;height:" + cellSize + "px'></div>");
			renderObjectCell(cell, newCase);
			newLine.append(newCase);
		}
	}
}

function renderObjectCell(cell, newCase) {
	//console.log("Cell", cell);
	//let image = $("<img src='../images/player1.jpg' alt='player'>");
	if (cell.objects.length) {
		for (let i = 0; i < cell.objects.length; i++) {
			const object = cell.objects[i];
			console.log("object", object);
			let image = $("<div class='img-object-grid " + object.imageGrid + " '></div>");
			newCase.append(image);
			if (object instanceof Player) {
				console.log("coucou", object);
				for (let i = 0; i < object.accessories.length; i++) {
					const accessory = object.accessories[i];
					let image = $("<div class='img-accessory-grid " + accessory.imageGrid + " '></div>");
					newCase.append(image);
				}
			}
		}
	}

	/* if (cell.objects.length && cell.objects[0] instanceof Player) {
		for (let i = 0; i < cell.objects[0].accessories.length; i++) {
			const accessory = cell.objects[0].accessories[i];
			let image = $("<div class='img-object-grid " + accessory.imageGrid + " '></div>");
			newCase.append(image);
		}
	} */
}
