import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/Layout";
import BgImg from "../images/i-like-food.svg";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/authProvider";
import { Select } from "antd";
import { CiImageOn } from "react-icons/ci";
import { useParams } from "react-router-dom";

const { Option } = Select;

const AddRecipeContainer = styled.div`
	position: relative;
	width: 100%;
	background-image: url(${BgImg});
	background-color: rgb(243, 243, 243);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (max-width: 640px) {
		height: 100%;
	}
`;

const AddRecipeInnerContainer = styled.div`
	background-color: #fff;
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	display: flex;
	justify-content: center;
	width: fit-content;
	max-width: 1300px;
	flex-direction: column;
	align-items: center;
	@media (max-width: 640px) {
		width: 95%;
	}
`;

const InputDataControll = styled.div`
	height: fit-content;
	width: fit-content;
	padding: 20px 30px;
	@media (max-width: 640px) {
		padding: 0px 10px;
	}
`;
const AddRecipeHeader = styled.h2`
	font-weight: bold;
	font-size: 30px;
	text-align: left;
	margin: 0 0 20px 0;
	@media (max-width: 640px) {
		text-align: center;
	}
`;

const Form = styled.form`
	width: 800px;
	padding: 0 10px;
	display: flex;
	flex-direction: column;
	@media (max-width: 640px) {
		width: 320px;
	}
	.select-category {
		padding: 7px;
		border: 1px solid #000;
		border-radius: 5px;
	}
`;

const Section = styled.div`
	padding-bottom: 15px;
	display: flex;
	flex-direction: column;
`;

const L = styled.label`
	font-weight: 500;
	font-size: 17px;
	color: #000;
	padding: 0 0 5px 0;
`;
const ImgContainer = styled.label`
	font-weight: 500;
	font-size: 17px;
	padding: 50px 50px;
	margin-bottom: 2rem;

	color: #000;
	background-color: #dccccc;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 5px dashed grey;
	border-radius: 5px;
	&:hover {
		background-color: rgb(184, 174, 174);
	}
	@media (max-width: 640px) {
		padding: 4rem;
		margin: 0;
	}
	.fileIcon {
		height: 50px;
		width: 50px;
	}
`;

const Input = styled.input`
	outline: none;
	box-shadow: none;
	height: 20px;
	border-style: solid;
	border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
	padding: 5px 5px;
	border-radius: 5px;
	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

const TextAreaDesc = styled.textarea`
	outline: none;
	box-shadow: none;
	height: 50px;
	padding: 5px 5px;
	border-radius: 5px;
	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

const Button = styled.button`
	background-color: rgb(16, 188, 19);
	color: #fff;
	font-size: 1rem;
	border: none;
	width: 50%;
	place-self: center;
	height: 40px;
	font-weight: bold;
	padding: 5px 0;
	border-radius: 5px;
	margin: 10px 0;
	box-shadow: 3px 3px 7px rgba(61, 60, 60, 0.5);
	&:hover {
		background-color: rgb(13, 212, 16);
	}
`;

const PhotoControll = styled.div`
	height: fit-content;
	display: flex;
	justify-content: center;
	gap: 10px;
	align-items: center;
	flex-direction: column;
	@media (max-width: 640px) {
		gap: 10px;
		padding: 0 0 3rem 0;
	}
`;

const Img = styled.img`
	padding: 0px 10px 0 10px;
	height: 250px;
	object-fit: cover;
	border-radius: 8%;
	width: 340px;
	@media (max-width: 640px) {
		height: 250px;
		width: 310px;
	}
`;
const ImgInput = styled.input``;

const ImgRemoveBtn = styled.button`
	background-color: rgb(228, 27, 27);
	padding: 8px 10px;
	border: none;
	color: #fff;
	border-radius: 5px;
	// font-weight: bold;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	@media (max-width: 640px) {
	}
`;

const IngredientRemoveBtn = styled.button`
	padding: 8px 10px;
	font-weight: bold;
	border: 1px solid black;
	border-radius: 5px;
	@media (max-width: 640px) {
	}
`;
const StepRemoveBtn = styled.button`
	padding: 8px 10px;
	font-weight: bold;
	border: 1px solid black;
	border-radius: 5px;
	@media (max-width: 640px) {
	}
`;

