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
				<Route path="/addrecipe" element={<AddRecipePage />} />
				<Route path="/myrecipe" element={<MyRecipe />} />
				<Route path="/savedrecipe" element={<SavedRecipe />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
