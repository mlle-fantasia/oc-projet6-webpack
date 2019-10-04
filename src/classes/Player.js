export default class Player {
	constructor(name, heroNum, playerNum, accessories) {
		const tabVariablePlayer = { ptVie: [10, 12, 14, 10, 12, 13], force: [10, 12, 14, 10, 12, 13] };
		this.playerName = name;
		this.playerNum = playerNum;
		this.image = "hero" + heroNum + "-img";
		this.imageGrid = "hero" + heroNum + "-grid";
		this.ptVie = tabVariablePlayer.ptVie[heroNum];
		this.accessories = accessories;
	}
}
