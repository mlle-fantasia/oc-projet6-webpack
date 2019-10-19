import "./scss/main.scss";
import "bootstrap";
import carouselHeroes from "../public/include/carousel-heroes.js";

let world = 0;
let nbPlayer = 0;
const backgroundHero = ["black", "#bda88d", "#898c7e", "#822701", "#788898", "#a69486", "#434343"];
let players = [];

$(document).ready(function() {
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

	$("#btn-start-game").click(() => {
		if (!world || !players) {
			alert("vous devez choisir un univers ET des joueurs");
		} else {
			console.log("univers", world);
			localStorage.setItem("players", JSON.stringify(players));
			localStorage.setItem("univers", world);
			window.location.href = "game.html";
		}
	});
});

function appendCarouselHero(i) {
	$(".container-choice-heroes").empty();
	let carousel = carouselHeroes.render(i);
	$(".container-choice-heroes").append(carousel);
	$(".container-choice-heroes").css("background-color", backgroundHero[1]);
	$(".container-choice-heroes").fadeIn();
}
function functiontruc(p) {
	if (players.length < p && nbPlayer >= p) {
		appendCarouselHero(p);
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
					players.push({
						hero: h,
						playerName: name
					});
					$(".container-choice-heroes").slideUp();
					if (nbPlayer > p) {
						functiontruc(p + 1);
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
