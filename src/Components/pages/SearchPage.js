import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/searchProvider";
import { Layout } from "../Layouts/Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAllFetchedRecipes } from "../../context/savedRecipesProvider";
import axios from "axios";
import { useAuth } from "../../context/authProvider";

const SearchRecipeContainer = styled.div`
	width: 100%;
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	FaRegQuestionCircle.QuestionMark {
	}
`;

const SearchRecipeInnerContainer = styled.div`
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
	@media (max-width: 1320px) {
		max-width: 970px;
		justify-content: center;
	}
	@media (max-width: 1000px) {
		max-width: 650px;
		justify-content: center;
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

const Img = styled.img`
	border-radius: 15px;
	object-fit: cover;
	margin: 0;
	height: 196px;
	width: 280px;
`;

const Div = styled.div`
	width: 100%;
	padding: 0 0 10px 22px;
	@media (max-width: 640px) {
		padding: 0 0 10px 28px;
	}
`;
const Name = styled.h3`
	margin: 5px 0 0 0;
	font-weight: 600;
`;
const Span = styled.span`
	color: rgb(66, 64, 64);
	font-size: 13px;
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
		width: 95%;
	}
`;
const H1 = styled.h1``;
const L = styled.label`
	font-size: 16px;
	font-weight: bold;
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
const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	width: 93%;
`;

export const SearchPage = () => {
	const [values, setValues] = useSearch();
	const [userId, setUserId] = useState([]);
	const [auth, setAuth] = useAuth();
	const [showBookMarkControll, setShowBookMarkControll] = useState({});
	const [fetchedRecipes, setFetchedRecipes] = useAllFetchedRecipes();

	const navigate = useNavigate();

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

	useEffect(() => {
		setUserId(auth?.user?._id);
	}, [values]);

	return (
		<Layout title={"Search results"}>
			<SearchRecipeContainer>
				<Title>
					<H1>Search Results</H1>
					<L>Found: {values?.results.length}</L>
				</Title>
				<SearchRecipeInnerContainer>
					{values?.results.length < 1 ? (
						<EmptyRecipes>
							<L className="label">No Recipes Found</L>
						</EmptyRecipes>
					) : (
						<>
							{values?.results.map((list) => (
								<Recipe
									key={list._id}
									onClick={() => {
										navigate(`/recipe/${list.slug}`);
									}}
								>
									<Img src={list?.photo?.url} alt="Recipe Photo"></Img>
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
						</>
					)}
				</SearchRecipeInnerContainer>
			</SearchRecipeContainer>
		</Layout>
	);
};
