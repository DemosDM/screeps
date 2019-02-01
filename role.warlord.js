module.exports = {
    run : function(creep){
        
        //creep.say(creep.claimController(creep.room.controller));
        if (creep.room.name == creep.memory.target){
            //creep.say(creep.attackController(creep.room.controller));
            //creep.moveTo(creep.room.controller);
            if(creep.room.controller && !creep.room.controller.my) {
                 if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(creep.room.controller);
                     }
             }
           if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
           // if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('Go to Claim');
                creep.moveTo(creep.room.controller);
            }
            else if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('Go to Reserv');
                creep.moveTo(creep.room.controller);
            }

        }         
        else { 
            creep.say('hi');
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
            
            //creep.moveTo(Game.flags.Flag4);
            }
        
    }

};