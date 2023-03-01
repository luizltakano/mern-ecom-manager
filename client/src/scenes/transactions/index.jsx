import React, { useState } from "react";
import Header from "components/Header";
import { useGetTransactionsQuery } from "state/api";
import { DataGrid} from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
	const theme = useTheme();

	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(20);
	const [sort, setSort] = useState({});
	const [search, setSearch] = useState("");

	const [searchInput, setSearchInput] = useState("");

	const { data, isLoading } = useGetTransactionsQuery({
		page,
		pageSize,
		sort: JSON.stringify(sort),
		search,
	});

    const debounce = (func, timeout = 300) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	};

	const searchQuery = debounce(() => {
		setSearch(searchInput);
	});

	const columns = [
		{
			field: "_id",
			headerName: "Transaction ID",
			flex: 1,
		},
		{
			field: "userId",
			headerName: "User ID",
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "Created At",
			flex: 1,
		},
		{
			field: "products",
			headerName: "# of Products",
			flex: 0.5,
			renderCell: (params) => params.value.length,
		},
		{
			field: "cost",
			headerName: "Cost",
			flex: 1,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
		},
	];

	return (
		<Box margin="1.5rem 2.5rem">
			<Header title="TRANSACTIONS" subtitle="List of transactions" />
			<Box
				height="80vh"
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
					loading={!data || isLoading}
					rows={(data && data.transactions) || []}
					rowsPerPageOptions={[20, 50, 100]}
					getRowId={(row) => row._id}
					columns={columns}
					rowCount={(data && data.total) || 0}
					page={page}
					pageSize={pageSize}
					paginationMode="server"
					sortingMode="server"
					onPageChange={(newPage) => setPage(newPage)}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					onSortModelChange={(newSortModel) => setSort(...newSortModel)}
					components={{ Toolbar: DataGridCustomToolbar }}
					componentsProps={{
						toolbar: { searchInput, setSearchInput, searchQuery },
					}}
				/>
			</Box>
		</Box>
	);
};

export default Transactions;
