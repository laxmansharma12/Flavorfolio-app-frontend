import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Img = styled.img`
	border-radius: 15px;
	object-fit: cover;
	margin: 0;
	height: 150px;
	width: 280px;
`;

const Name = styled.h3`
	margin: 5px 0 0 0;
	font-weight: 600;
`;

const Div = styled.div`
	width: 100%;
	padding: 0 0 10px 22px;
	@media (max-width: 640px) {
		padding: 0 0 10px 28px;
	}
`;

function Arrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "black" }}
			onClick={onClick}
		/>
	);
}

const IndianRecipes = () => {
	const [recipesListArray, setRecipesListArray] = useState([]);
	const [auth, setAuth] = useAuth();

	//get all recipes
	const GetMyRecipes = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food`
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
		className: "center",
		infinite: true,
		centerPadding: "60px",
		slidesToShow: 4,
		swipeToSlide: true,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
		afterChange: function (index) {
			console.log(
				`Slider Changed to: ${index + 1}, background: #222; color: #bada55`
			);
		},
	};
	return (
		<div>
			<Slider {...settings}>
				{recipesListArray.map((list) => (
					<div key={list._id}>
						<Link
							className="recipeLink"
							key={list._id}
							to={`/recipe/${list.slug}`}
							style={{
								height: "fit-content",
								width: "fit-content",
							}}
						>
							<Img
								src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${list._id}`}
								alt="Recipe Photo"
							></Img>
							<Div>
								<Name>{list.name.substring(0, 25)}</Name>
							</Div>
						</Link>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default IndianRecipes;
