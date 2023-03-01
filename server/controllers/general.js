import User from "../models/User.js";

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		res.statusCode = 200;
            res.write(
                JSON.stringify(user)
            );
            res.end();
	} catch (error) {
		res.status(404).json({message: error.message});
	}
};
