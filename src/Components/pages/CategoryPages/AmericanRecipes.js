import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Layout } from "../../Layouts/Layout";

const AmericanRecipesContainer = styled.div`
	width: 100%;
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	FaRegQuestionCircle.QuestionMark {
	}
`;

const AmericanRecipesInnerContainer = styled.div`
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

const AmericanRecipes = () => {
	const [recipesListArray, setRecipesListArray] = useState([]);

	//get all recipes
	const GetMyRecipes = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food`
			);
			const updatedRecipesListArray = data?.foods.filter(
				(list) => list?.category === "65806212a2ae14d295402246"
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
		<Layout title={"AmericanRecipes"}>
			<AmericanRecipesContainer>
				<H1>American Recipes</H1>
				<L>
					American food is a vibrant mosaic of flavors, reflecting the diverse
					cultural influences that shape the nation.
				</L>
				<AmericanRecipesInnerContainer>
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
												<Name>{list.name.substring(0, 25)}</Name>
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
				</AmericanRecipesInnerContainer>
			</AmericanRecipesContainer>
		</Layout>
	);
};

export default AmericanRecipes;
