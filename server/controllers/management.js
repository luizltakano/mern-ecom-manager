import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getAdmins = async (req, res) => {
	try {
		const admins = await User.find({ role: "admin" }).select("-password");

		res.statusCode = 200;
		res.write(JSON.stringify(admins));
		res.end();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getUserPerformance = async (req, res) => {
	try {
		const { id } = req.params;

		const userWithStats = await User.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: "affiliatestats",
					localField: "_id",
					foreignField: "userId",
					as: "affiliateStats",
				},
			},
			{ $unwind: "$affiliateStats" },
		]);

		const saleTransactions = await Promise.all(
			userWithStats[0].affiliateStats.affiliateSales.map((id) => {
				return Transaction.findById(id);
			})
		);

		const filteredTransactions = saleTransactions.filter((transaction) => {
			return transaction !== null;
		});

		res.statusCode = 200;
		res.write(
			JSON.stringify({ user: userWithStats[0], sales: filteredTransactions })
		);
		res.end();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
