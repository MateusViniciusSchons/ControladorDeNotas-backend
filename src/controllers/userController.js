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
                const user = new User({ name, email, password, average });

                await user.save();

                return res.json({ ok: true });
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