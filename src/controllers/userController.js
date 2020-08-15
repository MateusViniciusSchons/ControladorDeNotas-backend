const connection = require('../db/connection') // Importa a conexão com o banco de dados

module.exports = {
    async store(req, res) {
        // Pega as informações do corpo da requisição
        const { name, email, password, average } = req.body;

        try {
            // Verifica se ainda não existe usuário com esse email
            await connection.execute(
                `SELECT email FROM users
                    WHERE email = ?`,
                [email],
                async (err, results, fields) => {
                    if(!err) {
                        if(results.length === 0) {
                            await connection.execute(
                                "INSERT INTO users (name, email, password, average) values(?, ?, ?, ?)",
                                [name, email, password, average],
                                (err, results, fields) => {
                                    if(!err) {
                                        res.json({ id: results.insertId })
                                    }else {
                                        console.log("[USER CONTROLLER] Erro ao cadastrar usuário no banco: " + err)
                                    }
                                }
                            )
                        } else {
                            res.json({
                                error: "E-mail duplicado"
                            })
                        }
                    } else {
                        console.log(err)
                        return;
                    }
                    
                }
            )
        }
        catch(err) {
            console.log("[USER CONTROLLER] Erro ao cadastrar usuário no banco: " + err)
        }
        
    }
}