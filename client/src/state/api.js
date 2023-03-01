import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	reducerPath: "adminApi",
	tagTypes: ["User", "Products", "Customers", "Transactions", "Geography"],
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
	}),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeosQuery } =
	api;
