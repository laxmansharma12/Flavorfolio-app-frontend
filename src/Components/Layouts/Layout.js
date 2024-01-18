import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children, title, description, keywords, author }) => {
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="author" content={author} />
				<title>{title}</title>
			</Helmet>
			<Header />
			<main style={{ minHeight: "85vh" }}>
				<Toaster />
				{children}
			</main>
			<Footer />
		</div>
	);
};
Layout.defaultProps = {
	title: "Flavorfolio",
	description: "MERN stack project",
	keywords: "MERN,mern,react,food,recipe,foodrecipe,node,briyani",
	author: "laxman-sharma",
};
