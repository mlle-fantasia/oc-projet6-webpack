import "./scss/main.scss";

$(document).ready(function() {
	localStorage.clear();
	let nbPlayer = 0;

	$("#nbPlayer").change(() => {
		nbPlayer = $("#nbPlayer").val();
		if (nbPlayer > 1 && nbPlayer < 5) {
			showPlayerChoice(nbPlayer);
		}
		for (let index = 1; index <= nbPlayer; index++) {
			$("#btn-valider-player" + index).click(() => {
				validPlayer(index + "");
			});
		}
	});

	$("#btn-start-game").click(() => {
		let univers = $("input[type=radio][name=univers]:checked").val();
		console.log("univers", univers);
		localStorage.setItem("players", JSON.stringify(players));
		localStorage.setItem("univers", univers);
		window.location.href = "game.html";
		console.log("je suis tjs sur la première page");
	});
});
