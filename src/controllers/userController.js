const connection = require('../db/connection')

module.exports = {
    async store(req, res) {
        const { name, email, password } = req.body;

        try {
            await connection.execute(
                "INSERT INTO users (name, email, password) values(?, ?, ?)",
                [name, email, password],
                (err, results, fields) => {
                    if(!err) {
                        const user = {
                            name,
                            email,
                            password
                        }
                        res.json(user)
                    }else {
                        console.log("[USER CONTROLLER] Erro ao cadastrar usuário no banco: " + err)
                    }
                }
            )
        }
        catch(err) {
            console.log("[USER CONTROLLER] Erro ao cadastrar usuário no banco: " + err)
        }
        
    }
}