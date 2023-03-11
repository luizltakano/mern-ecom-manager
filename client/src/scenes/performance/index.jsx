import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetPerformanceQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Performance = () => {
	const theme = useTheme();
    const userId = useSelector((state) => state.global.userId)
	const { data, isLoading } = useGetPerformanceQuery(userId);

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "userId",
			headerName: "User ID",
			flex: 0.5,
		},
		{
			field: "createdAt",
			headerName: "CreatedAt",
			flex: 0.5,
		},
		{
			field: "products",
			headerName: "# of Products",
			flex: 1,
			sortable: false,
            renderCell: (params) => params.value.length
		},
		{
			field: "cost",
			headerName: "Cost",
			flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
		},
	];

	return (
		<Box margin="1.5rem 2.5rem">
			<Header title="PERFORMANCE" subtitle="Tracked Affiliate Sales Performance" />
			<Box
				marginTop="40px"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: theme.palette.primary.light,
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop:"none"
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					rows={(data && data.sales) || []}
					getRowId={(row) => row._id}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default Performance;
