const gameCtrl = require("../controllers/game");

module.exports = app =>{
    app.post('/name', gameCtrl.name);

    app.post('/move', gameCtrl.move);
}