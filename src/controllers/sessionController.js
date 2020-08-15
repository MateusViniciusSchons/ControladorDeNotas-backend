const connection = require('../db/connection');

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
                    if(result.length > 0) {
                        //retorna o id do primeiro elemento do array resultante (id do usuário)
                        return res.json({ userId: result[0].id });
                    } else {
                        // não foi encontrado usuário
                        return res.json({ error: "Usuário Não Encontrado" });
                    }
                } else {
                    return console.log('[SESSION CONTROLLER > STORE] Erro no retorno dos dados: ' + err);
                }
            }
        );
    },
}