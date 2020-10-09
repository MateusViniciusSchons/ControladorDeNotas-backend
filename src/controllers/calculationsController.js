module.exports = {
    calculateGrade(req, res) {
        const { notas, media } = req.body;

        let nullGrades = []; // Array que armazena todas as notas que não possuem valor
        let normalGrades = []; // Array que armazena todas as notas que possuem valor
        let type = "a"; // Armazena o tipo de média a ser calculada
        let result; // Armazena o resultado
        

        nullGrades = notas.filter(nota => nota.nota === '' || nota.nota === null || nota.isResponse === true);
        normalGrades = notas.filter(nota => !nullGrades.includes(nota));
        // Se todas as notas tiver peso, a média é ponderada
        type = notas.every(nota => nota.peso !== null && nota.peso !== '')
            ? 'p'
            : 'a';

        if(type === "a") { 

            let normalGradesSum = normalGrades.reduce((accumulator, grade) => grade.nota + accumulator, 0);

            result = ((media * notas.length) - (normalGradesSum)) / nullGrades.length;
        } else {

            let normalGradesSum = normalGrades.reduce((total, grade) => total + (grade.nota * grade.peso), 0);// soma das notas que tem valor multiplicadas pelo seu peso
            let somaPesos = nullGrades.reduce((total, grade) => total + grade.peso, 0);
            // (valor mínimo da média escolar x 10 (no caso, 70 é a do IFFar) - (soma das notas multiplicadas com os pesos)) / soma dos pesos sem nota 
            result = ((media * 10) - normalGradesSum) / somaPesos;
        }

        let calculatedGrades = nullGrades;
        calculatedGrades.map(grade => {
            grade.nota = Number(result > 0? result.toFixed(2): 0);
            grade.isResponse = true;
        });

        res.json({ notas: calculatedGrades })
    },
    calculateFinalAverage(req, res) {
        const { semestre1, media } = req.body;

        let semestre2 = (media - (semestre1.nota * (semestre1.peso / 10))) / (1 - (semestre1.peso / 10));
        res.json({ nota: semestre2.toFixed(2) });
    }
}

/*
    JSON Final Average: 
    {
        semestre1: {
            nota: 7,
            peso: 4
        },
        media: 7
    }
*/