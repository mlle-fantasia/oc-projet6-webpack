import Cell from "./Cell";
import Utils from "./Utils";
import Accessory from "./Accessory";
import Weapon from "./Weapon";

export default class Player {
	constructor(name, heroNum, playerNum, accessories) {
		const tabVariablePlayer = {
			ptVie: [10, 12, 14, 10, 12, 13],
			force: [10, 12, 14, 10, 12, 13],
			type: ["motorisé", "ailé", "énervé", "force-calme", "patriote", "hasardeux"],
			pointFort: [
				{ value: "fast", text: "peut se déplacer plus vite", chance: 20 },
				{ value: "attack", text: "peut attaquer deux fois", chance: 20 },
				{ value: "steal", text: "peut voler un objet", chance: 20 },
				{ value: "move", text: "peut déplacer les obstacles", chance: 50 },
				{ value: "long", text: "peut attaquer de plus loin", chance: 10 },
				{ value: "critique", text: "à plus de chance de faire des coups critique", chance: 30 }
			]
		};
		this.playerName = name;
		this.playerNum = playerNum;
		this.heroNum = heroNum;
		this.image = "hero" + heroNum + "-img";
		this.imageGrid = "hero" + heroNum + "-grid";
		this.ptVieMax = tabVariablePlayer.ptVie[heroNum - 1];
		this.ptVie = tabVariablePlayer.ptVie[heroNum - 1];
		this.type = tabVariablePlayer.type[heroNum - 1];
		this.pointFort = tabVariablePlayer.pointFort[heroNum - 1];
		this.accessories = accessories;
		this.placeX;
		this.placeY;
		this.movableCell;
		//this.playerInfo = this.showPlayerInfo();
	}
	showMove(grid) {
		this.movableCell = Utils.showMove(grid, this.placeX, this.placeY, this.pointFort);
	}

	// test si une case est movable , return true ou false
	isMovableCell(x, y, grid) {
		if (grid[x][y].movable === true) {
			return true;
		} else {
			return false;
		}
	}
	move(x, y, grid) {
		let oldPlayerCell = new Cell(this.placeX, this.placeY, []);
		Utils.updateCell(this.placeX, this.placeY, oldPlayerCell, grid);
		this.placeX = x;
		this.placeY = y;
		let newPlayerCell;
		if (grid[x][y].objects && grid[x][y].objects.length) {
			grid[x][y].objects.push(this);
			newPlayerCell = grid[x][y];
		} else {
			newPlayerCell = new Cell(x, y, [this]);
		}
		Utils.updateCell(x, y, newPlayerCell, grid);
		for (let c = 0; c < this.movableCell.length; c++) {
			const coordinate = this.movableCell[c];
			grid[coordinate.x][coordinate.y].movable = false;
		}
		console.log("grid", grid);
	}

	hasObjectToTake(x, y, grid) {
		if (grid[x][y].objects.length < 2) {
			return false;
		}
		let object = grid[x][y].objects[0];
		return object;
		/* if (
			confirm(
				"Vous avez trouvé un objet ! c'est : " +
					object.text +
					", sont avantage est : " +
					object.avantageText +
					". " +
					avntagetempoel +
					" Souhaitez vous le prendre et laisser l'objet de même type sur place ? "
			)
		) {
			this.takeObject(x, y, grid);
		} */
	}

	takeObject(x, y, grid) {
		console.log("coucou");
		let objectGrid = grid[x][y].objects[0];
		let weaponPlayer = this.accessories[0];
		let accessoryPlayer;
		if (this.accessories[1]) {
			accessoryPlayer = this.accessories[1];
		}
		if (objectGrid instanceof Weapon) {
			this.accessories[0] = objectGrid;
			grid[x][y].objects[0] = weaponPlayer;
		}
		if (objectGrid instanceof Accessory) {
			this.accessories[1] = objectGrid;
			if (accessoryPlayer) {
				grid[x][y].objects[0] = accessoryPlayer;
			} else {
				grid[x][y].objects.shift();
			}
			console.log("grid[x][y].objects", grid[x][y].objects);
		}
		/* for (let a = 0; a < this.accessories.length; a++) {
			let objectPlayer = this.accessories[a];
			const accessory = this.accessories[a];
			if (accessory instanceof Weapon && object instanceof Weapon) {
				this.accessories[a] = object;
				grid[x][y].objects[0] = objectPlayer;
			}
			if (accessory instanceof Accessory && object instanceof Accessory) {
				this.accessories[a] = object;
				grid[x][y].objects[1] = objectPlayer;
			}else{
				this.accessories[a] = object;
				grid[x][y].objects[1] = objectPlayer;
			}
		} */
	}
	/* 	showPlayerInfo() {
		return (
			`<div class="info-player">
		<div class='info-player-text info-player-titre pt-4'>Joueur ` +
			this.playerNum +
			`</div>
		<div class=" info-player-text info-player-name"> Nom : ` +
			this.playerName +
			`</div>
		<img src="../images/players/img/hero` +
			this.heroNum +
			`.jpg" class="d-block w-100" alt="...">
			<input type="range" class="info-player-text info-player-pt-vie" name="ptVie"
         min="0" max="` +
			this.ptVieMax +
			`" value="` +
			this.ptVie +
			`" disabled>
			<div class="info-player-text">
			<p> Type : ` +
			this.type +
			`</p>
			<p>Point fort : ` +
			this.pointFort.text +
			`</p>
			</div>
			<div class="row">
			<div class="col-6 info-player-weapon">
			</div>
			<div class="col-6 info-player-accessory">
			</div>
			</div>
		</div>`
		);
	}*/
}
