import "./scss/main.scss";
import "bootstrap";
import "babel-polyfill";
import carouselHeroes from "../public/include/carousel-heroes.js";
import Utils from "./classes/Utils";
import Player from "./classes/Player";
import imgHero1 from "../public/images/players/img/hero1.jpg";
import imgHero2 from "../public/images/players/img/hero2.jpg";
import imgHero3 from "../public/images/players/img/hero3.jpg";
import imgHero4 from "../public/images/players/img/hero4.jpg";
import imgHero5 from "../public/images/players/img/hero5.jpg";
import imgHero6 from "../public/images/players/img/hero6.jpg";
const imagesHeroes = {
	1: imgHero1,
	2: imgHero2,
	3: imgHero3,
	4: imgHero4,
	5: imgHero5,
	6: imgHero6
};

let world = 0;
let nbPlayer = 0;
const backgroundHero = ["black", "#bda88d", "#898c7e", "#822701", "#788898", "#a69486", "#434343"];
let players = [];
let typeJeu;
const tabHeroes = Utils.tabHeroes();

$(document).ready(function() {
	localStorage.clear();
	$(".jeu-solo").hide();
	$(".jeu-multijoueur").hide();
	$("#sectionChoicePlayers").hide();
	$("#sectionChoicePlayer").hide();
	$("#sectionChoiceWorld").hide();
	$("#sectionChoiceQuete").hide();
	$("#container-choice-heroes").hide();
	$(".container-choice-heroes").css("background-color", backgroundHero[1]);
	$(".btn-start-game").attr("disabled", true);
	for (let i = 1; i <= 3; i++) {
		$(".btn-worldQuete" + i).click(() => {
			world = i;
			$(".worldQuete" + i).addClass("selected-border");
			$(".btn-worldQuete" + i).addClass("selected-background");
			for (let j = 1; j <= 3; j++) {
				if (j !== i) {
					$(".worldQuete" + j).removeClass("selected-border");
					$(".btn-worldQuete" + j).removeClass("selected-background");
				}
			}
		});
	}

	$("#solo").click(() => {
		typeJeu = "solo";
		nbPlayer = 1;
		$("#choiceMultijoueur").slideUp();
		$(".jeu-solo").slideDown();
	});
	$("#multiplayer").click(() => {
		typeJeu = "multijoueur";
		$("#choiceMultijoueur").slideUp();
		$(".jeu-multijoueur").slideDown();
	});
	/// solo
	$("#showChoiceQuete").click(() => {
		$("#sectionChoiceQuete").slideDown();
	});
	$("#showChoicePlayer").click(() => {
		$("#sectionChoicePlayer").slideDown();
		functiontruc(1, typeJeu);
	});
	/// multi joueur
	$("#showChoiceWorld").click(() => {
		$("#sectionChoiceWorld").slideDown();
	});
	$("#showChoicePlayers").click(() => {
		$("#sectionChoicePlayers").slideDown();
	});
	$("input[type=radio][name=nbPlayer]").change(() => {
		$(".container-all-heroes").fadeOut();
		nbPlayer = $("input[type=radio][name=nbPlayer]:checked").val();
		nbPlayer = parseInt(nbPlayer);
		functiontruc(1, typeJeu);
	});

	$("#btn-start-game").click(() => {
		if (!world || !players) {
			alert("vous devez choisir un univers ET des joueurs");
		} else {
			localStorage.setItem("players", JSON.stringify(players));
			if (typeJeu === "solo") {
				localStorage.setItem("univers", world + 3);
			}
			if (typeJeu === "multijoueur") {
				localStorage.setItem("univers", world);
			}
			window.location.href = "game.html";
		}
	});
	$("#btn-retour").click(() => {
		window.location.reload();
	});
});

function appendCarouselHero(i, typeJeu) {
	if (typeJeu === "multijoueur") {
		$(".container-choice-heroes").empty();
		let carousel = carouselHeroes.render(i);
		$(".container-choice-heroes").append(carousel);
		$(".container-choice-heroes").css("background-color", backgroundHero[1]);
		$(".container-choice-heroes").fadeIn();
	}
	if (typeJeu === "solo") {
		$(".container-choice-heroe").empty();
		let carousel = carouselHeroes.render(i);
		$(".container-choice-heroe").append(carousel);
		$(".container-choice-heroe").css("background-color", backgroundHero[1]);
		$(".container-choice-heroe").fadeIn();
	}
}
function functiontruc(p, typeJeu) {
	if (players.length < p && nbPlayer >= p) {
		appendCarouselHero(p, typeJeu);
		$(".carouselExampleCaptions").on("slid.bs.carousel", function(e) {
			for (let i = 1; i <= 6; i++) {
				if (e.relatedTarget.id === "slide-hero" + i) {
					$(".container-choice-heroes").css("background-color", backgroundHero[i]);
				}
			}
		});
		for (let h = 1; h <= 6; h++) {
			$("#hero" + h + "player" + p).click(() => {
				if (!$(".inputplayerName" + h).val()) {
					alert("vous devez renseigner un nom pour votre personnage");
				} else {
					let name = $(".inputplayerName" + h).val();
					let pl = new Player(name, h, players.length - 1, []);
					players.push(pl);
					renderchoosenPlayer();
					$(".container-choice-heroes").slideUp();
					$(".container-choice-heroe").slideUp();
					if (nbPlayer > p) {
						functiontruc(p + 1, typeJeu);
					}
					if (players.length === nbPlayer) {
						$(".btn-start-game").attr("disabled", false);
						$("#sectionChoicePlayers").slideUp();
					}
				}
			});
		}
	}
}
function renderchoosenPlayer() {
	$(".show-players-choosen").empty();
	//$(".show-players-choose").append(`<div class="info-name tolkien">Les joueurs</div>`);
	//let widthPlayer = $(".show-players-choose").width() / 6;
	for (let p = 0; p < players.length; p++) {
		const player = players[p];

		let onePlayer = `<div class="player-index player" ><div class="info-name tolkien">Joueur 
			${p + 1} : ${player.playerName} 
			</div>
	<div class="background-cercle-player-hero">
		<div class="container-info-players-vie">
			<div id="triangle-1"></div>
			<div id="triangle-2"></div>
		</div>
		<div class="info-players-vie"> ${player.ptVie} </div>
		<img class="info-player2-img info-player2-img-hero " src="${imagesHeroes[player.heroNum]}"
			alt="image hero">
	</div>
	<div class="info-name">
			${player.hero} <br> 
			${player.pointFort.text} <br> 
			(taux de chance : ${player.pointFort.chance} %)</div>
</div>`;
		$(".show-players-choosen").append(onePlayer);
	}
}
