import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/pages/HomePage.js";
import ExplorePage from "./Components/pages/ExplorePage.js";
import Login from "./Components/pages/LoginPage.js";
import ForgotPassword from "./Components/pages/ForgotPassword.js";
import Registeration from "./Components/pages/RegisterationPage.js";
import ContactPage from "./Components/pages/ContactPage.js";
import AddRecipePage from "./Components/pages/AddRecipePage.js";
import MyRecipe from "./Components/pages/MyRecipePage.js";
import SavedRecipe from "./Components/pages/SavedRecipePage.js";
import PageNotFound from "./Components/pages/PageNotFound.js";
import { SearchPage } from "./Components/pages/SearchPage.js";
import { RecipeDetails } from "./Components/pages/RecipeDetails.js";
import UpdateRecipe from "./Components/pages/UpdateRecipe.js";
import IndianRecipes from "./Components/pages/CategoryPages/IndianRecipes.js";
import ThaiRecipes from "./Components/pages/CategoryPages/ThaiRecipes.js";
import AmericanRecipes from "./Components/pages/CategoryPages/AmericanRecipes.js";
import ChineseRecipes from "./Components/pages/CategoryPages/ChineseRecipes.js";
import MexicanRecipes from "./Components/pages/CategoryPages/MexicanRecipes.js";
import OtherRecipes from "./Components/pages/CategoryPages/OtherRecipes.js";

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
				<Route path="/indian" element={<IndianRecipes />} />
				<Route path="/thai" element={<ThaiRecipes />} />
				<Route path="/american" element={<AmericanRecipes />} />
				<Route path="/chinese" element={<ChineseRecipes />} />
				<Route path="/mexican" element={<MexicanRecipes />} />
				<Route path="/other" element={<OtherRecipes />} />
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
