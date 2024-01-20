import React, { useRef } from "react";
import styled from "styled-components";
import BgImg from "../images/i-like-food.svg";
import { Layout } from "../Layouts/Layout";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { FaTwitter } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa6";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	width: 100%;
	height: 92vh;
	align-items: center;
	background-image: url(${BgImg});
	background-color: rgb(243, 243, 243);
	@media (max-width: 640px) {
		padding: 0 16px;
		height: 92vh;
	}
	@media (max-width: 960px) {
		padding: 0px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	width: fit-content;
	color: #000;
	background-color: #fff;
	border-radius: 16px;
	box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 10px;
		width: 95%;
	}
`;

const Title = styled.div`
	font-size: 50px;
	font-weight: 700;
	color: #000;
	@media (max-width: 768px) {
		display: none;
	}
`;
const H = styled.h1`
	margin: 10px 0 5px 0;
`;

const Desc = styled.div`
	font-size: 16px;
	max-width: 300px;
	line-height: 22px;
	color: rgb(66, 64, 64);
	@media (max-width: 768px) {
		font-size: 16px;
	}
`;
const DescForm = styled.form`
	width: 90%;
	max-width: 400px;
	height: 100%;
	max-height: 350px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	padding: 32px 0 32px 32px;
	@media (max-width: 768px) {
		margin-top: 0;
		align-items: center;
		font-size: 16px;
		padding: 0;
		text-align: center;
	}
`;

const ContactForm = styled.form`
	width: 95%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	padding: 32px 32px 32px 0;
	gap: 12px;
	@media (max-width: 768px) {
		width: 85%;
		padding: 32px;
	}
`;

const ContactInput = styled.input`
	flex: 1;
	background-color: transparent;
	border: 1px solid rgb(16, 188, 19);
	outline: none;
	font-size: 18px;
	color: #000;
	border-radius: 12px;
	padding: 12px 16px;
	&:focus {
		border: 1px solid #000;
	}
	@media (max-width: 768px) {
		padding: 5px 16px;
	}
`;

const ContactInputMessage = styled.textarea`
	flex: 1;
	background-color: transparent;
	border: 1px solid rgb(16, 188, 19);
	outline: none;
	font-size: 18px;
	color: #000;
	border-radius: 12px;
	padding: 12px 16px;
	&:focus {
		border: 1px solid #000;
	}
`;

const ContactButton = styled.input`
	width: 100%;
	text-decoration: none;
	text-align: center;
	background-color: rgb(16, 188, 19);
	padding: 15px 16px;
	margin-top: 2px;
	border-radius: 12px;
	border: none;
	color: #fff;
	font-size: 18px;
	font-weight: 600;
	box-shadow: 3px 3px 7px rgba(61, 60, 60, 0.5);
	&:hover {
		background-color: rgb(13, 212, 16);
	}
	@media (max-width: 768px) {
		padding: 15px 16px;
	}
`;

const IconsContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: start;
	padding: 20px 0 15px 0;
	gap: 15px;
`;
const Icons = styled.a`
	display: flex;
	color: #000;
	border: 1px solid #000;
	padding: 10px;
	border-radius: 50%;
`;
const ContactPage = () => {
	const form = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		emailjs
			.sendForm(
				"service_j7uqmqa",
				"template_slsej5d",
				form.current,
				"jPNEp_kwGi-Bo-V6B"
			)
			.then(
				(result) => {
					form.current.reset();
					toast.success("Message sent successfull!!");
				},
				(error) => {
					console.log(error.text);
				}
			);
	};
	return (
		<Layout title={"Contact"}>
			<Container>
				<Wrapper>
					<DescForm>
						<Title>Contact</Title>
						<H>Thank you for visiting Flavorfolio</H>
						<Desc>
							We appreciate your interest in our food recipes. If you have any
							questions, suggestions, or just want to say hello, feel free to
							reach out to us.
						</Desc>
						<IconsContainer>
							<Icons
								href={"https://www.linkedin.com/in/laxman-sharma/"}
								target="display"
							>
								<FaLinkedinIn />
							</Icons>
							<Icons
								href={"https://twitter.com/laxmansharmaX"}
								target="display"
							>
								<FaTwitter />
							</Icons>
							<Icons
								href={"https://github.com/laxmansharma12"}
								target="display"
							>
								<TbBrandGithubFilled />
							</Icons>
						</IconsContainer>
					</DescForm>
					<ContactForm ref={form} onSubmit={handleSubmit}>
						<ContactInput
							placeholder="Your Email"
							name="from_email"
							required
							type="email"
						/>
						<ContactInput placeholder="Your Name" name="from_name" required />
						<ContactInput placeholder="Subject" name="subject" required />
						<ContactInputMessage
							placeholder="Message"
							rows="4"
							name="message"
						/>
						<ContactButton type="submit" value="Send" />
					</ContactForm>
				</Wrapper>
			</Container>
		</Layout>
	);
};

export default ContactPage;
