module.exports = {
    move: (req, res) => {
        const data = req.body
        const currentPosition = req.body.player.position
        const previousPosition = req.body.player.previous
        const visibleArea = req.body.player.area
        const fire = req.body.player.fire


        return res.send({move: ""}).end();

    },

    name: (req, res) => {
        return res.send({email: "ismael.jimenez@ext.privalia.com", name: "ENP"}).end();
    }
}