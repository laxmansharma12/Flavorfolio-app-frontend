import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
	background-color: #000;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const P = styled.p`
	color: #fff;
	margin: 0;
`;
export const Footer = () => {
	return (
		<FooterContainer>
			<P>Food-recipe-app </P>
		</FooterContainer>
	);
};
