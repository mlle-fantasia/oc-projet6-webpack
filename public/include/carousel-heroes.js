const render = function render(numPlayer) {
	let carousel =
		`<div class="container">
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
            <div id="slide-hero1" class="carousel-item active " class="slide-hero1player` +
		numPlayer +
		`">
               <div class="row">
                  <div class="col-md-7">
                     <img src="../images/players/img/hero1.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ` +
		numPlayer +
		`</h5>
                           <label for='playerName` +
		numPlayer +
		`'>Votre nom : </label>
                           <input class='inputplayerName1' type='text' name='playerName` +
		numPlayer +
		`'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">L'elfe inventeur fou</h5>
                           <p class="flex-grow-1">
                              Type : motorisé <br>
                              Point de vie : 10 <br>
                              Point fort : peut se déplacer plus vite
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero1player` +
		numPlayer +
		`">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero2" class="carousel-item " class="slide-hero2player` +
		numPlayer +
		`">
               <div class="row">
                  <div class="col-md-7">
                     <img src="../images/players/img/hero2.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ` +
		numPlayer +
		`</h5>
                           <label for='playerName` +
		numPlayer +
		`'>Votre nom : </label>
                           <input class='inputplayerName2' type='text' name='playerName` +
		numPlayer +
		`'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">L'elfe dresseur le dragon</h5>
                           <p class="flex-grow-1">
                              Type : ailé<br>
                              Point de vie : 12 <br>
                              Point fort : peut attaquer deux fois
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero2player` +
		numPlayer +
		`">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
            <div id="slide-hero3" class="carousel-item " class="slide-hero3player` +
		numPlayer +
		`">
               <div class="row">
                  <div class="col-md-7">
                     <img src="../images/players/img/hero3.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ` +
		numPlayer +
		`</h5>
                           <label for='playerName` +
		numPlayer +
		`'>Votre nom : </label>
                           <input class='inputplayerName3' type='text' name='playerName` +
		numPlayer +
		`'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">Le mercenaire venu du sud</h5>
                           <p class="flex-grow-1">
                              Type : enervé<br>
                              Point de vie : 12 <br>
                              Point fort : ?
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero3player` +
		numPlayer +
		`">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero4" class="carousel-item " class="slide-hero4player` +
		numPlayer +
		`">
               <div class="row">
                  <div class="col-md-7">
                     <img src="../images/players/img/hero4.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ` +
		numPlayer +
		`</h5>
                           <label for='playerName` +
		numPlayer +
		`'>Votre nom : </label>
                           <input class='inputplayerName4' type='text' name='playerName` +
		numPlayer +
		`'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">L'homme des cavernes aveugle</h5>
                           <p class="flex-grow-1">
                              Type : force-calme<br>
                              Point de vie : 12 <br>
                              Point fort : ?
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero4player` +
		numPlayer +
		`">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero5" class="carousel-item " class="slide-hero5player` +
		numPlayer +
		`">
               <div class="row">
                  <div class="col-md-7">
                     <img src="../images/players/img/hero5.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ` +
		numPlayer +
		`</h5>
                           <label for='playerName` +
		numPlayer +
		`'>Votre nom : </label>
                           <input class='inputplayerName5' type='text' name='playerName` +
		numPlayer +
		`'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">Le gardien de la citadelle</h5>
                           <p class="flex-grow-1">
                              Type : enervé<br>
                              Point de vie : 12 <br>
                              Point fort : ?
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero5player` +
		numPlayer +
		`">Jouer avec ce
                              Personnage</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="slide-hero6" class="carousel-item " class="slide-hero6player` +
		numPlayer +
		`">
               <div class="row">
                  <div class="col-md-7">
                     <img src="../images/players/img/hero6.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="col-md-4">
                     <div class=" d-none d-md-block h-100">
                        <div class="legend-hero d-flex flex-column h-100">
                        <div class='playerName'>
                           <h5 class='mt-5 titre-shadow'>Joueur ` +
		numPlayer +
		`</h5>
                           <label for='playerName` +
		numPlayer +
		`'>Votre nom : </label>
                           <input class='inputplayerName6' type='text' name='playerName` +
		numPlayer +
		`'></input>
                        </div>
                           <h5 class="flex-grow-0 mt-4 titre-shadow">Le maître du destin</h5>
                           <p class="flex-grow-1">
                              type : enervé<br>
                              Point de vie : 12 <br>
                              Point fort : peut imiter le point fort d'un autre joueur
                           </p>
                           <button class="flex-grow-0 btn-hero form-control" id="hero6player` +
		numPlayer +
		`">Jouer avec ce
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

const render2 = function render(numPlayer) {
	let carousel =
		`
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <ol class="carousel-indicators">
     <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
   </ol>
   <div class="carousel-inner">
     <div class="carousel-item active">
       <img class="d-block w-100" src="../images/players/img/player6.jpg" alt="First slide">
     </div>
     <div class="carousel-item">
       <img class="d-block w-100" src="../images/players/img/player3.jpg" alt="Second slide">
     </div>
     <div class="carousel-item">
       <img class="d-block w-100" src="../images/players/img/player5.jpg" alt="Third slide">
       <div class=" d-none d-md-block h-100">
                        
                           <button class="flex-grow-0 btn-hero form-control" id="hero6player` +
		numPlayer +
		`">Jouer avec ce
                              Personnage</button>
                      

                     </div>
     </div>
   </div>
   <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="sr-only">Previous</span>
   </a>
   <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="sr-only">Next</span>
   </a>
 </div>`;

	return carousel;
};

export default {
	render
};
