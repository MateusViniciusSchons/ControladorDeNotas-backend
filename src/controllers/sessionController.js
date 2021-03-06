const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email, password }, '_id average');
            if(!user) return res.json({ error: "Usuário não encontrado" });
            return res.json({userId: user._id, average: user.average});
        } catch (error) {
            console.log(error);
            return res.json({ error: "Erro ao tentar encontrar usuário" });
        }
    },
}