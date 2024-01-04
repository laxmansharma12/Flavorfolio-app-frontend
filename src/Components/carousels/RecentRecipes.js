import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipesContainer = styled.div`
	width: 100%;
	margin: auto;
	@media (max-width: 1320px) {
		width: 90%;
	}
	.recipeLink {
		text-decoration: none;
		color: #000;
	}
`;
const RecipesInnerContainer = styled.div`
	margin: 10px 0 10px 10px;
	transition: all 0.3s ease-in-out !important;
	&:hover {
		transform: scale(1.05);
		filter: brightness(1);
	}
`;

const generateMediaQueries = (baseHeight, baseWidth) => {
	const breakpoints = [
		{ maxWidth: 1320, height: 130, width: 230 },
		{ maxWidth: 640, height: 100, width: 155 },
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
		dots: false,
		infinite: true,
		speed: 1000,
		autoplay: true,
		arrows: false,
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
		<RecipesContainer>
			<Slider {...settings}>
				{recipesListArray.map((list) => (
					<RecipesInnerContainer
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
					</RecipesInnerContainer>
				))}
			</Slider>
		</RecipesContainer>
	);
};

export default RecentRecipes;
