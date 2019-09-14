import Grid from "/static/grid.js";
import Firm from "/static/firm.js";
import Instantiate from "/static/instantiate.js"
import World from "/static/world.js";

//script.js
export const canvas = document.getElementById('canvas');
export const world = new World({
	individuals: null,
	firms: null,
	houses: null
});
export const grid = new Grid(canvas, world);
export const instantiate = new Instantiate(grid, canvas, world);
export const firm_1 = new Firm(instantiate.firm_1_props);
export const firm_2 = new Firm(instantiate.firm_2_props);
export const firm_3 = new Firm(instantiate.firm_3_props);
export const firm_4 = new Firm(instantiate.firm_4_props);
export const firm_5 = new Firm(instantiate.firm_5_props);
