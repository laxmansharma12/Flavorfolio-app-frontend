import React from "react";
import { Layout } from "../Components/Layouts/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 85vh;
`;

const H1 = styled.h1`
	font-size: 100px;
	font-weight: 700;
	margin: 0;
`;
const H2 = styled.h2`
	margin: 0;
`;
const P = styled.p`
	margin-top: 20px;
	.link {
		color: #000;
		text-decoration: none;
		border: 2px solid #000;
		padding: 10px;
	}
`;
const PageNotFound = () => {
	return (
		<Layout title={"404"}>
			<Div>
				<H1>404</H1>
				<H2>Oops! Page Not Found</H2>
				<P>
					<Link className="link" to="/">
						Go Back
					</Link>
				</P>
			</Div>
		</Layout>
	);
};

export default PageNotFound;
