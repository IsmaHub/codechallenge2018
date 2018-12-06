module.exports = {
    move: (req, res) => {
        const data = req.body

        let playersFireTarget = _getFireTargets(data.players, data.player.position);
        let directionString = "";
        directionString = _getFireDirection(playersFireTarget)
        if(directionString.length){
            return res.send({move: "fire-"+directionString}).end();
        }
        let invadersFireTarget = _getFireTargets(data.invaders, data.player.position);
        directionString = _getFireDirection(invadersFireTarget)
        if(directionString.length){
            return res.send({move: "fire-"+directionString}).end();
        }
        return res.send({move: "up"}).end();
    },

    name: (req, res) => {
        return res.send({email: "ismael.jimenez@ext.privalia.com", name: "ENP"}).end();
    },

    _getFireTargets(targets, pos){
        let objectResponse = {}
        targets.forEach(target => {
            if(target.x === pos.x){
                if(target.y > pos.y){
                    objectResponse.down += 1
                }else objectResponse.up += 1
            }else if(target.y === pos.y){
                if(target.x > pos.x){
                    objectResponse.left += 1
                }else objectResponse.right += 1
            }
        });
        return objectResponse
    },

    _getFireDirection(targets){
        let directionString = "";
        let lastDirection = 0;
        for(var direction in targets) {
            if(targets.hasOwnProperty(direction)) {
                if(targets[direction] > lastDirection){
                    directionString = direction
                    lastDirection = targets[direction]
                }
            }
        }
        return directionString
    }
}