import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();

		const productsWithStat = await Promise.all(
			products.map(async (product) => {
				const stat = await ProductStat.find({ productId: product._id });
				return {
					...product._doc,
					stat,
				};
			})
		);

		res.statusCode = 200;
		res.write(JSON.stringify(productsWithStat));
		res.end();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getCustomers = async (req, res) => {
	try {
		const customers = await User.find({ role: "user" }).select("-password");

		res.statusCode = 200;
		res.write(JSON.stringify(customers));
		res.end();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getTransactions = async (req, res) => {
	try {
		const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

		const generateSort = () => {
			const sortParsed = JSON.parse(sort);
			const sortFormatted = {
				[sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
			};
			return sortFormatted;
		};

		const sortFormatted = Boolean(sort) ? generateSort() : {};

		const transactions = await Transaction.find({
			$or: [{ cost: { $regex: new RegExp(search, "i") } }],
		})
			.sort(sortFormatted)
			.skip(page * pageSize)
			.limit(pageSize);

		const total = await Transaction.countDocuments({
			cost: { $regex: search, $options: "i" },
		});

		res.statusCode = 200;
		res.write(JSON.stringify({ transactions, total }));
		res.end();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getGeos = async (req, res) => {
	try {
		const users = await User.find();

		const mappedLocations = users.reduce((acc, { country }) => {
			const countryIso3 = getCountryIso3(country);
			if (!acc[countryIso3]) {
				acc[countryIso3] = 0;
			}
			acc[countryIso3]++;
			return acc;
		}, {});

		const transformedLocations = Object.entries(mappedLocations).map(
			([country, count]) => {
				return {
					id: country,
					value: count,
				};
			}
		);

		res.statusCode = 200;
		res.write(JSON.stringify(transformedLocations));
		res.end();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
