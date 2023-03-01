import React from "react";
import {TextField} from "@mui/material";
import {
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarContainer,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, searchQuery }) => {

	return (
		<GridToolbarContainer>
			<FlexBetween width="100%">
				<FlexBetween>
					<GridToolbarColumnsButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</FlexBetween>
				<TextField
					label="Search..."
					sx={{ marginBottom: "0.5rem", width: "15rem" }}
					variant="standard"
					onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={searchQuery}
					value={searchInput}
				/>
			</FlexBetween>
		</GridToolbarContainer>
	);
};

export default DataGridCustomToolbar;
