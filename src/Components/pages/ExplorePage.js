import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/Layout";
import styled from "styled-components";
import axios from "axios";
import { Radio, Select } from "antd";
import { useAuth } from "../../context/authProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Option = Select;
const MyrecipesContainer = styled.div`
	width: 100%;
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	FaRegQuestionCircle.QuestionMark {
	}
`;

const MyRecipesInnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: 100%;
	padding: 20px;
	gap: 20px;
	max-width: 1260px;
	min-height: 75vh;
	background-color: rgb(229, 231, 235);
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	.recipeLink {
		text-decoration: none;
		color: #000;
	}
	@media (max-width: 1320px) {
		max-width: 970px;
		justify-content: center;
	}
	@media (max-width: 1000px) {
		max-width: 650px;
		justify-content: center;
	}
	@media (max-width: 640px) {
		width: 89%;
	}
`;
const Recipe = styled.div`
	height: fit-content;
	width: 300px;
	display: flex;
	background-color: transparent;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	transition: all 0.5s ease-in-out;
	margin-bottom: 10px;
	&:hover {
		transform: translateY(-10px);
		filter: brightness(1.1);
	}
`;

const EmptyRecipes = styled.div`
	margin: auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 10px;
	.label {
		font-size: 50px;
	}
`;

const L = styled.label`
	font-size: 16px;
	font-weight: bold;
`;
const Name = styled.h3`
	margin: 5px 0 0 0;
	font-weight: 600;
`;

const Img = styled.img`
	border-radius: 15px;
	object-fit: cover;
	margin: 0;
	height: 196px;
	width: 280px;
`;
const Span = styled.span`
	color: rgb(66, 64, 64);
	font-size: 13px;
`;

const Div = styled.div`
	width: 100%;
	padding: 0 0 10px 22px;
	@media (max-width: 640px) {
		padding: 0 0 10px 28px;
	}
`;

const Title = styled.div`
	width: 100%;
	max-width: 1300px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	label {
		color: rgb(66, 64, 64);
	}
	@media (max-width: 1320px) {
		width: 96%;
	}
	@media (max-width: 640px) {
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		h1 {
			font-size: x-large;
		}
		label {
			font-size: 15px;
		}
	}
`;

const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	width: 93%;
`;

const H1 = styled.h1``;

const Section = styled.div`
	.select-category {
		width: 160px;
		color: #000;
		border: 1px solid rgb(66, 64, 64);
		border-radius: 10px;
	}
`;
const RadioGroup = styled.div`
	@media (max-width: 1120px) {
		display: none;
	}
`;
const SelectGroup = styled.div`
	@media (min-width: 1120px) {
		display: none;
	}
`;

