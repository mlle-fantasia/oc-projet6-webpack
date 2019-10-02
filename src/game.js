import "./scss/main.scss";
import App from "./classes/App";
import $ from "jquery";

$(document).ready(function() {
	let players = JSON.parse(localStorage.getItem("players"));
	let univers = localStorage.getItem("univers");
	let newGrid = $("<div class='grid world" + univers + "-background'></div>");
	$(".world").append($(newGrid));
	console.log("lplayers", players);
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
	for (let i = 0; i < cell.objects.length; i++) {
		const object = cell.objects[i];
		let image = $("<div class='img-object-grid " + object.imageGrid + " '></div>");
		newCase.append(image);
	}
}
