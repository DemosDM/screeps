module.exports = {
    run : function(creep){
    //creep.memory.target = 'E49N43';
        
        
        if (creep.room.name == creep.memory.target)
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                creep.say('Find');
            }
            
        }
        else { 
            creep.say(creep.memory.target);
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
            
            creep.moveTo(Game.flags.Flag2);
            
            //creep.moveTo(Game.flags.Flag1);
            }
          
            
        
    }

};