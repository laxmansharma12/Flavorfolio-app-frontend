import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import ExplorePage from "./pages/ExplorePage.js";
import Login from "./pages/LoginPage.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import Registeration from "./pages/RegisterationPage.js";
import ContactPage from "./pages/ContactPage.js";
import AddRecipePage from "./pages/AddRecipePage.js";
import MyRecipe from "./pages/MyRecipePage.js";
import SavedRecipe from "./pages/SavedRecipePage.js";
import PageNotFound from "./pages/PageNotFound.js";
import { SearchPage } from "./pages/SearchPage.js";
import { RecipeDetails } from "./pages/RecipeDetails.js";
import UpdateRecipe from "./pages/UpdateRecipe.js";
import Recipes from "./pages/CategoryPage/RecipesPage.js";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/recipe/:slug" element={<RecipeDetails />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/register" element={<Registeration />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/recipe-category/:slug" element={<Recipes />} />
				<Route path="/addrecipe" element={<AddRecipePage />} />
				<Route path="/myrecipe" element={<MyRecipe />} />
				<Route path="/savedrecipe" element={<SavedRecipe />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/update-recipe/:slug" element={<UpdateRecipe />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
