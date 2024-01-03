import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecentRecipesContainer = styled.div`
	width: 100%;
	margin: auto;
	@media (max-width: 1320px) {
		width: 90%;
	}
	@media (max-width: 1135px) {
		width: 75%;
	}
	.recipeLink {
		text-decoration: none;
		color: #000;
	}
`;
const RecentRecipesInnerContainer = styled.div``;

const generateMediaQueries = (baseHeight, baseWidth) => {
	const breakpoints = [
		{ maxWidth: 998, height: 130, width: 210 },
		{ maxWidth: 870, height: 130, width: 200 },
		{ maxWidth: 845, height: 120, width: 190 },
		{ maxWidth: 793, height: 115, width: 180 },
		{ maxWidth: 744, height: 110, width: 170 },
		{ maxWidth: 714, height: 105, width: 160 },
		{ maxWidth: 669, height: 100, width: 150 },
		{ maxWidth: 626, height: 90, width: 140 },
		{ maxWidth: 583, height: 80, width: 130 },
		{ maxWidth: 544, height: 80, width: 120 },
	];

	return breakpoints
		.map(
			(bp) => `
    @media (max-width: ${bp.maxWidth}px) {
      height: ${bp.height}px;
      width: ${bp.width}px;
    }
  `
		)
		.join("\n");
};

const Img = styled.img`
	border-radius: 15px;
	object-fit: cover;
	margin: 0;
	height: 130px;
	width: 240px;

	${generateMediaQueries(130, 240)}
`;

const Name = styled.h4`
	margin: 5px 0 0 0;
	font-weight: 600;
	@media (max-width: 776px) {
		font-size: 17px;
	}
	@media (max-width: 662px) {
		font-size: 16px;
	}
	@media (max-width: 605px) {
		font-size: 15px;
	}
`;

const Div = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	@media (max-width: 603px) {
		padding-bottom: 0;
	}
`;
const ArrowDiv = styled.div`
	opacity: 0;
	@media (max-width: 1320px) {
		opacity: 0.6;
	}
`;

function Arrow(props) {
	const { className, style, onClick } = props;
	return (
		<ArrowDiv
			className={className}
			style={{
				...style,
				display: "block",
				background: "black",
				borderRadius: "50%",
				boxShadow: "none",
			}}
			onClick={onClick}
		/>
	);
}

const RecentRecipes = () => {
	const [recipesListArray, setRecipesListArray] = useState([]);
	const [auth, setAuth] = useAuth();
	const navigate = useNavigate();

	//get all recipes
	const GetMyRecipes = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-recent`
			);
			setRecipesListArray(data?.foods);
		} catch (error) {
			console.log(error);
		}
	};

	//lifecycle method
	useEffect(() => {
		GetMyRecipes();
	}, [auth?.user]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		autoplay: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		initialSlide: 0,
		swipeToSlide: true,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
		responsive: [
			{
				breakpoint: 1320,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1135,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 554,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
		],
	};
	return (
		<RecentRecipesContainer>
			<Slider {...settings}>
				{recipesListArray.map((list) => (
					<RecentRecipesInnerContainer
						key={list._id}
						onClick={() => navigate(`/recipe/${list.slug}`)}
					>
						<Img
							src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${list._id}`}
							alt="Recipe Photo"
						></Img>
						<Div>
							<Name>{list.name.substring(0, 17)}</Name>
						</Div>
					</RecentRecipesInnerContainer>
				))}
			</Slider>
		</RecentRecipesContainer>
	);
};

export default RecentRecipes;
