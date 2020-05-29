const connection = require('../db/connection')

module.exports = {
    async store(req, res) {

        const { email, password } = req.body;

        await connection.execute(
            `SELECT id FROM users  
                WHERE email = ?
                AND password = ?`,
            [email, password],
            (err, result, fields) => {
                if (!err) {
                    if(result.length == 1) {
                        console.log(result)
                        //retorna o id do primeiro elemento do array resultante
                        res.json({ userId: result[0].id })
                    } else {
                        // não foi encontrado usuário ou foram encontrados mais de 1
                        res.json({ error: "Não foi encontrado usuário no banco de dados" })
                    }
                } else {
                    console.log('[SESSION CONTROLLER > STORE] Erro no retorno dos dados: ' + err)
                }
            }
        )
        // criar uma sessao
    },
}