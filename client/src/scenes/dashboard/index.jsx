import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
	DownloadOutlined,
	Email,
	PointOfSale,
	PersonAdd,
	Traffic,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardStatsQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
	const { data, isLoading } = useGetDashboardStatsQuery();

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
			<FlexBetween>
				<Header title="DASHBOARD" subtitle="Check out your general stats" />

				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ marginRight: "10px" }} />
						Download Reports
					</Button>
				</Box>
			</FlexBetween>
			<Box
				marginTop="20px"
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{
					"& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
				}}
			>
				<StatBox
					title="Total Customers"
					value={data && data.totalCustomers}
					increase="+14%"
					description="Since Last Month"
					icon={
						<Email
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				<StatBox
					title="Sales today"
					value={data && data.todayStats.totalSales}
					increase="+21%"
					description="Since Last Month"
					icon={
						<PointOfSale
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>

				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={theme.palette.background.alt}
					padding="1rem"
					borderRadius="0.55rem"
				>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>

				<StatBox
					title="Monthly Sales"
					value={data && data.thisMonthStats.totalSales}
					increase="+5%"
					description="Since Last Month"
					icon={
						<PersonAdd
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				<StatBox
					title="Yearly Sales"
					value={data && data.yearlySalesTotal}
					increase="+43%"
					description="Since Last Month"
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				<Box
					gridColumn="span 8"
					gridRow="span 3"
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
					/>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					padding="1.5rem"
					borderRadius="0.55rem"
				>
					<Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
						Sales by Category
					</Typography>
					<BreakdownChart isDashboard={true} />
					<Typography
						padding="0 0.6rem"
						fontSize="0.8rem"
						sx={{
							color: theme.palette.secondary[200],
						}}
					>
						Breakdown of real states info via category for revenue made for this
						year and total sales.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
