import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/CustomColumnMenu";

const Admin = () => {
	const theme = useTheme();
	const { data, isLoading } = useGetAdminQuery();

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			flex: 0.5,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 0.5,
		},
		{
			field: "phoneNumber",
			headerName: "Phone",
			flex: 1,
			renderCell: (params) => {
				return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
			},
		},
		{
			field: "country",
			headerName: "Country",
			flex: 0.5,
		},
		{
			field: "occupation",
			headerName: "Occupation",
			flex: 0.5,
		},
		{
			field: "role",
			headerName: "Role",
			flex: 0.5,
		},
	];

	return (
		<Box margin="1.5rem 2.5rem">
			<Header title="ADMIN" subtitle="List of Admins" />
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
						borderTop: "none",
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					rows={data || []}
					getRowId={(row) => row._id}
					columns={columns}
					components={{
						ColumnMenu: CustomColumnMenu,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Admin;
