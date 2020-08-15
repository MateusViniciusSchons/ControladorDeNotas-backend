const connection = require('../db/connection');

module.exports = {
    async show(req, res) {
        const { userid: userId } = req.headers;
        const { id: matterId } = req.params
        try {
            await connection.execute(
                `SELECT name FROM materias
                    WHERE userId = ?
                    AND id = ?`,
                [userId, matterId],
                (err, result, fields) => {
                    return err
                        ? console.log(err)
                        : res.json(result[0])
                }
            )
        } catch (error) {
            console.log(error)
        }
        
    },
    async index(req, res) {
        const { userid: userId } = req.headers;
        try {
            await connection.execute(
                `SELECT id, name FROM materias
                    WHERE userId = ?`,
                [userId],
                (err, result, fields) => {
                    return err
                        ? console.log(err)
                        : res.json(result)
                }
            )
        } catch (error) {
            console.log(error)
        }
    },
    async store(req, res) {
        const { matterName } = req.body;
        const { userid: userId } = req.headers;

        try {
            await connection.execute(
                `INSERT INTO materias (name, userId) values(?, ?)`,
                [matterName, userId],
                (err, result, fields) => {
                    return err
                    ? res.json({ error: { message: "erro: " + err}})
                    : res.json({ id: result.insertId });
                }
            );
        } catch (error) {
            console.log('erro' + error)
        }
    },
    async update(req, res) {
        const { userid: userId } = req.headers;
        const { matterName } = req.body;
        const { matterid: matterId } = req.params;
        
        try {
            await connection.execute(
                `UPDATE materias
                    SET name = ?
                        WHERE id = ?
                        AND userId = ?`,
                [matterName, matterId, userId],
                (err, result, fields) => {
                    return err
                    ? res.json({error: {message: "erro " + err}})
                    : res.json({ ok: true })
                }
            )
        } catch (error) {
            console.log(error)
        }
    },
    async delete(req, res) {
        const { matterid: matterId } = req.params
        try {
            await connection.execute(
                `delete from notas 
                    where materiaId = ?`,
                [matterId],
                async (err, result, fields) => {
                    if(err) return console.log(err)
                    
                    await connection.execute(
                        `DELETE FROM materias
                        WHERE id = ?`,
                        [matterId],
                        (err, result, fields) => {
                            return err
                            ? console.log(err)
                            : res.json({ message: "Matéria deletada com sucesso" })
                        }
                    )
                    
                }
            )
        }
        catch(e) {
            return console.log("erro " + e)
        }
        
    },
}