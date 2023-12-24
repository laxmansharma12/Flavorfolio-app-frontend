import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../Layouts/Layout";
import BgImg from "../images/i-like-food.svg";
import RegisterImg from "../images/registerBg1.png";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const RegisterContainer = styled.div`
	height: 85vh;
	width: 100%;
	background-image: url(${BgImg});
	background-color: rgb(243, 243, 243);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const RightSection = styled.div`
	height: fit-content;
	width: fit-content;
	padding: 20px 30px;
	@media (max-width: 640px) {
		padding: 20px 10px;
	}
`;
const RegisterHeader = styled.h2`
	font-weight: bold;
	font-size: 30px;
	margin: 0 0 20px 0;
`;

const Form = styled.form`
	width: 300px;
	padding: 0 10px;
`;

const Section = styled.div`
	padding-bottom: 15px;
	display: flex;
	flex-direction: column;
`;

const L = styled.label`
	font-weight: 500;
	font-size: 17px;
	padding: 0 0 5px 0;
`;

const Input = styled.input`
	outline: none;
	box-shadow: none;
	height: 20px;
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
	border: none;
	width: 100%;
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

const Span = styled.span`
	padding-left: 15px;
`;

const RegisterInnerContainer = styled.div`
	background-color: #fff;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const LeftSection = styled.div`
	height: 528.31px;
	width: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media (max-width: 640px) {
		display: none;
	}
`;

const Img = styled.img`
	padding: 0px 10px 0 10px;
	height: 250px;
	width: 358px;
`;
const Title = styled.p`
	margin: 0 0 10px 0;
	padding: 0 0 0 35px;
	font-weight: 700;
	font-size: 40px;
	line-height: 47px;
`;
const SubTitle = styled.span`
	color: rgb(66, 64, 64);
	padding: 0 45px 0 20px;
	width: 300px;
	font-size: 20px;
	font-weight: 300;
`;

const Registeration = () => {
	const [auth, setAuth] = useAuth();
	const [name, SetName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [answer, setAnswer] = useState();
	const navigate = useNavigate();

	const RouterFunction = () => {
		if (auth?.user) {
			navigate("/");
		}
	};

	useEffect(() => {
		RouterFunction();
	}, [auth]);

	const handlesubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}api/v1/auth/register`,
				{
					name,
					email,
					password,
					answer,
				}
			);
			if (res.data.success) {
				toast.success(res.data.message);
				navigate("/login");
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {}
	};
	return (
		<Layout title={"Register"}>
			<RegisterContainer>
				<RegisterInnerContainer>
					<LeftSection>
						<Img src={RegisterImg}></Img>
						<Title>Welcome to Flavorfolio</Title>
						<SubTitle>
							Showcase your cooking skills by sharing your own recipes with the
							Flavorfolio community.
						</SubTitle>
					</LeftSection>
					<RightSection>
						<RegisterHeader>Register</RegisterHeader>
						<Form onSubmit={handlesubmit}>
							<Section>
								<L htmlFor="name">Name</L>
								<Input
									className="form-control"
									type="text"
									required
									// placeholder="Enter your name"
									onChange={(e) => SetName(e.target.value)}
								></Input>
							</Section>
							<Section>
								<L htmlFor="email">Email</L>
								<Input
									className="form-control"
									type="email"
									required
									// placeholder="Enter your email"
									onChange={(e) => setEmail(e.target.value)}
								></Input>
							</Section>
							<Section>
								<L htmlFor="password">Password</L>
								<Input
									className="form-control"
									type="text"
									required
									// placeholder="Enter password"
									onChange={(e) => setPassword(e.target.value)}
								></Input>
							</Section>
							<Section>
								<L htmlFor="question">What is your favourite dish?</L>
								<Input
									className="form-control"
									type="text"
									required
									// placeholder="Enter your answer"
									onChange={(e) => setAnswer(e.target.value)}
								></Input>
							</Section>
							{/* <Section>
								<L htmlFor="number">Mobile number</L>
								<Input
									className="form-control"
									type="text"
									// placeholder="Enter your mobile number"
									onChange={(e) => setNumber(e.target.value)}
								></Input>
							</Section> */}
							<Button type="submit">Register</Button>
						</Form>
						<Span>
							Allready registered? <Link to="/login">Login</Link>
						</Span>
					</RightSection>
				</RegisterInnerContainer>
			</RegisterContainer>
		</Layout>
	);
};

export default Registeration;
