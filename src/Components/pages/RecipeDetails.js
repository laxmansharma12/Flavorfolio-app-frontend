import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "../Layouts/Layout";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useAuth } from "../../context/authProvider";

const RecipesDetailsContainer = styled.div`
	width: 100%;
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const RecipesDetailsInnerContainer = styled.div`
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
	@media (max-width: 640px) {
		width: 89%;
	}
`;

const LeftSection = styled.div`
	width: 500px;
	height: 100%;
	@media (max-width: 640px) {
		display: flex;
		width: fit-content;
		justify-content: center;
		align-items: center;
	}
`;
const Img = styled.img`
	border-radius: 10px;
	object-fit: cover;
	margin: 0;
	height: 310px;
	width: 450px;
	@media (max-width: 640px) {
		height: 220px;
		width: 320px;
	}
`;

const RightSection = styled.div`
	display: flex;
	justify-content: start;
	text-align: left;
	flex-direction: column;
	height: 100%;
	width: 100%;
	@media (max-width: 640px) {
		width: fit-content;
	}
`;
const Section = styled.div``;

const Top = styled.div`
	display: flex;
	align-items: center;
	gap: 40px;
	flex-direction: row;
	margin-bottom: 20px;
	justify-content: space-between;
	@media (max-width: 1000px) {
		flex-direction: column;
		margin: 0 20px;
	}
	@media (max-width: 640px) {
		flex-direction: column;
		gap: 20px;
	}
`;
const Middle = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	.leftsection {
		width: 33%;
		padding-right: 50px;
	}
	.rightsection {
		width: 65%;
	}
	@media (max-width: 1000px) {
		flex-direction: column;
		margin: 0 20px;
		width: 100%;
		.leftsection {
			width: fit-content;
		}
		.rightsection {
			width: fit-content;
		}
	}
	@media (max-width: 640px) {
		flex-direction: column;
		width: 100%;
		.leftsection {
			width: fit-content;
		}
		.rightsection {
			width: fit-content;
		}
	}
`;

const Ingredients = styled.div`
	color: rgb(66, 64, 64);
`;
const Steps = styled.div`
	color: rgb(66, 64, 64);
`;

const Divider = styled.div`
	border: 2px solid rgb(66, 64, 64);
	height: 90%;
	margin: 40px 10px 0 0;
	@media (max-width: 640px) {
		margin: 0 0 10px 0;
		width: 89%;
		place-self: center;
	}
`;

const ButtonController = styled.div`
	display: flex;
	justify-content: start;
	flex-direction: row;
	margin-top: 10px;
	gap: 10px;
	align-items: center;
`;

const EditBtn = styled.button`
	padding: 10px 30px;
	border: none;
	background-color: green;
	border-radius: 10px;
	color: #fff;
	&:hover {
		background-color: rgb(7, 161, 7);
	}
`;

const DeleteBtn = styled.button`
	padding: 10px 30px;
	border: none;
	background-color: red;
	border-radius: 10px;
	color: #fff;
	&:hover {
		background-color: rgb(229, 1, 1);
	}
`;

const Desc = styled.p`
	margin-top: 0.3rem;
	color: rgb(66, 64, 64);
`;
const Name = styled.h1`
	margin: 5px 0;
	font-weight: 600;
	@media (max-width: 640px) {
		margin-top: 0;
		font-size: 27px;
	}
`;

const L = styled.label`
	font-size: 16px;
	font-weight: bold;
`;

const NameSimilar = styled.h3`
	margin: 5px 0 0 0;
	font-weight: 600;
`;

const ImgSimilar = styled.img`
	border-radius: 15px;
	object-fit: cover;
	margin: 0;
	height: 196px;
	width: 280px;
`;

const ForPhoneScreen = styled.div`
	@media (min-width: 640px) {
		display: none;
	}
`;
const SpanSimilar = styled.span`
	color: rgb(66, 64, 64);
	font-size: 13px;
`;

const H1 = styled.h1``;
const Span = styled.span`
	color: rgb(66, 64, 64);
	font-size: 13px;
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
	/* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
	/* border-radius: 5px; */
	transition: all 0.5s ease-in-out;
	margin-bottom: 10px;
	&:hover {
		transform: translateY(-10px);
		/* box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6); */
		filter: brightness(1.1);
	}
`;

const Div = styled.div`
	width: 100%;
	padding: 0 0 10px 22px;
	@media (max-width: 640px) {
		padding: 0 0 10px 28px;
	}
`;

const Similar = styled.div`
	width: 100%;
	border-radius: 10px;
	background-color: rgb(216, 216, 226);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const InnerSimilar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const ForWideScreen = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	@media (max-width: 640px) {
		display: none;
	}
`;
const H3 = styled.h3``;

