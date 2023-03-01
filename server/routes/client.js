import express from "express";
import { getProducts, getCustomers, getTransactions, getGeos } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeos)

export default router;