const Div = styled.div`
	display: flex;
	justify-content: start;
	flex-direction: column;
	margin-bottom: 5px;
	gap: 10px;
`;

const AddIngredientBtn = styled.button`
	padding: 10px 10px;
	border: none;
	width: 100px;
	font-weight: bold;
	margin-top: 5px;
	font-size: 15px;
	background-color: rgb(16, 188, 19);
	color: #fff;
	border-radius: 5px;
`;

const AddStepBtn = styled.button`
	padding: 10px 10px;
	border: none;
	width: 100px;
	margin-top: 5px;
	font-weight: bold;
	font-size: 15px;
	background-color: rgb(16, 188, 19);
	color: #fff;
	border-radius: 5px;
`;
const SubDiv = styled.div`
	display: flex;
	justify-content: start;
	flex-direction: row;
	gap: 5px;
`;
const InputField = styled.input`
	width: 94%;
	outline: none;
	box-shadow: none;
	height: 20px;
	border-style: solid;
	border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
	padding: 5px 5px;
	border-radius: 5px;
	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

const UpdateRecipe = () => {
	const [categories, setCategories] = useState([]);
	const [auth, setAuth] = useAuth();
	const [name, SetName] = useState("");
	const [id, setId] = useState("");
	const [userId, setUserId] = useState([]);
	const [category, setCategory] = useState("");
	const [photo, setPhoto] = useState("");
	const [fid, setFid] = useState("");
	const [description, setDescription] = useState("");
	const params = useParams();

	useEffect(() => {
		setUserId(auth?.user);
	}, [auth]);

	//get single recipe
	const getSingleRecipe = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/get-food/${params.slug}`
			);
			SetName(data.food.name);
			setId(data?.food._id);
			setFid(data?.food._id);
			setDescription(data.food.description);
			setCategory(data?.food?.category._id);

			// Split ingredients string into an array and set it
			if (data?.food?.ingredients) {
				const ingredientsarray = data?.food?.ingredients.split(",");
				setIngredients(ingredientsarray);
			}
			// Split steps string into an array and set it
			if (data?.food?.steps) {
				const Stepsarray = data?.food?.steps.split(",");
				setSteps(Stepsarray);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getSingleRecipe();
		//eslint-disable-next-line
	}, []);

	//get all category
	const getAllCategory = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/category/get-category`
			);
			if (data?.success) {
				setCategories(data?.category);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wwent wrong in getting catgeory");
		}
	};

	useEffect(() => {
		getAllCategory();
	}, []);

	// ----------------ingredients controlls------------------------
	const [ingredients, setIngredients] = useState([""]);
	// Function to handle adding a new input field
	const handleAddIngredient = (e) => {
		e.preventDefault();
		setIngredients([...ingredients, ""]);
	};

	// Function to handle removing an input field at a specific index
	const handleRemoveIngredient = (index) => {
		const updatedList = [...ingredients];
		updatedList.splice(index, 1);
		setIngredients(updatedList);
	};

	// Function to handle editing the value of an input field at a specific index
	const handleEditIngredient = (index, value) => {
		const updatedList = [...ingredients];
		updatedList[index] = value;
		setIngredients(updatedList);
	};

	// ----------------steps controlls------------------------
	const [steps, setSteps] = useState([""]);
	// Function to handle adding a new input field
	const handleAddStep = (e) => {
		e.preventDefault();
		setSteps([...steps, ""]);
	};

	// Function to handle removing an input field at a specific index
	const handleRemoveStep = (index) => {
		const updatedList = [...steps];
		updatedList.splice(index, 1);
		setSteps(updatedList);
	};

	// Function to handle editing the value of an input field at a specific index
	const handleEditStep = (index, value) => {
		const updatedList = [...steps];
		updatedList[index] = value;
		setSteps(updatedList);
	};

	//update recipes
	const handleUpdateAddRecipe = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData();
			productData.append("name", name);
			productData.append("description", description);
			productData.append("ingredients", ingredients);
			productData.append("steps", steps);
			photo && productData.append("photo", photo);
			productData.append("userId", userId._id);
			productData.append("category", category);
			const { data } = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/update-food/${fid}`,
				productData
			);
			if (data) {
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout title={"update-recipe"}>
			<AddRecipeContainer>
				<AddRecipeInnerContainer>
					<AddRecipeHeader>Update Recipe</AddRecipeHeader>
					<PhotoControll>
						<>
							{photo ? (
								<>
									{photo && photo.size < 1000000 ? (
										<>
											<Img
												src={URL.createObjectURL(photo)}
												alt="Dish Photo"
											></Img>
											<ImgRemoveBtn
												onClick={() => {
													setPhoto("");
													setId("");
												}}
											>
												Remove Image
											</ImgRemoveBtn>
										</>
									) : (
										<ImgContainer style={{ borderColor: "brown" }}>
											<CiImageOn className="fileIcon" />
											<br></br>
											<L>Click to upload Photo</L>
											<L style={{ color: "brown" }}>Size is more than 1mb</L>
											<ImgInput
												type="file"
												name="photo"
												accept="image/*"
												onChange={(e) => setPhoto(e.target.files[0])}
												hidden
											></ImgInput>
										</ImgContainer>
									)}
								</>
							) : (
								<>
									{id && (
										<>
											<Img
												src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/food-photo/${id}`}
												alt="recipe_photo"
											/>
											<ImgRemoveBtn onClick={() => setId("")}>
												Remove Image
											</ImgRemoveBtn>
										</>
									)}
								</>
							)}
							{!id && (
								<ImgContainer>
									<CiImageOn className="fileIcon" />
									<br></br>
									<L>Click to upload Photo</L>
									<L style={{ fontSize: "12px" }}>
										*Size: less than 1mb required
									</L>
									<ImgInput
										type="file"
										name="photo"
										accept="image/*"
										onChange={(e) => {
											setPhoto(e.target.files[0]);
											setId("id");
										}}
										hidden
									></ImgInput>
								</ImgContainer>
							)}
						</>
					</PhotoControll>

					<InputDataControll>
						<Form onSubmit={handleUpdateAddRecipe}>
							<Section>
								<L htmlFor="dish-name">Category</L>
								<Select
									placeholder="Select a category"
									size="large"
									bordered={false}
									className="select-category"
									onChange={(value) => {
										setCategory(value);
									}}
									value={category}
								>
									<>
										{categories?.map((c) => (
											<Option key={c._id} value={c._id} required>
												{c.name ? c.name : ""}
											</Option>
										))}
									</>
								</Select>
							</Section>
							<Section>
								<L htmlFor="dish-name">Dish name</L>
								<Input
									className="form-control"
									type="text"
									value={name}
									// placeholder="Enter dish name"
									onChange={(e) => SetName(e.target.value)}
									required
								></Input>
							</Section>
							<Section>
								<L htmlFor="description">Description</L>
								<TextAreaDesc
									className="form-control"
									type="text"
									value={description}
									// placeholder="Enter description"
									onChange={(e) => setDescription(e.target.value)}
									required
								></TextAreaDesc>
							</Section>
							<Section>
								<L htmlFor="ingredients">Ingredients</L>
								{ingredients.map((value, index) => (
									<Div key={index}>
										<SubDiv>
											<InputField
												type="text"
												value={value}
												onChange={(e) =>
													handleEditIngredient(index, e.target.value)
												}
												required
											/>
											{ingredients.length !== 1 && (
												<IngredientRemoveBtn
													onClick={() => handleRemoveIngredient(index)}
												>
													Remove
												</IngredientRemoveBtn>
											)}
										</SubDiv>
									</Div>
								))}
								{/* Button to add a new input field */}
								<AddIngredientBtn onClick={handleAddIngredient}>
									+Ingredient
								</AddIngredientBtn>
							</Section>
							<Section>
								<L htmlFor="steps">Steps</L>
								{steps.map((value, index) => (
									<Div key={index}>
										<SubDiv>
											<InputField
												type="text"
												value={value}
												onChange={(e) => handleEditStep(index, e.target.value)}
												required
											/>
											{steps.length !== 1 && (
												<StepRemoveBtn onClick={() => handleRemoveStep(index)}>
													Remove
												</StepRemoveBtn>
											)}
										</SubDiv>
									</Div>
								))}
								{/* Button to add a new input field */}
								<AddStepBtn onClick={handleAddStep}>+Step</AddStepBtn>
							</Section>
							<Button type="submit">Add Recipe</Button>
						</Form>
					</InputDataControll>
				</AddRecipeInnerContainer>
			</AddRecipeContainer>
		</Layout>
	);
};

export default UpdateRecipe;
