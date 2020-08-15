const connection = require('../db/connection');

module.exports = {
    async index(req, res) {
        const { matterid: matterId } = req.params;
        try {
            await connection.execute(
                `SELECT id, nota, valor AS peso FROM notas 
                    WHERE materiaId = ?`,
                [matterId],
                (err, result, fields) => {
                    return err
                    ? res.json({ erro: { message: "erro " + err } })
                    : res.json(result)
                }
            );
        }
        catch(error) {
            returnconsole.log('ERRO: ' + error)
        }
    },
    async update(req, res) {
        let { matterId } = req.body.matter;
        const { grades } = req.body;

        try {
            grades.map(async grade => {
                if(!grade.id) {
                    await connection.execute(
                        `INSERT INTO notas (materiaId, nota, valor) values(?, ?, ?)`,
                        [matterId, grade.value === ''? null: grade.value, grade.weight === ''? null: grade.weight],
                        (err, result, fields) => {
                            console.log(
                              err  
                              ? "[GRADES CONTROLLER > UPDATE] Erro: " + err
                              : 'cadastrado'
                            );
                        }
                    );
                    } else {
                        if(grade.delete === true) {
                            await connection.execute(
                                `DELETE FROM notas
                                    WHERE id = ?`,
                                    [grade.id],
                                    (err, result, fields) => {
                                        return err
                                        ? err
                                        : null
                                    }
                            );
                        } else {
                            await connection.execute(
                                `UPDATE notas 
                                    SET nota = ?,
                                    valor = ?
                                        WHERE id = ?`,
                                [grade.value === ''? null: grade.value, grade.weight == ''? null: grade.weight, grade.id],
                                (err, result, fields) => {
                                    return err
                                    ? err
                                    : null
                                }
                            );
                        }
                    }
                })
            } catch (error) {
                console.log("[GRADES CONTROLLER > UPDATE] Erro: " + error);
            }

        
            await connection.execute(
                `SELECT id, nota, valor AS peso FROM notas 
                    WHERE materiaId = ?`,
                [matterId],
                (err, result, fields) => {
                    return err
                    ? res.json({ erro: { message: "erro " + err } })
                    : res.json(result)
                }
            );
        
    }
}