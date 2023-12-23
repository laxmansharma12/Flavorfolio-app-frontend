import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/Layout";
import BgImg from "../images/i-like-food.svg";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const SavedRecipePage = () => {
	const [SavedRecipesListArray, setSavedRecipesListArray] = useState([]);
	const [auth, setAuth] = useAuth();

	//get all saved recipes
	const GetMySavedRecipes = async () => {
		if (auth?.user) {
			try {
				const { data } = await axios.get("/api/v1/food/get-food");
				const updatedSavedRecipesListArray = data?.foods.filter(
					(list) => list?.userId === auth?.user._id
				);

				// Set the new array to the state
				setSavedRecipesListArray(updatedSavedRecipesListArray);
			} catch (error) {
				console.log(error);
			}
		}
	};

	//lifecycle method
	useEffect(() => {
		GetMySavedRecipes();
	}, [auth?.user]);
	return (
		<Layout title={"SavedRecipes"}>
			<SavedRecipesContainer>
				<SavedRecipesInnerContainer>
					<>
						{auth?.user ? (
							<>
								{SavedRecipesListArray.length !== 0 ? (
									<>
										{SavedRecipesListArray.map((list) => (
											<Link
												className="recipeLink"
												key={list._id}
												to={`/myrecipe/${list.slug}`}
												style={{ height: "fit-content", width: "fit-content" }}
											>
												<Recipe>
													<Img
														src={`/api/v1/food/food-photo/${list._id}`}
													></Img>
													<Div>
														<Span>{list.updatedAt.substring(0, 10)} </Span>
														<Name>{list.name}</Name>
													</Div>
												</Recipe>
											</Link>
										))}
									</>
								) : (
									<Empty>
										<L className="label">You have not saved any recipes yet!</L>
									</Empty>
								)}
							</>
						) : (
							<Empty>
								<L className="label">Please login to view your saved recipes</L>
								<L>
									<Link to={"/login"}>Click here</Link> to login
								</L>
							</Empty>
						)}
					</>
				</SavedRecipesInnerContainer>
			</SavedRecipesContainer>
		</Layout>
	);
};

export default SavedRecipePage;

const SavedRecipesContainer = styled.div`
	width: 100%;
	background-image: url(${BgImg});
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;

	FaRegQuestionCircle.QuestionMark {
	}
`;

const SavedRecipesInnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.2rem;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: 100%;
	padding: 20px;
	gap: 20px;
	max-width: 1260px;
	min-height: 87vh;
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	.recipeLink {
		text-decoration: none;
		color: #000;
	}
	@media (max-width: 640px) {
		justify-content: center;
	}
`;
const Recipe = styled.div`
	height: fit-content;
	width: 300px;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 5px;
	transition: all 0.5s ease-in-out;
	margin-bottom: 20px;
	&:hover {
		transform: translateY(-10px);
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
		filter: brightness(1.1);
	}
	@media (max-width: 640px) {
		height: 350px;
		width: 350px;
	}
`;

const Empty = styled.div`
	margin: auto;
	height: 85vh;
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

const Name = styled.h3`
	margin: 0;
	font-weight: 500;
`;

const L = styled.label`
	font-size: 16px;
	font-weight: bold;
`;

const Img = styled.img`
	border-radius: 5px 5px 0 0;
	object-fit: cover;
	margin: 0;
	height: 300px;
	width: 300px;
`;

const Div = styled.div`
	width: 100%;
	padding: 0 0 10px 10px;
`;

const Span = styled.span`
	color: rgb(66, 64, 64);
	font-size: 13px;
`;
