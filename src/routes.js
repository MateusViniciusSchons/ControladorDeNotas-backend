const express = require('express');
const router = express.Router();

// Importa os controllers
    const calculationsController = require('./controllers/calculationsController');
    const sessionController = require('./controllers/sessionController');
    const userController = require('./controllers/userController');
    const gradesController = require('./controllers/gradesController');
    const mattersController = require('./controllers/mattersController');

// Rotas de cálculos de nota
    // Calcula as notas que precisa tirar conforme o tipo de média
    router.post('/calculations/grade', calculationsController.calculateGrade);
    // Calcula a média necessária para o segundo semestre
    router.post('/calculations/finalaverage', calculationsController.calculateFinalAverage);

//  Rotas para lidar com usuários
    //  Cria um novo usuário
    router.post('/users/create', userController.store);

//  Rotas para lidar com sessões de usuários
    // Cria uma nova sessão
    router.post('/login', sessionController.store);

// Rotas para lidar com matérias
    // Lista todas as matérias de um usuário
    router.get('/matters', mattersController.index);
    // Busca o nome de uma matéria
    router.get('/matters/:id', mattersController.show);
    // Armazena uma nova matéria
    router.post('/matters/create', mattersController.store);
    // Atualiza o nome de uma matéria
    router.put('/matters/:matterid/update', mattersController.update);
    // Deleta uma matéria do banco
    router.delete('/matters/:matterid/delete', mattersController.delete);
    
    // Rotas para lidar com notas
    // Lista todas as notas de uma matéria
    router.get('/matters/:matterid/grades', gradesController.index);
    // Atualiza as notas de uma matéria (deleta e atualiza valores)
    router.put('/grades/update', gradesController.update);

module.exports = router;