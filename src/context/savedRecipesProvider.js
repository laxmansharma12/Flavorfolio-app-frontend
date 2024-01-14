import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authProvider";

const SavedRecipeContext = createContext();
const FetchedRecipeContext = createContext();

const SavedRecipeProvider = ({ children }) => {
	const [fetchedRecipes, setFetchedRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [auth, setAuth] = useAuth();
	const GetMySavedRecipes = async () => {
		try {
			if (auth?.user?._id) {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/single-user/${auth?.user?._id}`
				);
				// Set the new array to the state
				if (data) {
					setSavedRecipes(data?.user?.savedRecipes);
					// Extracting all IDs from fetchedRecipes
					const recipeIds = data?.user?.savedRecipes.map(
						(recipe) => recipe._id
					);

					// Assuming setSavedRecipes is a state update function
					setFetchedRecipes(recipeIds);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		GetMySavedRecipes();
	}, [auth]);
	return (
		<>
			<SavedRecipeContext.Provider value={[savedRecipes, setSavedRecipes]}>
				<FetchedRecipeContext.Provider
					value={[fetchedRecipes, setFetchedRecipes]}
				>
					{children}
				</FetchedRecipeContext.Provider>
			</SavedRecipeContext.Provider>
		</>
	);
};

const useAllSavedRecipes = () => useContext(SavedRecipeContext);
const useAllFetchedRecipes = () => useContext(FetchedRecipeContext);
export { useAllSavedRecipes, SavedRecipeProvider, useAllFetchedRecipes };
