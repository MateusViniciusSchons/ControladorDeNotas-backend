const Matter = require('../models/Matter');

module.exports = {
    async index(req, res) {
        const { matterid: matterId } = req.params;

        try {
            const matter = await Matter.findById(matterId, 'grades');
            grades = matter.grades.map(grade => {
                return{
                    id: grade.id,
                    peso: grade.weight,
                    nota:  grade.value,
                }
                
            });
            return res.json(grades);
        } catch (error) {
            console.log(error);
            return res.json({ error: "Erro ao listar notas" })
        }
    },
    async update(req, res) {
        let { matterId } = req.body.matter;
        const { grades } = req.body;
        try {
            let newGrades = grades.filter(grade => !grade.delete)

            newGrades = newGrades.map(grade => {
                return {
                    id: grade._id,
                    value: grade.value === ''? null: grade.value,
                    weight: grade.weight === ''? null: grade.weight,
                    isResponse: grade.isResponse,
                }
            })

            matter = await Matter.findByIdAndUpdate(matterId, { grades: newGrades });
            return res.json(newGrades);
        } catch (error) {
            console.log(error);
            return res.json({ error: "Erro ao tentar atualizar notas da matéria" });
        }
    }
}