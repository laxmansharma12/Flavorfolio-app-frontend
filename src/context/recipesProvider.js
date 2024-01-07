import { createContext, useContext, useEffect, useState } from "react";
const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
	const [recipes, setRecipes] = useState({
		foods: null,
	});
	useEffect(() => {
		const data = localStorage.getItem("AllRecipes");
		if (data) {
			const parseData = JSON.parse(data);
			setRecipes({
				...recipes,
				foods: parseData.foods,
			});
		}
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
