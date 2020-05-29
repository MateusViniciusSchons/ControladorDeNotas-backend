module.exports = {
    calculateGrade(req, res) {
        const { notas } = req.body;

        let nullGrades = [];
        let grades = [];
        let type = "a";
        let resultado;

        notas.map(nota => {
            if(nota.nota === '' || nota.isResponse === true) {
                nullGrades.push(nota)
            } else {
                nota.nota = Number(nota.nota.toString().split(',').join('.'))
                grades.push(nota)
            }

            if(nota.peso !== '') {
                type = "p";
            }
        })

        if(type === "a") { // aritmética
            let somaGrades = 0;
            grades.map(grade => {
                somaGrades += grade.nota;
            });
            resultado = ((7 * notas.length) - (somaGrades)) / nullGrades.length;
        } else {  //ponderada
            let somaGrades = 0; // soma das notas q tem multiplicadas pelo seu peso
            let somaPesos = 0; // soma dos pesos que não tem sua nota
            grades.map(grade => {
                somaGrades += (grade.peso * grade.nota);
            });
            nullGrades.map(grade => {
                somaPesos += grade.peso;
            })
            // (valor mínimo da média escolar x 10 (no caso, 70 é a do IFFar) - (soma das notas multiplicadas com os pesos)) / soma dos pesos sem nota 
            resultado = (70 - somaGrades) / somaPesos;
        }

        // nota -> nota que deve tirar;
        // notas que faltam -> Array de notas que estão nulas;
        // RETORNAR UM ARRAY COM TODAS AS NOTAS Q PRECISA TIRAR E PESOS AO INVÉS DISSO --foi
        nullGrades.map(grade => {
            grade.nota = resultado.toFixed(2)
            grade.isResponse = true;
        });

        res.json({ notas: nullGrades })
    },
    calculateFinalAverage(req, res) {
        const { mediaSemestre1: semestre1 } = req.body;

        let semestre2 = (7 - (semestre1 * 0.4)) / 0.6;
        res.json({ nota: semestre2.toFixed(2) });
    }
}