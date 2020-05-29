const connection = require('../db/connection')

module.exports = {
    async show(req, res) {
        const { matterid } = req.params;
        const { userid } = req.headers;

        try {
            connection.execute(
                `SELECT notas.id, notas.valor, notas.nota, materias.name AS matterName FROM notas
                        INNER JOIN materias
                        on notas.materiaId = materias.id
                    Where materias.id = ?
                    and materias.userId = ?`,
                [matterid, userid],
                (err, result, fields) => {
                    if(!err) {
                        if(result.length > 0) {
                            res.json(result)
                        }
                    } else {
                        console.log(err)
                    }
                }
            )
        } catch(err) {
            console.log(err)
        }
    },
    async index(req, res) {
        const { userid } = req.headers;
        try {
            await connection.execute(
                `select id, name from materias
                    where userId = ?`,
                [userid],
                (err, result, fields) => {
                    if(!err) {
                        res.json(result)
                    } else {
                        console.log(err)
                    }
                }
            )
        } catch (error) {
            console.log(err)
        }
        
    },
    async delete(req, res) {
        const { matterid } = req.params

        await connection.execute(
            `delete from materias
                where id = ?`,
            [matterid],
            async (err, result, fields) => {
                if(!err) {
                    await connection.execute(
                        `delete from notas 
                            where matterId = ?`,
                        [matterid],
                        (err, result, fields) => {
                            if(!err) {
                                res.json({ message: "Matéria deletada com sucesso" })
                            } else {
                                console.log(err)
                            }
                        }
                    )
                } else {                    
                    console.log(err)
                }
            }
        )
    }
}