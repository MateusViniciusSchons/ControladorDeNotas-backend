const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { name, email, password, average } = req.body;
        let userDuplicated;
        try {
            userDuplicated = await User.findOne({ email }).exec();
        } catch (error) {
            console.log(error);
        }

        if(!userDuplicated) {
            try {
                let user = new User({ name, email, password, average });

                user = await user.save();

                return res.json({ id: user._id });
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.json({
                error: "E-mail duplicado",
            });
        }
    }
}