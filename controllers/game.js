module.exports = {
    move: (req, res) => {
        const data = req.body

        /**
         * 
         */
        _getFireDirection = (targets) => {
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
            console.log("DIRECTION TARGET: "+directionString)
            return directionString
        }
        
        /**
         * 
         */
        _getFireTargets = (targets, pos) => {
            let objectResponse = {down: 0, up: 0, left: 0, right: 0}
            targets.forEach(target => {
                if(target.x === pos.x){
                    if(target.y > pos.y){
                        objectResponse.down += 1
                    }else objectResponse.up += 1
                }else if(target.y === pos.y){
                    if(target.x > pos.x){
                        objectResponse.right += 1
                    }else objectResponse.left += 1
                }
            });
            console.log(objectResponse)
            return objectResponse
        }


        let playersFireTarget = _getFireTargets(data.players, data.player.position);
        let directionString = "";
        directionString = _getFireDirection(playersFireTarget)
        console.log("direction fire: "+directionString)
        if(directionString.length){
            return res.send({move: "fire-"+directionString}).end();
        }
        let invadersFireTarget = _getFireTargets(data.invaders, data.player.position);
        directionString = _getFireDirection(invadersFireTarget)
        console.log("direction fire: "+directionString)
        if(directionString.length){
            return res.send({move: "fire-"+directionString}).end();
        }
        
        return res.send({move: "up"}).end();
    },

    name: (req, res) => {
        return res.send({email: "ismael.jimenez@ext.privalia.com", name: "ENP"}).end();
    }
}