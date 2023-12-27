import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../Layouts/Layout";
import BgImg from "../images/i-like-food.svg";
import styled from "styled-components";
import LoginImg from "../images/loginImg.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/authProvider";

const LoginContainer = styled.div`
	height: 85vh;
	width: 100%;
	background-image: url(${BgImg});
	background-color: rgb(243, 243, 243);
	display: flex;
	justify-content: center;
	align-items: center;
`;
const RightSection = styled.div`
	height: fit-content;
	width: 280px;
	padding: 20px 30px;
`;
const LoginHeader = styled.h2`
	font-weight: bold;
	font-size: 30px;
	margin: 0 0 20px 0;
`;

const Form = styled.form``;

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
	color: rgb(66, 64, 64);
`;

const Img = styled.img`
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	margin: 0;
	height: 100%;
	width: 100%;
`;
const LoginInnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

const LeftSection = styled.div`
	width: 300px;
	@media (max-width: 640px) {
		display: none;
	}
`;

const Login = () => {
	const [auth, setAuth] = useAuth();
	const [email, SetEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`,
				{
					email,
					password,
				}
			);
			if (res.data.success) {
				toast.success(res.data.message);
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});
				localStorage.setItem("auth", JSON.stringify(res.data));
				setPassword("");
				SetEmail("");
				navigate(-1);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {}
	};

	return (
		<Layout title={"Login"}>
			<LoginContainer>
				<LoginInnerContainer>
					<LeftSection>
						<Img src={LoginImg}></Img>
					</LeftSection>
					<RightSection>
						<LoginHeader>Login</LoginHeader>
						<Form onSubmit={handleLogin}>
							<Section>
								<L htmlFor="email">Email</L>
								<Input
									type="email"
									placeholder="Enter email"
									required
									onChange={(e) => SetEmail(e.target.value)}
								></Input>
							</Section>
							<Section>
								<L htmlFor="password">Password</L>
								<Input
									type="text"
									placeholder="Enter password"
									required
									onChange={(e) => setPassword(e.target.value)}
								></Input>
								<Span>
									Forgot password? <Link to="/forgot-password">Reset</Link>
								</Span>
							</Section>
							<Button type="submit">Login</Button>
						</Form>
						<Span>
							Not registered? <Link to="/register">Register</Link>
						</Span>
					</RightSection>
				</LoginInnerContainer>
			</LoginContainer>
		</Layout>
	);
};

export default Login;
