import "./scss/main.scss";
import "bootstrap";
import carouselHeroes from "../public/include/carousel-heroes.js";

let world = 0;
let nbPlayer = 0;
const backgroundHero = ["black", "#bda88d", "#8d9082", "#e39944", "#92a2b3", "#b6a294", "#434343"];
let players = [];
/* players = [
	{
		hero: 1,
		playerName: "Marina"
	},
	{
		hero: 4,
		playerName: "Romain"
	},
	{
		hero: 2,
		playerName: "Alexandre"
	}
]; */

$(document).ready(function() {
	console.log("coucou je passe");
	localStorage.clear();
	$("#sectionChoicePlayers").hide();
	$("#sectionChoiceWorld").hide();
	$("#container-choice-heroes").hide();
	$(".container-choice-heroes").css("background-color", backgroundHero[1]);
	$(".btn-start-game").attr("disabled", true);
	for (let i = 1; i <= 3; i++) {
		$("#world" + i).click(() => {
			world = i;
			$(".world" + i).addClass("selected-border");
			$("#world" + i).addClass("selected-background");
			for (let j = 1; j <= 3; j++) {
				if (j !== i) {
					$(".world" + j).removeClass("selected-border");
					$("#world" + j).removeClass("selected-background");
				}
			}
		});
	}
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
		functiontruc(1);
	});
	for (let i = 1; i <= 6; i++) {
		$(".carouselExampleCaptions").on("slide.bs.carousel", function(e) {
			console.log('$(".carouselExampleCaptions")', $(".carouselExampleCaptions"));
			if (e.relatedTarget.id == "slide-hero" + i) {
				$(".container-choice-heroes").css("background-color", backgroundHero[i]);
			}
		});
	}
	$("#btn-start-game").click(() => {
		if (!world || !players) {
			alert("vous devez choisir un univers ET des joueurs");
		} else {
			console.log("univers", world);
			localStorage.setItem("players", JSON.stringify(players));
			localStorage.setItem("univers", world);
			window.location.href = "game.html";
			console.log("je suis tjs sur la première page");
		}
	});
});

function appendCarouselHero(i) {
	$(".container-choice-heroes").empty();
	let carousel = carouselHeroes.render(i);
	$(".container-choice-heroes").append(carousel);
	$(".container-choice-heroes").fadeIn();
	console.log('$(".container-choice-heroes")', $(".container-choice-heroes"));
}
function functiontruc(p) {
	if (players.length < p && nbPlayer >= p) {
		appendCarouselHero(p);
		for (let h = 1; h <= 6; h++) {
			console.log("p", p);
			$("#hero" + h + "player" + p).click(() => {
				if (!$(".inputplayerName" + h).val()) {
					alert("vous devez renseigner un nom pour votre personnage");
				} else {
					let name = $(".inputplayerName" + h).val();
					console.log("name", name);
					players.push({
						hero: h,
						playerName: name
					});
					$(".container-choice-heroes").fadeOut();
					if (nbPlayer > p) {
						functiontruc(p + 1);
					}
					if (players.length === nbPlayer) {
						$(".btn-start-game").attr("disabled", false);
					}
				}
			});
		}
	}
}
