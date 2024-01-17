import React, { useEffect } from "react";
import { Layout } from "../Layouts/Layout";
import SearchImgSpice from "../images/spices.png";
import SearchImgFood from "../images/food1.png";
import CookingImg1 from "../images/woman-cooking.jpg";
import CookingImg2 from "../images/couple-cooking.jpg";
import CookingImg3 from "../images/man-cooking.jpg";
import styled from "styled-components";
import IndImg from "../images/gate-of-india.png";
import AmericaImg from "../images/statue-of-liberty.png";
import ThaiImg from "../images/wat-phra-kaew.png";
import MexicoImg from "../images/mexico-pyramid.png";
import ChinaImg from "../images/chinese.png";
import OtherImg from "../images/other.png";
import { Link, useNavigate } from "react-router-dom";
import RecentRecipes from "../carousels/RecentRecipes";
import IndianRecipes from "../carousels/IndianRecipes";
import ChineseRecipes from "../carousels/ChineseRecipes";
import AmericanRecipes from "../carousels/AmericanRecipes";
import { useAuth } from "../../context/authProvider";
import toast from "react-hot-toast";

const CategoryBanner = styled.div`
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 0;
`;
const CategoryBannerInner = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	max-width: 1300px;
	.link {
		text-decoration: none;
		color: #000;
	}
	@media (max-width: 1200px) {
		justify-content: center;
		width: 80%;
		gap: 20px;
	}
	@media (max-width: 640px) {
		padding: 20px 0;
		justify-content: center;
		width: 100%;
		gap: 30px;
	}
`;
const Category = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	height: 150px;
	width: 150px;
	cursor: pointer;
	transition: all 0.2s ease-in-out !important;
	&:hover {
		transform: scale(1.05);
		transition: all 0.5s ease-in-out;
		filter: brightness(1);
	}
	@media (max-width: 640px) {
		height: 100px;
		padding: 20px;
		width: 100px;
	}
`;
const CategoryIcons = styled.img`
	background-color: rgb(229, 231, 235);
	border-radius: 50%;
	padding: 15px;
	height: 50%;
	width: 50%;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}
	@media (max-width: 640px) {
		height: 90%;
		width: 90%;
	}
`;
const CategoryName = styled.label`
	font-weight: 500;
`;

const RecipesContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;
const RecipesInnerContainer = styled.div`
	display: flex;
	align-items: start;
	flex-direction: column;
	width: 100%;
	max-width: 1300px;
	margin: 0 20px 10px;
`;
const RecipesTitle = styled.h2`
	margin-bottom: 5px;
	@media (min-width: 1320px) {
		margin-left: 0.6%;
	}
	@media (max-width: 1320px) {
		margin-left: 6%;
	}
	@media (max-width: 640px) {
		margin-left: 20px;
	}
`;

const Home = () => {
	const [auth, setAuth] = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<Layout>
			<SearchContainer>
				<SearchInnerContainer>
					<SearchLeftContainer>
						<Title>The Easiest Way To Make Your Favorite Meal</Title>
						<SubTitle>
							Discover 100+ recipes in your hand with the best recipe. Help you
							to find the easiest way to cook.
						</SubTitle>
						<ExploreButton href="/explore">Explore</ExploreButton>
					</SearchLeftContainer>
					<SearchRightContainer>
						<SearchRightInnerContainer>
							<Image src={SearchImgSpice} alt="Spice-img" />
							<Image src={SearchImgFood} alt="food-img" />
						</SearchRightInnerContainer>
					</SearchRightContainer>
				</SearchInnerContainer>
			</SearchContainer>
			<CategoryBanner>
				<CategoryBannerInner>
					<Link className="link" to={"/indian"}>
						<Category>
							<CategoryIcons src={IndImg} />
							<CategoryName>Indian</CategoryName>
						</Category>
					</Link>
					<Link className="link" to={"/thai"}>
						<Category>
							<CategoryIcons src={ThaiImg} />
							<CategoryName>Thai</CategoryName>
						</Category>
					</Link>
					<Link className="link" to={"/american"}>
						<Category>
							<CategoryIcons src={AmericaImg} />
							<CategoryName>American</CategoryName>
						</Category>
					</Link>
					<Link className="link" to={"/chinese"}>
						<Category>
							<CategoryIcons src={ChinaImg} />
							<CategoryName>Chinese</CategoryName>
						</Category>
					</Link>
					<Link className="link" to={"Mexican"}>
						<Category>
							<CategoryIcons src={MexicoImg} />
							<CategoryName>Mexican</CategoryName>
						</Category>
					</Link>
					<Link className="link" to={"/other"}>
						<Category>
							<CategoryIcons src={OtherImg} />
							<CategoryName>Other</CategoryName>
						</Category>
					</Link>
				</CategoryBannerInner>
			</CategoryBanner>
			<RecipesContainer>
				<RecipesInnerContainer>
					<RecipesTitle>Latest Recipes</RecipesTitle>
					<RecentRecipes />
				</RecipesInnerContainer>
				<RecipesInnerContainer>
					<RecipesTitle>Indian Recipes</RecipesTitle>
					<IndianRecipes />
				</RecipesInnerContainer>
				<RecipesInnerContainer>
					<RecipesTitle>Chinese Recipes</RecipesTitle>
					<ChineseRecipes />
				</RecipesInnerContainer>
				<RecipesInnerContainer>
					<RecipesTitle>American Recipes</RecipesTitle>
					<AmericanRecipes />
				</RecipesInnerContainer>
			</RecipesContainer>
			<PublishRecipeContainer>
				<PublishRecipeInnerContainer>
					<ImagesSection>
						<Img1 src={CookingImg1} />
						<Img2 src={CookingImg2} />
						<Img3 src={CookingImg3} />
					</ImagesSection>
					<H1>Publish your recipe for FREE today</H1>
					<P>Publish your Recipe in front of thousands of people for free.</P>
					<Link
						className="addbtn"
						onClick={() => {
							{
								auth?.user
									? navigate("/addrecipe")
									: toast.error("Please Login To Add Recipe");
							}
						}}
					>
						Submit Recipe
					</Link>
				</PublishRecipeInnerContainer>
			</PublishRecipeContainer>
		</Layout>
	);
};

