import test from "./c.js";
export const a = 888;
if (module.hot) {
	module.hot.accept('./c', ()=> {
		debugger
		test();
	})
}