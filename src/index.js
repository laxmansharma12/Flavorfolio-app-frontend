import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/searchProvider.js";
import { AuthProvider } from "./context/authProvider.js";
import { RecipesProvider } from "./context/recipesProvider.js";
import { SavedRecipeProvider } from "./context/savedRecipesProvider.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthProvider>
		<SearchProvider>
			<RecipesProvider>
				<SavedRecipeProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</SavedRecipeProvider>
			</RecipesProvider>
		</SearchProvider>
	</AuthProvider>
);
