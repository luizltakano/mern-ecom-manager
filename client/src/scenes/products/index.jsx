import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import ProductCard from "components/ProductCard";

function Products() {
	const { data, isLoading } = useGetProductsQuery();
	const isNonMobile = useMediaQuery("(min-width: 1000px)");

	const productCardList =
		data &&
		!isLoading &&
		data.map(
			({ _id, name, price, description, category, rating, supply, stat }) => {
				return (
					<ProductCard
						key={_id}
						_id={_id}
						name={name}
						price={price}
						description={description}
						category={category}
						rating={rating}
						supply={supply}
						stat={stat}
					/>
				);
			}
		);

	return (
		<Box margin="1.5rem 2.5rem">
			<Header title="PRODUCTS" subtitle="See your list of products" />
			{data || !isLoading ? (
				<Box
					margin-top="20px"
					display="grid"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					justifyContent="space-between"
					rowGap="20px"
					columnGap="1.33%"
					sx={{
						"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
					}}
				>
					{productCardList}
				</Box>
			) : (
				<>Loading...</>
			)}
		</Box>
	);
}

export default Products;
