import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authProvider";
import { FaTwitter } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa6";

const FooterContainer = styled.div`
	background-color: #000;
	display: flex;
	flex-direction: column;
`;
const FooterInnerContainer = styled.div`
	display: flex;
	color: #fff;
	justify-content: center;
	align-items: center;
	gap: 5%;
	flex-direction: row;
	padding: 40px;
	@media (max-width: 1320px) {
		gap: 0;
	}
	@media (max-width: 640px) {
		flex-direction: column;
		padding: 20px;
	}
`;
const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	align-items: center;
	width: 25%;
	@media (max-width: 1320px) {
		width: 25%;
	}
	@media (max-width: 640px) {
		width: 90%;
	}
`;

const Title = styled.h1`
	margin: 0;
`;
const SubtTitle = styled.p`
	margin-top: 0;
`;

const ListContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
	@media (max-width: 1320px) {
		width: fit-content;
		justify-content: end;
		gap: 20px;
	}
	@media (max-width: 640px) {
		width: 90%;
		flex-wrap: wrap;
		gap: 0;
		justify-content: space-between;
		.unOrderedlist {
			margin-right: 18px;
			margin-top: -11px;
		}
	}
`;
const UL = styled.ul`
	list-style: circle;
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	@media (max-width: 640px) {
		gap: 5px;
	}
`;
const LI = styled.li`
	.home {
		text-decoration: none;
		color: #fff;
		&:hover {
			color: orange;
		}
	}
`;
const A = styled.a`
	color: #fff;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		color: orange;
	}
`;

const SocialMediaContainer = styled.div`
	border: none;
	border-top: 1px solid rgb(163, 154, 154);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 75%;
	margin: auto;
	padding: 20px 0;
	margin-bottom: 10px;
	margin-top: 10px;
	@media (max-width: 1320px) {
		width: 85%;
	}
`;
const IconsContainer = styled.div`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0 15px 0;
	gap: 15px;
`;
const Icons = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	border: 1px solid #fff;
	padding: 10px;
	border-radius: 50%;
`;
const P = styled.p`
	margin-top: 0;
	font-size: 14px;
	color: #fff;
`;
export const Footer = () => {
	const [auth, setAuth] = useAuth();
	const navigate = useNavigate();

	const Scroll = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<FooterContainer>
			<FooterInnerContainer>
				<TitleContainer>
					<Title>Flavorfolio</Title>
					<SubtTitle>
						Explore the world of taste with us and savor the essence of culinary
						excellence
					</SubtTitle>
				</TitleContainer>
				<ListContainer>
					<UL>
						<LI>
							<Link className="home" to={"/"}>
								Home
							</Link>
						</LI>
						<LI>
							<A onClick={() => Scroll()}>Scroll Up</A>
						</LI>
					</UL>
					<UL>
						<LI>
							<A
								onClick={() => {
									{
										auth?.user
											? navigate("/addrecipe")
											: toast.error("Please Login To Add Recipe");
									}
								}}
							>
								AddRecipe
							</A>
						</LI>
						<LI>
							<A href="/myrecipe"> MyRecipe</A>
						</LI>
					</UL>
					<UL className="unOrderedlist">
						<LI>
							<A href="/savedrecipe"> SavedRecipes</A>
						</LI>
						<LI>
							<A href="/contact"> Contact</A>
						</LI>
					</UL>
					<UL className="unOrderedlist">
						<LI>
							<A href="/login"> Login</A>
						</LI>
						<LI>
							<A href="/register"> Register</A>
						</LI>
					</UL>
				</ListContainer>
			</FooterInnerContainer>
			<SocialMediaContainer>
				<IconsContainer>
					<Icons
						href={"https://www.linkedin.com/in/laxman-sharma/"}
						target="display"
					>
						<FaLinkedinIn />
					</Icons>
					<Icons href={"https://twitter.com/laxmansharmaX"} target="display">
						<FaTwitter />
					</Icons>
					<Icons href={"https://github.com/laxmansharma12"} target="display">
						<TbBrandGithubFilled />
					</Icons>
				</IconsContainer>
				<P>&copy;Copyright. All rights reserved</P>
			</SocialMediaContainer>
		</FooterContainer>
	);
};
