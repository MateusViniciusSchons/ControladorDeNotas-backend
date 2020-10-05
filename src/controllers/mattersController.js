const Matter = require('../models/Matter');

module.exports = {
    async show(req, res) {
        const { userid: userId } = req.headers;
        const { id: matterId } = req.params

        try {
            let matter = await Matter.findById(matterId, 'name average');
            return res.json({ id: matter._id, name: matter.name, average: matter.average });
        } catch(error) {
            console.log(error);
            return res.json({error: "Erro ao procurar uma matéria"});
        }
    },
    async index(req, res) {
        const { userid: userId } = req.headers;

        try {
            let matters = await Matter.find({ userId }, 'name _id');
            matters = matters.map(matter => {
                return { id : matter._id, name: matter.name}
            })
            return res.json(matters);
        } catch (error) {
            console.log(error)
            return res.json({error: "Erro ao listar matérias"});
        }
    },
    async store(req, res) {
        const { matterName, average } = req.body;
        const { userid: userId } = req.headers;

        
        try{
            const matter = new Matter({name: matterName, userId, average});
            let result = await matter.save();
            return res.json({ id: result._id });
        }
        catch(e) {
            console.log(e);
            return res.json({ error: "Erro ao cadastrar matéria" });
        }

    },
    async update(req, res) {
        const { userid: userId } = req.headers;
        const { matterName, average } = req.body;
        const { matterid: matterId } = req.params;
        
        try {
            await Matter.findOneAndUpdate({ _id: matterId }, { name: matterName, average });
                return res.json({ ok: true });
        } catch(error) {
            console.log(error);
            return res.josn({ error: 'erro ao atualizar matéria' });
        }
    },
    async delete(req, res) {
        const { matterid: matterId } = req.params

        try {
            await Matter.findByIdAndDelete(matterId);
            return res.json({ ok: true });
        } catch (error) {
            console.log(error);
            return res.json({ error: 'Erro ao deletar Matéria' });
        }
    },
}