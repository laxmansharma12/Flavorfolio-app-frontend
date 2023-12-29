import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Layout } from "../../Layouts/Layout";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const IndianRecipesContainer = styled.div`
	width: 100%;
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	FaRegQuestionCircle.QuestionMark {
	}
`;

const IndianRecipesInnerContainer = styled.div`
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
const IndianRecipes = () => {
	const [recipesListArray, setRecipesListArray] = useState([]);
	const [saved, setSaved] = useState(false);

	//get all recipes
	const GetMyRecipes = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food`
			);
			const updatedRecipesListArray = data?.foods.filter(
				(list) => list?.category === "658061c3a2ae14d29540223f"
			);
			// Set the new array to the state
			setRecipesListArray(updatedRecipesListArray);
		} catch (error) {
			console.log(error);
		}
	};

	//lifecycle method
	useEffect(() => {
		GetMyRecipes();
	}, []);

	return (
		<Layout title={"IndianRecipes"}>
			<IndianRecipesContainer>
				<H1>Indian Recipes</H1>
				<L>
					Indian cuisine is a vibrant tapestry of flavors, colors, and aromas,
					weaving together a rich cultural heritage.
				</L>
				<IndianRecipesInnerContainer>
					<>
						{recipesListArray.length !== 0 ? (
							<>
								{recipesListArray.map((list) => (
									<Link
										className="recipeLink"
										key={list._id}
										to={`/recipe/${list.slug}`}
										style={{
											height: "fit-content",
											width: "fit-content",
										}}
									>
										<Recipe>
											<Img
												src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${list._id}`}
												alt="Recipe Photo"
											></Img>
											<Div>
												<SubTitle>
													<Name>{list.name.substring(0, 25)}</Name>
													{/* {!saved && (
														<IoBookmarkOutline
															size={20}
															onClick={() => setSaved(true)}
														/>
													)}
													{saved && (
														<IoBookmark
															size={20}
															color="grey"
															onClick={() => setSaved(false)}
														/>
													)} */}
												</SubTitle>
												<Span>{list.updatedAt.substring(0, 10)}</Span>
											</Div>
										</Recipe>
									</Link>
								))}
							</>
						) : (
							<EmptyRecipes>
								<L className="label">No Recipes</L>
								<L>
									<Link to={"/addrecipe"}>Click here</Link> to add your recipes
								</L>
							</EmptyRecipes>
						)}
					</>
				</IndianRecipesInnerContainer>
			</IndianRecipesContainer>
		</Layout>
	);
};

export default IndianRecipes;
