import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import OverallStat from "./models/OverallStat.js";
import Transaction from "./models/Transaction.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
	dataTransaction,
	dataProduct,
	dataUser,
	dataProductStat,
	dataOverallStat,
	dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 9000;

try {
	await mongoose.set("strictQuery", false);
	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	// OverallStat.insertMany(dataOverallStat)
	// Transaction.insertMany(dataTransaction)
	// User.insertMany(dataUser);
	// Product.insertMany(dataProduct)
	// ProductStat.insertMany(dataProductStat)
	// AffiliateStat.insertMany(dataAffiliateStat)

	app.listen(PORT, () => {
		console.log(`Server active on Port: ${PORT}`);
	});
} catch (error) {
	console.log(`${error} did not connect`);
}
