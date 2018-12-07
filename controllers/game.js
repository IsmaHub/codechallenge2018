module.exports = {
    move: (req, res) => {
        const data = req.body
        
        /**
         * 
         */
        _isWall = (x, y) =>{
            return data.board.walls.some((wall) =>{
                return x == wall.x && y == wall.y
            })
        }

        /**
         * 
         */
        _getNextMove = ()=>{
            //UP
            if(
                (!_isWall(data.player.position.x, data.player.position.y-1) &&
                (data.player.position.x !== data.player.previous.x || data.player.position.y-1 !== data.player.previous.y) &&
                !(
                    !_isWall(data.player.position.x-1, data.player.position.y) &&
                    (data.player.position.x-1 !== data.player.previous.x || data.player.position.y !== data.player.previous.y)
                )
            )
            ){
                console.log("*****************IN UP **************")
                return "up"

            //RIGHT
            }else if(
                !_isWall(data.player.position.x+1, data.player.position.y) &&
                (   
                    _isWall(data.player.position.x, data.player.position.y-1) ||
                    (data.player.position.x == data.player.previous.x && data.player.position.y-1 == data.player.previous.y)
                ) &&
                (data.player.position.x+1 !== data.player.previous.x || data.player.position.y !== data.player.previous.y)
            ){
                console.log("*****************IN RIGHT **************")
                return "right"

            //DOWN
            }else if(
                !_isWall(data.player.position.x, data.player.position.y+1) &&
                (data.player.position.x !== data.player.previous.x || data.player.position.y+1 !== data.player.previous.y)
            ){
                console.log("*****************IN DOWN **************")
                return "down"

            //LEFT
            }else if(
                !_isWall(data.player.position.x-1, data.player.position.y) &&
                (data.player.position.x-1 !== data.player.previous.x || data.player.position.y !== data.player.previous.y)
            ){
                console.log("*****************IN LEFT **************")
                return "left"

            }else{
                return "up"
            }
        }

        /**
         * 
         */
        _isBehindWall = (target, dir1, dir2) =>{
            return data.board.walls.some(wall=>{
                return  (
                            (wall[dir1] < target[dir1] && wall[dir1] > data.player.position[dir1]) &&
                            (wall[dir1] > target[dir1] && wall[dir1] < data.player.position[dir1])
                        ) && wall[dir2] === target[dir2] && wall[dir2] === data.player.position[dir2]
            })
        }


        /**
         * 
         */
        _getFireTargets = (targets, pos) => {
            let objectResponse = {down: 0, up: 0, left: 0, right: 0}
            targets.forEach(target => {
                if(target.x === pos.x && !_isBehindWall(target, "y", "x")){    
                    if(target.y > pos.y){
                        objectResponse.down += 1
                    }else objectResponse.up += 1
                }else if(target.y === pos.y && !_isBehindWall(target, "x", "y")){
                    if(target.x > pos.x){
                        objectResponse.right += 1
                    }else objectResponse.left += 1
                }
            });
            return objectResponse
        }

        /**
         * 
         */
        _getBestFireScore = (players, invaders) =>{
            let dirToFire = ''
            let score = 0
            let directions = ['left', 'right', 'up', 'down']
            directions.forEach(direction => {
                let dirScore = (players[direction]*100) + (invaders[direction]*50)
                if(dirScore > score){
                    dirToFire = direction
                    score = dirScore
                }
            });
            return dirToFire
        }

        if(data.player.fire){
            let directionString = "";
            let playersFireTarget = _getFireTargets(data.players, data.player.position)
            let invadersFireTarget = _getFireTargets(data.invaders, data.player.position)
            directionString = _getBestFireScore(playersFireTarget, invadersFireTarget)
            console.log("Shot direction: "+directionString)
            if(directionString.length){
                return res.send({move: "fire-"+directionString}).end();
            }
            let move = _getNextMove()
            console.log(move)
            return res.send({move: move}).end();
        }else{
            let move = _getNextMove()
            console.log(move)
            return res.send({move: move}).end();
        }
    },

    name: (req, res) => {
        return res.send({email: "ismael.jimenez@ext.privalia.com", name: "ENP"}).end();
    }
}