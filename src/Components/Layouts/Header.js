import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authProvider";
import { RxCross2 } from "react-icons/rx";
import { SearchInput } from "../form/SearchInput";
const Nav = styled.div`
	background-color: rgb(0, 61, 17);
	height: 60px;
	display: flex;
	justify-content: center;
	font-size: 1rem;
	color: #fff;
	position: sticky;
	top: 0;
	z-index: 10;
	@media (max-width: 960px) {
		transition: 0.8s all ease;
	}
`;
const NavContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	z-index: 1;
	width: 100%;
	padding: 0 24px;
	max-width: 1300px;
	color: #fff;
`;

const LeftSection = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: row;
	gap: 30px;
	align-items: center;
`;
const RightSection = styled.div`
	display: flex;
	justify-content: end;
	gap: 30px;
	align-items: center;
	width: fit-content;
	flex-direction: row;
`;

//---------------logo styles START--------------
const NavLogo = styled(LinkR)`
	font-weight: bold;
	font-size: 30px;
	text-align: center;
	color: #fff;
	text-decoration: none;
	@media (max-width: 640px) {
		padding: 0 0px;
	}
`;
//---------------logo styles END--------------

//mobile view nav toggle button styles
const MobileIcon = styled.div`
	display: none;
	@media screen and (max-width: 1120px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 60%);
		font-size: 1.5rem;
		cursor: pointer;
		color: #fff;
	}
`;

const NavItems = styled.ul`
	display: flex;
	justify-content: center;
	gap: 30px;
	align-items: center;
	flex-direction: row;
	padding: 0;
	margin: 0;
	@media screen and (max-width: 1120px) {
		display: none;
	}
`;

const NavLink = styled.a`
	color: rgb(221, 216, 216);
	font-weight: 500;
	text-decoration: none;
	padding-top: 10px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	&:hover {
		color: #fff;
	}
`;

//---------------- buttons styles START-----------------
const ButtonContainer = styled.div`
	width: 80%;
	height: 100%;
	display: flex;
	justify-content: end;
	gap: 10px;
	align-items: center;
	@media screen and (max-width: 1120px) {
		display: none;
	}
`;

const LoginButton = styled.a`
	border: 1.8px solid #fff;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 7px 18px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.6s ease-in-out;
	&:hover {
		background-color: rgb(13, 207, 68);
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;
const RegisterButton = styled.a`
	background-color: rgb(5, 163, 49);
	border: none;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 8px 18px;
	font-weight: 500;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.6s ease-in-out;
	&:hover {
		background-color: rgb(13, 207, 68);
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;
const LogoutButton = styled.button`
	background-color: rgb(5, 163, 49);
	border: none;
	justify-content: center;
	display: flex;
	align-items: center;
	height: 70%;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 0 20px;
	font-weight: 500;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.6s ease-in-out;
	&:hover {
		background-color: rgb(13, 207, 68);
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;

//mobile view navlinks styles
const MobileMenuLinks = styled.div`
	background-color: rgb(0, 61, 17);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
	position: absolute;
	top: 60px;
	width: 100%;
	padding: 12px 40px 24px 20px;
	border-radius: 0 0 20px 20px;
	box-shadow: 0 5 10px rgba(0, 0, 0, 0.3);
`;

//mobile view styles
export const MobileLink = styled.a`
	color: #fff;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	&:hover {
		color: orange;
	}
`;

const UserNameDiv = styled.div`
	display: flex;
	justify-content: end;
	gap: 10px;
	align-items: center;
	.logout {
		&:hover {
			color: red;
		}
	}
`;

const UserName = styled.label`
	color: #fff;
	text-align: right;
	width: fit-content;
	font-weight: 500;
	text-decoration: none;
	cursor: pointer;
	font-weight: bold;
`;
const Header = () => {
	const [auth, setAuth] = useAuth();
	const [Open, setOpen] = React.useState(false);
	const navHide = useRef();
	const mobileIcon = useRef();
	const [bars, setBars] = useState(true);
	const [cross, setCross] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				navHide.current &&
				!navHide.current.contains(event.target) &&
				!mobileIcon.current.contains(event.target)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	const HandleLogout = () => {
		setAuth({
			...auth,
			user: null,
			token: "",
		});
		toast.success("Logout Successfully!!");
		localStorage.removeItem("auth");
		window.location.reload();
	};
	useEffect(() => {});
	return (
		<Nav>
			<NavContainer>
				<LeftSection>
					<NavLogo to="/">Flavorfolio</NavLogo>
					<NavItems>
						<NavLink href="/addrecipe">AddRecipe</NavLink>
						<NavLink href="/myrecipe">MyRecipes</NavLink>
						<NavLink href="/savedrecipe">SavedRecipes</NavLink>
						<NavLink href="/contact">Contact</NavLink>
					</NavItems>
				</LeftSection>
				<MobileIcon ref={mobileIcon}>
					{bars && (
						<FaBars
							onClick={() => {
								setOpen(!Open);
								setBars(false);
								setCross(true);
							}}
						/>
					)}
					{cross && (
						<RxCross2
							onClick={() => {
								setOpen(!Open);
								setBars(true);
								setCross(false);
							}}
						/>
					)}
				</MobileIcon>

				<RightSection>
					<SearchInput />
					<ButtonContainer>
						{!auth.user ? (
							<>
								<LoginButton href="/login">Login</LoginButton>
								<RegisterButton href="/register">Register</RegisterButton>
							</>
						) : (
							<UserNameDiv>
								<UserName>{auth.user.name}</UserName>
								<MdLogout className="logout" onClick={HandleLogout} />
							</UserNameDiv>
						)}
					</ButtonContainer>
				</RightSection>
			</NavContainer>
			{Open && (
				<MobileMenuLinks open={Open} ref={navHide}>
					<MobileLink
						href="/addrecipe"
						onClick={() => {
							setOpen(!Open);
							setCross(false);
							setBars(true);
						}}
					>
						Add-recipe
					</MobileLink>
					<MobileLink
						href="myrecipe"
						onClick={() => {
							setOpen(!Open);
							setCross(false);
							setBars(true);
						}}
					>
						My-recipe
					</MobileLink>
					<MobileLink
						href="savedrecipe"
						onClick={() => {
							setOpen(!Open);
							setCross(false);
							setBars(true);
						}}
					>
						Saved-recipe
					</MobileLink>
					<MobileLink
						href="/contact"
						onClick={() => {
							setOpen(!Open);
							setCross(false);
							setBars(true);
						}}
					>
						Contact
					</MobileLink>
					{!auth.user ? (
						<>
							<LoginButton
								style={{
									padding: "10px 16px",
									background: "transparent",
									color: "white",
									width: "max-content",
								}}
								href="/login"
							>
								Login
							</LoginButton>
							<RegisterButton
								style={{
									padding: "10px 16px",
									background: "rgb(5, 163, 49)",
									color: "white",
									width: "max-content",
								}}
								href="/register"
							>
								Register
							</RegisterButton>
						</>
					) : (
						<LogoutButton
							style={{
								padding: "10px 16px",
								background: "rgb(5, 163, 49)",
								color: "white",
								width: "max-content",
							}}
							href="/register"
							onClick={HandleLogout}
						>
							Logout
						</LogoutButton>
					)}
				</MobileMenuLinks>
			)}
		</Nav>
	);
};

export default Header;
