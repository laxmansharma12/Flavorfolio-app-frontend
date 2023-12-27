import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/searchProvider.js";
import { AuthProvider } from "./context/authProvider.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthProvider>
		<SearchProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</SearchProvider>
	</AuthProvider>
);
