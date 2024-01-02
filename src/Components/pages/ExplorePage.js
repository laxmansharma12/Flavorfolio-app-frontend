import React, { useEffect } from "react";
import { Layout } from "../Layouts/Layout";

const ExplorePage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout title={"Explore"}>
			<div>ExplorePage</div>
		</Layout>
	);
};

export default ExplorePage;
