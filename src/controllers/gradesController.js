const connection = require('../db/connection')

module.exports = {
    async update(req, res) {

        // pega os valores do frontend
        const { matterName = null, matterId = null } = req.body.matter;
        const { grades } = req.body;
        const { userid } = req.headers;
        // se não tiver um id de matéria, quer dizer que ela não existe, então cria uma
        if(!matterId) {
            try {
                await connection.execute(
                    `INSERT INTO materias (name, userId) values(?, ?)`,
                    [matterName, userid],
                    (err, result, fields) => {
                        if(!err) {
                            matterId = result.insertId;
                        } else {
                            console.log("[MATTER CONTROLLER> STORE] Erro ao cadastrar matéria no banco: " + err)
                            res.json({ error: "Falha ao cadastrar matéria." })
                        }
                    }
                )
            } catch (err) {
                console.log("[MATTER CONTROLLER> STORE] erro ao cadastrar matéria no banco: " + err)
                res.json({ error: "Falha ao cadastrar matéria." })
            }
        }

        // cadastra todas as novas notas (que não enviaram id)

        try {
            await grades.map(async grade => {
                if(!grade.id) {
                    await connection.execute(
                        `INSERT INTO notas (materiaId, nota, valor) values(?, ?, ?)`,
                        [matterId, grade.value, grade.weight],
                        (err, result, fields) => {
                            if(err) {
                                console.log("[GRADES CONTROLLER > STORE] Erro: " + err)
                            }
                        }
                        )
                    }
                    
                    if(grade.delete === true) {
                        await connection.execute(
                            `delete from notas
                                where id = ?`,
                                [grade.id],
                                (err, result, fields) => {
                                    if(err) {
                                        console.log(err)
                                    }
                                }
                        )
                    }
                })
            res.json({ message: "Notas cadastradas com sucesso" })
            
        } catch (err) {
            console.log("[GRADES CONTROLLER > STORE] Erro: " + err)
        }

    }
}