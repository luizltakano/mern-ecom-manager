import React from "react";
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	ReceiptLongOutlined,
	PublicOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const navItems = [
	{
		text: "Dashboard",
		icon: <HomeOutlined />,
	},
	{
		text: "Client Facing",
		icon: null,
	},
	{
		text: "Products",
		icon: <ShoppingCartOutlined />,
	},
	{
		text: "Customers",
		icon: <Groups2Outlined />,
	},
	{
		text: "Transactions",
		icon: <ReceiptLongOutlined />,
	},
	{
		text: "Geography",
		icon: <PublicOutlined />,
	},
	{
		text: "Sales",
		icon: null,
	},
	{
		text: "Overview",
		icon: <PointOfSaleOutlined />,
	},
	{
		text: "Daily",
		icon: <TodayOutlined />,
	},
	{
		text: "Monthly",
		icon: <CalendarMonthOutlined />,
	},
	{
		text: "Breakdown",
		icon: <PieChartOutlined />,
	},
	{
		text: "Management",
		icon: null,
	},
	{
		text: "Admin",
		icon: <AdminPanelSettingsOutlined />,
	},
	{
		text: "Performance",
		icon: <TrendingUpOutlined />,
	},
];

const Sidebar = ({
	user,
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState("");
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	const navItemsComponents = navItems.map(({ text, icon }) => {
		if (!icon) {
			return (
				<Typography
					key={text}
					sx={{
						margin: "2.25rem 0 1rem 3rem",
					}}
				>
					{text}
				</Typography>
			);
		}

		const lcText = text.toLowerCase();

		return (
			<ListItem key={text} disablePadding>
				<ListItemButton
					onClick={() => {
						navigate(`/${lcText}`);
						setActive(lcText);
					}}
					sx={{
						backgroundColor:
							active === lcText ? theme.palette.secondary[300] : "transparent",
						color:
							active === lcText
								? theme.palette.primary[600]
								: theme.palette.secondary[100],
					}}
				>
					<ListItemIcon
						sx={{
							marginLeft: "2rem",
							color:
								active === lcText
									? theme.palette.primary[600]
									: theme.palette.secondary[200],
						}}
					>
						{icon}
					</ListItemIcon>
					<ListItemText primary={text} />
					{active === lcText && (
						<ChevronRightOutlined sx={{ marginLeft: "auto" }} />
					)}
				</ListItemButton>
			</ListItem>
		);
	});

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => {
						setIsSidebarOpen(false);
					}}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						"& .MuiDrawer-paper": {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							boxSizing: "border-box",
							borderWidth: isNonMobile ? 0 : "2px",
							width: drawerWidth,
							display: "flex",
							justifyContent: "space-between",
							height:"100vh"
						},
					}}
				>
					<Box width="100%" overflow="auto">
						<Box margin="1.5rem 2rem 2rem 3rem">
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display="flex" alignItems="center" gap="0.5rem">
									<Typography variant="h4" fontWeight="bold">
										MERNCOMM
									</Typography>
								</Box>
								{!isNonMobile && (
									<IconButton
										onClick={() => {
											setIsSidebarOpen(!isSidebarOpen);
										}}
									>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						<List>{navItemsComponents}</List>
					</Box>
					<Box paddingBottom="2rem" width="100%" sx={{backgroundColor:theme.palette.background.alt}}>
						<Divider />
						<FlexBetween
							textTransform="none"
							gap="1rem"
							margin="1.5rem 2rem 0 3rem"
						>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.9rem"
									sx={{
										color: theme.palette.secondary[100],
									}}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.8rem"
									sx={{
										color: theme.palette.secondary[200],
									}}
								>
									{user.email}
								</Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary[300],
									fontSize: "25px",
								}}
							/>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