const ExplorePage = () => {
	const [recipesListArray, setRecipesListArray] = useState([]);
	const [recipesList, setRecipesList] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("All");
	const [auth, setAuth] = useAuth();
	const [userId, setUserId] = useState([]);
	const [search, setSearch] = useState([]);
	const [fetchedRecipes, setFetchedRecipes] = useState([]);
	const navigate = useNavigate();
	const [showBookMarkControll, setShowBookMarkControll] = useState({});

	useEffect(() => {
		setUserId(auth?.user);
	}, [auth]);

	//get all category
	const getAllCategory = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/category/get-category`
			);
			if (data?.success) {
				setCategories(data?.category);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wwent wrong in getting catgeory");
		}
	};

	//get all recipes
	const GetMyRecipes = async () => {
		if (auth?.user) {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food`
				);
				setRecipesListArray(data?.foods);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const updateSearchRecipes = recipesListArray.filter(
			(list) => list?.category === category
		);
		setSearch(updateSearchRecipes);
	}, [category]);

	//get all recipes
	const GetMySavedRecipes = async () => {
		if (auth?.user) {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-savedRecipes`
				);
				const updatedRecipesListArray = data?.Recipes.filter(
					(list) => list?.userId === auth?.user._id
				);

				// Set the new array to the state
				setFetchedRecipes(updatedRecipesListArray);
			} catch (error) {
				console.log(error);
			}
		}
	};

	//lifecycle method
	useEffect(() => {
		getAllCategory();
		GetMyRecipes();
		GetMySavedRecipes();
	}, [auth?.user]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const sortSavedRecipes = () => {
		const idsArray1 = recipesListArray.map((item) => item);
		const idsArray2 = fetchedRecipes.map((item) => item._id);

		const uniqueIdsArray1 = idsArray1.filter((id) =>
			idsArray2.includes(id._id)
		);

		const uniqueIdsArray2 = idsArray1.filter(
			(id) => !idsArray2.includes(id._id)
		);
		// // Set the new array to the state
		setSavedRecipes(uniqueIdsArray1);
		setRecipesList(uniqueIdsArray2);
	};

	useEffect(() => {
		sortSavedRecipes();
	}, [recipesListArray]); // Add recipesListArray as a dependency to avoid infinite loop

	const handleSaveRecipe = async (e, recipe) => {
		e.stopPropagation();

		try {
			const RecipeData = new FormData();
			RecipeData.append("name", recipe.name);
			RecipeData.append("_id", recipe._id);
			RecipeData.append("description", recipe.description);
			RecipeData.append("ingredients", recipe.ingredients);
			RecipeData.append("steps", recipe.steps);
			RecipeData.append("photo", recipe.photo);
			RecipeData.append("userId", userId._id);
			RecipeData.append("category", recipe.category);
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/save-recipe`,
				RecipeData
			);
			if (data.success) {
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteSavedRecipe = async (e, id) => {
		e.stopPropagation();
		try {
			const res = await axios.delete(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/delete-recipe/${id}`
			);
			toast.success(res?.data?.message);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const toggleBookMark = (recipeId) => {
		setShowBookMarkControll((prevSaveRecipes) => ({
			...prevSaveRecipes,
			[recipeId]: !prevSaveRecipes[recipeId],
		}));
	};

	return (
		<Layout title={"ExploreRecipes"}>
			<MyrecipesContainer>
				<Title>
					<H1>Explore all</H1>
					<Section>
						<RadioGroup>
							<Radio.Group
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
								}}
							>
								<>
									<Radio.Button value="All">All</Radio.Button>
									{categories?.map((c) => (
										<Radio.Button key={c._id} value={c._id}>
											{c.name}
										</Radio.Button>
									))}
								</>
							</Radio.Group>
						</RadioGroup>
						<SelectGroup>
							<Select
								placeholder="Sort by category"
								className="select-category"
								size="large"
								onChange={(value) => {
									setCategory(value);
								}}
							>
								{auth.user && (
									<>
										{categories?.map((c) => (
											<Option key={c._id} value={c._id}>
												{c.name ? c.name : ""}
											</Option>
										))}
									</>
								)}
							</Select>
						</SelectGroup>
					</Section>
					<L>Total Recipes: {recipesListArray.length}</L>
				</Title>

				<MyRecipesInnerContainer>
					<>
						{auth?.user ? (
							<>
								{savedRecipes.map((list) => (
									<Recipe
										key={list._id}
										onClick={() => {
											navigate(`/recipe/${list.slug}`);
										}}
									>
										<Img
											src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${list._id}`}
											alt="Recipe Photo"
										></Img>
										<Div>
											<SubTitle>
												<Name>{list?.name?.substring(0, 25)}</Name>
												{!showBookMarkControll[list._id] && (
													<IoBookmark
														size={20}
														color="grey"
														onClick={(e) => {
															e.stopPropagation();
															handleDeleteSavedRecipe(e, list._id);
															toggleBookMark(list._id);
														}}
													/>
												)}

												{showBookMarkControll[list._id] && (
													<IoBookmarkOutline
														size={20}
														onClick={(e) => {
															e.stopPropagation();
															toggleBookMark(list._id);
															handleSaveRecipe(e, list);
														}}
													/>
												)}
											</SubTitle>
											<Span>{list?.updatedAt?.substring(0, 10)}</Span>
										</Div>
									</Recipe>
								))}
								{recipesList.map((list) => (
									<Recipe
										key={list._id}
										onClick={() => {
											navigate(`/recipe/${list.slug}`);
										}}
									>
										<Img
											src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${list._id}`}
											alt="Recipe Photo"
										></Img>
										<Div>
											<SubTitle>
												<Name>{list?.name?.substring(0, 25)}</Name>
												{showBookMarkControll[list._id] && (
													<IoBookmark
														size={20}
														color="grey"
														onClick={(e) => {
															e.stopPropagation();
															handleDeleteSavedRecipe(e, list._id);
															toggleBookMark(list._id);
														}}
													/>
												)}

												{!showBookMarkControll[list._id] && (
													<IoBookmarkOutline
														size={20}
														onClick={(e) => {
															e.stopPropagation();
															toggleBookMark(list._id);
															handleSaveRecipe(e, list);
														}}
													/>
												)}
											</SubTitle>
											<Span>{list?.updatedAt?.substring(0, 10)}</Span>
										</Div>
									</Recipe>
								))}
							</>
						) : (
							<>
								{recipesListArray.map((list) => (
									<Recipe
										key={list._id}
										onClick={() => {
											navigate(`/recipe/${list.slug}`);
										}}
									>
										<Img
											src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${list._id}`}
											alt="Recipe Photo"
										></Img>
										<Div>
											<SubTitle>
												<Name>{list?.name?.substring(0, 25)}</Name>
												<IoBookmarkOutline
													size={20}
													onClick={(e) => {
														e.stopPropagation();
														toast.error("Please login to save recipe");
													}}
												/>
											</SubTitle>
											<Span>{list?.updatedAt?.substring(0, 10)}</Span>
										</Div>
									</Recipe>
								))}
							</>
						)}
					</>
				</MyRecipesInnerContainer>
			</MyrecipesContainer>
		</Layout>
	);
};

export default ExplorePage;
