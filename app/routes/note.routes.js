const Authorization = require('../../middlewares/middlewires');
module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    app.post('/create',Authorization, notes.create);
    app.get('/getall', notes.findAll);
    app.get('/getone/:noteId', notes.findOne);
    app.put('/edit/:noteId',Authorization, notes.update);
    app.delete('/delete/:noteId',Authorization, notes.delete);
    app.patch('/done/:noteId',notes.patch);
}