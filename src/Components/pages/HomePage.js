import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/Layout";
import SearchImgSpice from "../images/spices.png";
import SearchImgFood from "../images/food1.png";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Home = () => {
	const [auth, setAuth] = useAuth();
	const [food, setFood] = useState();

	//get all foods
	const getAllFoods = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}api/v1/foods/get-food`
			);
			if (data.success) {
				setFood(data.foods);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong in getting foods");
		}
	};

	// useEffect(() => {
	// 	getAllFoods();
	// }, []);
	return (
		<Layout>
			<SearchContainer>
				<SearchInnerContainer>
					<SearchLeftContainer>
						<Title>The Easiest Way To Make Your Favorite Meal</Title>
						<SubTitle>
							Discover 10+ recipes in your hand with the best recipe. Help you
							to find the easiest way to cook.
						</SubTitle>
						<SearchButton href="/explore">Explore</SearchButton>
					</SearchLeftContainer>
					<SearchRightContainer>
						<SearchRightInnerContainer>
							<Image src={SearchImgSpice} alt="Spice-img" />
							<Image src={SearchImgFood} alt="food-img" />
						</SearchRightInnerContainer>
					</SearchRightContainer>
				</SearchInnerContainer>
			</SearchContainer>
		</Layout>
	);
};

export default Home;

const SearchContainer = styled.div`
	// background-color: rgb(2, 52, 15);
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
		margin-bottom: 30px;rgb(1, 39, 11)
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

const SearchButton = styled.a`
-webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    text-decoration: none;
    width: 95%;
    max-width: 200px;
    text-align: center;
    padding: 14px 0;
    color:#FFF;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s ease-in-out !important;
    	background-color: rgb(5, 163, 49);
;import { axios } from 'axios';

	border: none;
   
    &:hover {
        transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow:  20px 20px 60px black,
    filter: brightness(1);
    }    
    
    
    @media (max-width: 640px) {
        padding: 12px 0;
		margin-top:10px;
        font-size: 18px;
    }`;

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
