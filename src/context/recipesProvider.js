import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
	const [recipes, setRecipes] = useState([]);
	const GetMyRecipes = async () => {
		try {
			//get all recipes
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food`
			);
			const localData = localStorage.getItem("AllRecipes");
			if (localData && data?.foods?.length === localData.length) {
				const parseData = JSON.parse(localData);
				setRecipes({
					...recipes,
					foods: parseData.foods,
				});
			} else {
				if (data.success) {
					setRecipes({
						...recipes,
						foods: data.foods,
					});
					localStorage.setItem("AllRecipes", JSON.stringify(data));
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		GetMyRecipes();
	}, []);
	return (
		<RecipesContext.Provider value={[recipes, setRecipes]}>
			{children}
		</RecipesContext.Provider>
	);
};

//custom hook
const useAllRecipes = () => useContext(RecipesContext);
export { useAllRecipes, RecipesProvider };
