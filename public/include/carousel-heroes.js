import imgHero1 from "../images/players/img/hero1.jpg";
import imgHero2 from "../images/players/img/hero2.jpg";
import imgHero3 from "../images/players/img/hero3.jpg";
import imgHero4 from "../images/players/img/hero4.jpg";
import imgHero5 from "../images/players/img/hero5.jpg";
import imgHero6 from "../images/players/img/hero6.jpg";
import Utils from "../../src/classes/Utils";

const imagesHeroes = {
	1: imgHero1,
	2: imgHero2,
	3: imgHero3,
	4: imgHero4,
	5: imgHero5,
	6: imgHero6
};
const tabHeroes = Utils.tabHeroes();
const render = function render(numPlayer) {
	let carousel = `<div class="container">
   <div class="bd-example">
      <div class="carouselExampleCaptions carousel slide" data-ride="carousel" data-interval="false">
         <ol class="carousel-indicators">
            <li data-target=".carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target=".carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target=".carouselExampleCaptions" data-slide-to="2"></li>
            <li data-target=".carouselExampleCaptions" data-slide-to="3"></li>
            <li data-target=".carouselExampleCaptions" data-slide-to="4"></li>
            <li data-target=".carouselExampleCaptions" data-slide-to="5"></li>
         </ol>
         <div class="carousel-inner">
            <div id="slide-hero1" class="carousel-item active " class="slide-hero1player${numPlayer}">
               <div class="row">
                  <div class="col-md-7">
                     <img src="${imagesHeroes[1]}" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ${numPlayer}</h5>
                           <label for='playerName${numPlayer}'>Votre nom : </label>
                           <input class='inputplayerName1' type='text' name='playerName${numPlayer}'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">${tabHeroes[1].text}</h5>
                           <p class="flex-grow-1">
                              Type : ${tabHeroes[1].type} <br>
                              Point de vie : ${tabHeroes[1].pointVie} <br>
                              Point fort : ${tabHeroes[1].pointFort.text}, (${tabHeroes[1].pointFort.chance} % de chance)
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero1player${numPlayer}">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero2" class="carousel-item " class="slide-hero2player${numPlayer}">
               <div class="row">
                  <div class="col-md-7">
                     <img src="${imagesHeroes[2]}" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ${numPlayer}</h5>
                           <label for='playerName${numPlayer}'>Votre nom : </label>
                           <input class='inputplayerName2' type='text' name='playerName${numPlayer}'></input>
                        </div>
                        <h5 class="flex-grow-0 mt-4 titre-shadow">${tabHeroes[2].text}</h5>
                        <p class="flex-grow-1">
                           Type : ${tabHeroes[2].type} <br>
                           Point de vie : ${tabHeroes[2].pointVie} <br>
                           Point fort : ${tabHeroes[2].pointFort.text} (${tabHeroes[2].pointFort.chance} % de chance)
                        </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero2player${numPlayer}">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
            <div id="slide-hero3" class="carousel-item " class="slide-hero3player${numPlayer}">
               <div class="row">
                  <div class="col-md-7">
                     <img src="${imagesHeroes[3]}" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ${numPlayer}</h5>
                           <label for='playerName${numPlayer}'>Votre nom : </label>
                           <input class='inputplayerName3' type='text' name='playerName${numPlayer}'></input>
                        </div>
                        <h5 class="flex-grow-0 mt-4 titre-shadow">${tabHeroes[3].text}</h5>
                        <p class="flex-grow-1">
                           Type : ${tabHeroes[3].type} <br>
                           Point de vie : ${tabHeroes[3].pointVie} <br>
                           Point fort : ${tabHeroes[3].pointFort.text} (${tabHeroes[3].pointFort.chance} % de chance)
                        </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero3player${numPlayer}">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero4" class="carousel-item " class="slide-hero4player${numPlayer}">
               <div class="row">
                  <div class="col-md-7">
                     <img src="${imagesHeroes[4]}" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ${numPlayer}</h5>
                           <label for='playerName${numPlayer}'>Votre nom : </label>
                           <input class='inputplayerName4' type='text' name='playerName${numPlayer}'></input>
                        </div>
                        <h5 class="flex-grow-0 mt-4 titre-shadow">${tabHeroes[4].text}</h5>
                        <p class="flex-grow-1">
                           Type : ${tabHeroes[4].type} <br>
                           Point de vie : ${tabHeroes[4].pointVie} <br>
                           Point fort : ${tabHeroes[4].pointFort.text} (${tabHeroes[4].pointFort.chance} % de chance)
                        </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero4player${numPlayer}">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero5" class="carousel-item " class="slide-hero5player${numPlayer}">
               <div class="row">
                  <div class="col-md-7">
                     <img src="${imagesHeroes[5]}" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ${numPlayer}</h5>
                           <label for='playerName${numPlayer}'>Votre nom : </label>
                           <input class='inputplayerName5' type='text' name='playerName${numPlayer}'></input>
                        </div>
                        <h5 class="flex-grow-0 mt-4 titre-shadow">${tabHeroes[5].text}</h5>
                        <p class="flex-grow-1">
                           Type : ${tabHeroes[5].type} <br>
                           Point de vie : ${tabHeroes[5].pointVie} <br>
                           Point fort : ${tabHeroes[5].pointFort.text} (${tabHeroes[5].pointFort.chance} % de chance)
                        </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero5player${numPlayer}">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero6" class="carousel-item " class="slide-hero6player${numPlayer}">
               <div class="row">
                  <div class="col-md-7">
                     <img src="${imagesHeroes[6]}" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ${numPlayer}</h5>
                           <label for='playerName${numPlayer}'>Votre nom : </label>
                           <input class='inputplayerName6' type='text' name='playerName${numPlayer}'></input>
                        </div>
                        <h5 class="flex-grow-0 mt-4 titre-shadow">${tabHeroes[6].text}</h5>
                        <p class="flex-grow-1">
                           Type : ${tabHeroes[6].type} <br>
                           Point de vie : ${tabHeroes[6].pointVie} <br>
                           Point fort : ${tabHeroes[6].pointFort.text} (${tabHeroes[6].pointFort.chance} % de chance)
                        </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero6player${numPlayer}">Jouer avec ce
                              Personnage</button>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
         <a class="carousel-control-prev" href=".carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
         </a>
         <a class="carousel-control-next" href=".carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
         </a>
      </div>
   </div>
</div>`;
	return carousel;
};

export default {
	render
};
