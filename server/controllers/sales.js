import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
	try {
		const overallStat = await OverallStat.find();

		res.statusCode = 200;
            res.write(
                JSON.stringify(overallStat[0])
            );
            res.end();
	} catch (error) {
		res.status(404).json({message: error.message});
	}
};
