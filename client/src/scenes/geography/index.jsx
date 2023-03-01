import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeosQuery } from "state/api";
import Header from "components/Header";
import { geoData } from "state/geoData";
import { ResponsiveChoropleth } from "@nivo/geo";

const Geography = () => {
	const theme = useTheme();
	const { data } = useGetGeosQuery();

	return (
		<Box margin="1.5rem 2.5rem">
			<Header title="GEOGRAPHY" subtitle="User density by country" />
			<Box
				marginTop="40px"
				height="75vh"
				border={`1px solid ${theme.palette.secondary[300]}`}
                sx={{backgroundColor: theme.palette.background.alt}}
			>
				{data ? (
					<ResponsiveChoropleth
						data={data}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: theme.palette.secondary[200]
                                    }
                                },
                                legend: {
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    }
                                },
                                tick: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                        strokeWidth: 1
                                    },
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    }
                                }
                            },
                            legend: {
                                text:{
                                    fill: theme.palette.secondary[200]
                                }
                            },
                            tooltip: {
                                container:{
                                    color: theme.palette.neutral.main
                                }
                            }
                        }}
						features={geoData.features}
						margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
						domain={[0, 100]}
						unknownColor={theme.palette.primary.light}
						label="properties.name"
						valueFormat=".2s"
                        projectionScale={150}
						projectionTranslation={[0.45, 0.6]}
						projectionRotation={[0, 0, 0]}
						borderWidth={1.3}
						borderColor="#fff"
						legends={[
							{
								anchor: "bottom-right",
								direction: "column",
								justify: true,
								translateX: 0,
								translateY: -125,
								itemsSpacing: 0,
								itemWidth: 94,
								itemHeight: 18,
								itemDirection: "left-to-right",
								itemTextColor: theme.palette.secondary[200],
								itemOpacity: 0.85,
								symbolSize: 18,
								effects: [
									{
										on: "hover",
										style: {
											itemTextColor: theme.palette.background.alt,
											itemOpacity: 1,
										},
									},
								],
							},
						]}
					/>
				) : (
					<>Loading...</>
				)}
			</Box>
		</Box>
	);
};

export default Geography;
