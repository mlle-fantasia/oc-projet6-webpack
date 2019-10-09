//const Utils = require("../src/classes/Utils");
import Utils from "../src/classes/Utils";

describe("utils", function() {
	it(" isExistCell x trop grand", () => {
		let result = Utils.isExistCell(11, 0);
		expect(result).toBe(false);
	});
	it(" isExistCell Y trop grand", () => {
		let result = Utils.isExistCell(8, 11);
		expect(result).toBe(false);
	});
	it(" isExistCell x trop petit", () => {
		let result = Utils.isExistCell(-1, 6);
		expect(result).toBe(false);
	});
	it(" isExistCell cell existe", () => {
		let result = Utils.isExistCell(5, 0);
		expect(result).toBe(true);
	});
});
