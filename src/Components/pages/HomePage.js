import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/Layout";
import SearchImgSpice from "../images/spices.png";
import SearchImgFood from "../images/food1.png";
import styled from "styled-components";
import IndImg from "../images/gate-of-india.png";
import AmericaImg from "../images/statue-of-liberty.png";
import ThaiImg from "../images/wat-phra-kaew.png";
import MexicoImg from "../images/mexico-pyramid.png";
import ChinaImg from "../images/chinese.png";
import OtherImg from "../images/other.png";
import { Link } from "react-router-dom";
import RecentRecipes from "../carousels/RecentRecipes";

const CategoryBanner = styled.div`
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30px 0;
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
	transition: all 0.2s ease-in-out !important;
	cursor: pointer;
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
	height: 70%;
	width: 70%;
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

const LatestContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const LatestInnerContainer = styled.div`
	display: flex;
	align-items: start;
	flex-direction: column;
	width: 100%;
	max-width: 1300px;
	margin: 0 20px 10px;
`;
const LatestTitle = styled.h2`
	margin-bottom: 10px;
	@media (max-width: 1320px) {
		margin-left: 10px;
	}
	@media (max-width: 640px) {
		margin-left: 20px;
	}
`;

const Home = () => {
	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

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

			<LatestContainer>
				<LatestInnerContainer>
					<LatestTitle>Latest Recipes</LatestTitle>
					<RecentRecipes />
				</LatestInnerContainer>
			</LatestContainer>
		</Layout>
	);
};

export default Home;

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
		padding: 32px 16px;
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
		width: 350px;
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
	transition: all 0.2s ease-in-out !important;
	background-color: rgb(5, 163, 49);
	border: none;

	&:hover {
		transform: scale(1.05);
		transition: all 0.4s ease-in-out;
		filter: brightness(1);
	}

	@media (max-width: 640px) {
		padding: 12px 0;
		margin-top: 10px;
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
