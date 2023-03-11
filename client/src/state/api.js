import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	reducerPath: "adminApi",
	tagTypes: [
		"User",
		"Products",
		"Customers",
		"Transactions",
		"Geography",
		"Admin",
		"Performance",
		"Dashboard",
	],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
		getProducts: builder.query({
			query: () => "client/products",
			providesTags: ["Products"],
		}),
		getCustomers: builder.query({
			query: () => "client/customers",
			providesTags: ["Customers"],
		}),
		getTransactions: builder.query({
			query: ({ page, pageSize, sort, search }) => {
				return {
					url: "client/transactions",
					method: "GET",
					params: { page, pageSize, sort, search },
				};
			},
			providesTags: ["Transactions"],
		}),
		getGeos: builder.query({
			query: () => "client/geography",
			providesTags: ["Geography"],
		}),
		getSales: builder.query({
			query: () => "sales/sales",
			providesTags: ["Sales"],
		}),
		getAdmin: builder.query({
			query: () => "management/admin",
			providesTags: ["Admin"],
		}),
		getPerformance: builder.query({
			query: (id) => `management/performance/${id}`,
			providesTags: ["Performance"],
		}),
		getDashboardStats: builder.query({
			query: () => "/general/dashboard",
			providesTags: ["Dashboard"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetProductsQuery,
	useGetCustomersQuery,
	useGetTransactionsQuery,
	useGetGeosQuery,
	useGetSalesQuery,
	useGetAdminQuery,
	useGetPerformanceQuery,
	useGetDashboardStatsQuery,
} = api;
