import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../Layouts/Layout";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/authProvider";
import { useAllRecipes } from "../../../context/recipesProvider";
import { useAllFetchedRecipes } from "../../../context/savedRecipesProvider";

const OtherRecipesContainer = styled.div`
	width: 100%;
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	FaRegQuestionCircle.QuestionMark {
	}
`;

const OtherRecipesInnerContainer = styled.div`
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
	box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
		rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
		rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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

const L = styled.label`
	width: 500px;
	text-align: center;
	font-size: 16px;
	color: rgb(66, 64, 64);
	margin-bottom: 30px;
	@media (max-width: 640px) {
		width: 90%;
	}
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

const H1 = styled.h1`
	margin-bottom: 5px;
`;

const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	width: 93%;
`;
const OtherRecipes = () => {
	const [recipesListArray, setRecipesListArray] = useState([]);
	const [auth, setAuth] = useAuth();
	const [userId, setUserId] = useState([]);
	const [recipes, setRecipes] = useAllRecipes();
	const [fetchedRecipes, setFetchedRecipes] = useAllFetchedRecipes();
	const navigate = useNavigate();
	const [showBookMarkControll, setShowBookMarkControll] = useState({});

	useEffect(() => {
		setUserId(auth?.user?._id);
	}, [recipes]);

	//get all recipes
	const GetOtherRecipes = async () => {
		try {
			const updatedRecipesListArray = recipes?.foods.filter(
				(list) => list?.category === "65806243a2ae14d29540224f"
			);
			setRecipesListArray(updatedRecipesListArray);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//lifecycle method
	useEffect(() => {
		GetOtherRecipes();
	}, [recipes]);

	const handleSaveRecipe = async (e, recipe) => {
		e.stopPropagation();
		try {
			if (auth?.user) {
				const RecipeData = new FormData();
				RecipeData.append("_id", recipe._id);
				RecipeData.append("userId", userId);
				const { data } = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/save-recipe`,
					RecipeData
				);
				if (data.success) {
					toggleBookMark(recipe._id);
					toast.success(data.message);
				} else {
					toast.error(data.message);
				}
			} else {
				toast.error("Please Login To Save");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const toggleBookMark = (recipeId) => {
		setShowBookMarkControll((prevSaveRecipes) => ({
			...prevSaveRecipes,
			[recipeId]: !prevSaveRecipes[recipeId],
		}));
	};

	return (
		<Layout title={"OtherRecipes"}>
			<OtherRecipesContainer>
				<H1>Other Recipes</H1>
				<L>
					Food recipes embody the essence of culinary creativity, blending
					diverse flavors into a harmonious symphony for the taste buds.
				</L>
				<OtherRecipesInnerContainer>
					{recipesListArray.map((list) => (
						<Recipe
							key={list._id}
							onClick={() => {
								navigate(`/recipe/${list.slug}`);
							}}
						>
							<Img src={list?.photo?.url} alt="Recipe Photo" />
							<Div>
								<SubTitle>
									<Name>{list?.name?.substring(0, 25)}</Name>
									{fetchedRecipes.includes(list._id) ? (
										<>
											{!showBookMarkControll[list._id] && (
												<IoBookmark
													size={20}
													color="grey"
													onClick={(e) => {
														e.stopPropagation();
														handleSaveRecipe(e, list);
													}}
												/>
											)}
											{showBookMarkControll[list._id] && (
												<IoBookmarkOutline
													size={20}
													onClick={(e) => {
														e.stopPropagation();
														handleSaveRecipe(e, list);
													}}
												/>
											)}
										</>
									) : (
										<>
											{showBookMarkControll[list._id] && (
												<IoBookmark
													size={20}
													color="grey"
													onClick={(e) => {
														e.stopPropagation();
														handleSaveRecipe(e, list);
													}}
												/>
											)}
											{!showBookMarkControll[list._id] && (
												<IoBookmarkOutline
													size={20}
													onClick={(e) => {
														e.stopPropagation();
														handleSaveRecipe(e, list);
													}}
												/>
											)}
										</>
									)}
								</SubTitle>
								<Span>{list?.updatedAt?.substring(0, 10)}</Span>
							</Div>
						</Recipe>
					))}
				</OtherRecipesInnerContainer>
			</OtherRecipesContainer>
		</Layout>
	);
};

export default OtherRecipes;
