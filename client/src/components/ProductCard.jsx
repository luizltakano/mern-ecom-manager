import React, { useState } from "react";
import {
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Rating,
	useTheme,
	Typography,
} from "@mui/material";

const ProductCard = ({
	_id,
	name,
	price,
	description,
	category,
	rating,
	supply,
	stat,
}) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
    
	return (
		<Card
			sx={{
				backgroundImage: "none",
				backgroundColor: theme.palette.background.alt,
				borderRadius: "0.55rem",
			}}
		>
			<CardContent>
				<Typography
					sx={{ fontSize: "14" }}
					color={theme.palette.secondary[700]}
					gutterBottom
				>
					{category}
				</Typography>
				<Typography variant="h5" component="div">
					{name}
				</Typography>
				<Typography
					sx={{ marginBottom: "1.5rem" }}
					color={theme.palette.secondary[400]}
				>
					${Number(price).toFixed(2)}
				</Typography>
				<Rating value={rating} readOnly />
				<Typography variant="body2">{description}</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="primary"
					size="small"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					See More
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{
					color: theme.palette.neutral[300],
				}}
			>
				<CardContent>
					<Typography>_id: {_id}</Typography>
					<Typography>Supply Left: {supply}</Typography>
					<Typography>Sales YTD: {stat.yearlySalesTotal}</Typography>
					<Typography>Units Sold YTD: {stat.yearlyTotalSoldUnits}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default ProductCard;