export const RecipeDetails = () => {
	const [auth, setAuth] = useAuth();
	const [askDelete, setAskDelete] = useState(false);
	const [ok, setOk] = useState();
	const params = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState({});
	const [relatedRecipe, setRelatedRecipe] = useState([]);

	//initalp details
	useEffect(() => {
		if (params?.slug) getrecipe();
	}, [params?.slug]);

	//get single Recipe
	const getrecipe = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food/${params.slug}`
			);
			setRecipe(data?.food);
			getSimilarRecipe(data?.food._id, data?.food?.category._id);
		} catch (error) {
			console.log(error);
		}
	};
	//get similar recipe
	const getSimilarRecipe = async (fid, cid) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/related-food/${fid}/${cid}`
			);
			setRelatedRecipe(data?.recipe);
		} catch (error) {
			console.log(error);
		}
	};
	//delete a product
	const handleDelete = async () => {
		try {
			if (ok === "") return;
			const { data } = await axios.delete(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/delete-food/${ok}`
			);
			toast.success("Recipe Deleted Succfully");
			setOk("");
			navigate(-1);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout title={"Recipe details"}>
			<RecipesDetailsContainer>
				<H1>Product details</H1>
				<RecipesDetailsInnerContainer>
					<Top>
						<LeftSection>
							{recipe._id && (
								<Img
									src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${recipe._id}`}
									alt="Recipe Photo"
								></Img>
							)}
						</LeftSection>
						<RightSection>
							<Name>{recipe.name}</Name>
							<Section>
								<L>Description</L>
								<Desc>{recipe.description}</Desc>
							</Section>
							<L>
								Category : <Span>{recipe?.category?.name}</Span>
							</L>
							<L style={{ margin: "10px 0" }}>
								Created At: <Span>{recipe.updatedAt?.substring(0, 10)}</Span>
							</L>
							{auth?.user?._id === recipe?.userId || auth?.user?.role === 1 ? (
								<ButtonController>
									<EditBtn
										onClick={() => {
											navigate(`/update-recipe/${recipe.slug}`);
										}}
									>
										<FaEdit />
									</EditBtn>
									<DeleteBtn
										onClick={() => {
											setAskDelete(true);
											setOk(recipe._id);
										}}
									>
										<MdDelete />
									</DeleteBtn>
								</ButtonController>
							) : (
								""
							)}
						</RightSection>
					</Top>
					<Middle>
						<Section className="leftsection">
							<L>Ingredients</L>
							<Ingredients>
								<ul>
									{recipe.ingredients?.split(",").map((ingredient, index) => (
										<li key={index}>{ingredient.trim()}</li>
									))}
								</ul>
							</Ingredients>
						</Section>
						<Divider></Divider>
						<Section className="rightsection">
							<L>Steps</L>
							<Steps>
								<ol>
									{recipe.steps?.split(",").map((steps, index) => (
										<li style={{ marginBottom: "2px" }} key={index}>
											{steps.trim()}
										</li>
									))}
								</ol>
							</Steps>
						</Section>
					</Middle>
					<Modal
						centered
						width={"200px"}
						open={askDelete}
						onOk={() => {
							handleDelete();
							setAskDelete(false);
						}}
						onCancel={() => setAskDelete(false)}
						okButtonProps={{ block: false }}
						cancelButtonProps={{ block: false }}
						style={{
							textAlign: "center",
						}}
					>
						<FaRegQuestionCircle
							className="QuestionMark"
							style={{ fontSize: "100px", color: "red", textAlign: "center" }}
						/>
						<br></br>
						<L>Delete this recipe?</L>
					</Modal>
					<Similar>
						<H3>You may like these</H3>
						{relatedRecipe.length === 0 && <p>No Similar recipes found</p>}
						<InnerSimilar>
							<ForWideScreen>
								{relatedRecipe.length !== 0 &&
									relatedRecipe?.map((p) => (
										<Link
											className="recipeLink"
											key={p._id}
											to={`/recipe/${p.slug}`}
											style={{
												height: "fit-content",
												width: "fit-content",
											}}
										>
											<Recipe>
												<ImgSimilar
													src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${p._id}`}
													alt="Recipe Photo"
												/>
												<Div>
													<NameSimilar>{p.name.substring(0, 25)}</NameSimilar>
													<SpanSimilar>
														{p.updatedAt.substring(0, 10)}
													</SpanSimilar>
												</Div>
											</Recipe>
										</Link>
									))}
							</ForWideScreen>
							<ForPhoneScreen>
								{relatedRecipe.length !== 0 && relatedRecipe.length > 0 && (
									<Link
										className="recipeLink"
										key={relatedRecipe[0]._id}
										to={`/recipe/${relatedRecipe[0].slug}`}
										style={{
											height: "fit-content",
											width: "fit-content",
										}}
									>
										<Recipe>
											<ImgSimilar
												src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${relatedRecipe[0]._id}`}
												alt="Recipe Photo"
											/>
											<Div>
												<NameSimilar>
													{relatedRecipe[0].name.substring(0, 25)}
												</NameSimilar>
												<SpanSimilar>
													{relatedRecipe[0].updatedAt.substring(0, 10)}
												</SpanSimilar>
											</Div>
										</Recipe>
									</Link>
								)}
							</ForPhoneScreen>
						</InnerSimilar>
					</Similar>
				</RecipesDetailsInnerContainer>
			</RecipesDetailsContainer>
		</Layout>
	);
};
