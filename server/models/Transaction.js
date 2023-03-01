import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            ref: "Product"
        }
	},
    {
        timestamps: true
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
