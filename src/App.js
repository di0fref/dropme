import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "tailwindcss/tailwind.css"

import Home from "./pages/Home";
String.prototype.trunc = function (n) {
	return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};
function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<Home />
		</DndProvider>
	);
}

export default App;