export default Home;

const PublishRecipeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media (max-width: 640px) {
		width: 100%;
	}
`;
const PublishRecipeInnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 60px 0;
	.addbtn {
		background-color: #000;
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		border: none;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		letter-spacing: 0.5px;
		&:hover {
			background-color: rgb(21, 20, 20);
		}
		@media (max-width: 640px) {
			padding: 5px 10px;
			font-weight: 500;
			margin-top: 20px;
		}
	}
	@media (max-width: 640px) {
		width: 90%;
		text-align: center;
		padding-bottom: 30px;
	}
`;

const ImagesSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	gap: 40px;
	@media (max-width: 640px) {
		width: 100%;
		gap: 20px;
	}
`;
const Img1 = styled.img`
	object-fit: cover;
	height: 170px;
	width: 170px;
	border-radius: 70% 30% 30% 70%/60% 40% 60% 40%;
	@media (max-width: 640px) {
		height: 70px;
		width: 70px;
	}
`;
const Img2 = styled.img`
	object-fit: cover;
	height: 220px;
	width: 220px;
	border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
	@media (max-width: 640px) {
		height: 120px;
		width: 120px;
	}
`;
const Img3 = styled.img`
	object-fit: cover;
	height: 170px;
	width: 170px;
	border-radius: 30% 70% 70% 30%/30% 57% 43% 70%;
	@media (max-width: 640px) {
		height: 70px;
		width: 70px;
	}
`;
const H1 = styled.h1`
	font-size: 40px;
	margin: 10px 0;
	@media (max-width: 640px) {
		font-size: 30px;
	}
`;
const P = styled.label`
	font-size: 18px;
	@media (max-width: 640px) {
		font-size: 15px;
		padding: 0 18px;
	}
`;

const SearchContainer = styled.div`
	background-color: rgb(0, 61, 17);
	display: flex;
	justify-content: center;
	position: relative;
	padding: 50px 30px 80px;

	@media screen and (max-width: 960px) {
		padding: 60px 16px;
	}

	@media screen and (max-width: 640px) {
		height: 90vh;
		padding: 25px 0 5px 0;
	}

	z-index: 1;
`;

// SearchLeftContainer and searchRightContainer styles
const SearchInnerContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 1300px;

	@media (max-width: 960px) {
		flex-direction: column;
	}
`;

// titles and sub title styles
const SearchLeftContainer = styled.div`
	width: 100%;
	order: 1;
	@media (max-width: 960px) {
		order: 2;
		margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: 640px) {
		order: 2;
		margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

//dp image styles
const SearchRightContainer = styled.div`
	width: 100%;
	display: flex;
	order: 2;
	justify-content: end;
	@media (max-width: 960px) {
		order: 1;
		justify-content: center;
		align-items: center;
		margin-bottom: 80px;
	}

	@media (max-width: 640px) {
		margin-bottom: 30px;
	}
`;

const SearchRightInnerContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
//self introduction title styles
const Title = styled.div`
	font-weight: 700;
	font-size: 60px;
	color: #fff;
	line-height: 75px;
	width: 500px;
	@media (max-width: 960px) {
		text-align: center;
	}

	@media (max-width: 640px) {
		width: 350px;
		font-size: 40px;
		line-height: 48px;
		margin-bottom: 8px;
	}
`;

// sub-title styles
const SubTitle = styled.div`
	font-size: 20px;
	line-height: 32px;
	margin: 30px 0;
	color: #fff;
	width: 500px;
	@media (max-width: 960px) {
		text-align: center;
	}

	@media (max-width: 640px) {
		width: 85%;
		margin-top: 10px;
		font-size: 16px;
		line-height: 32px;
	}
`;

//resume button styles

const ExploreButton = styled.a`
	-webkit-appearance: button;
	-moz-appearance: button;
	appearance: button;
	text-decoration: none;
	width: 95%;
	max-width: 200px;
	text-align: center;
	padding: 14px 0;
	color: #fff;
	border-radius: 20px;
	cursor: pointer;
	font-size: 20px;
	font-weight: 600;
	background-color: rgb(5, 163, 49);
	border: none;
	transition: all 0.2s ease-in-out !important;
	&:hover {
		transform: scale(1.05);
		transition: all 0.4s ease-in-out;
		filter: brightness(1);
	}

	@media (max-width: 640px) {
		padding: 12px 0;
		margin-top: 0px;
		font-size: 18px;
	}
`;

//---------------dp image styles------------------------------
const Image = styled.img`
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 500px;
	max-height: 500px;
	object-position: center;
	background-repeat: no-repeat;
	@media (max-width: 768px) {
		max-width: 400px;
		max-height: 400px;
	}

	@media (max-width: 640px) {
		max-width: 280px;
		max-height: 280px;
	}
`;
