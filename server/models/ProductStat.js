import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema(
	{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [{
            month: String,
            totalSales: Number,
            totalUnits: Number,
        }],
        dailyData: [{
            date: String,
            totalSales: Number,
            totalUnits: Number,
        }]
	},
    {
        timestamps: true
    }
);

const ProductStat = mongoose.model("ProductStat", productStatSchema);

export default ProductStat;
