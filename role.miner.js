var roleMiner = { 
    /**  {Creep} creep **/ 
    run: function(creep) { 
        var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); } }); 
        var miners = _.filter(Game.creeps, (c) => c.memory.role == 'miner' && c.room.name == creep.room.name);
        var sources = [];
//creep.say(miners.indexOf(creep));
//console.log(miners.length);

    if(targets.length > 0) { 
        //creep.say(miners.indexOf(creep));
        if(creep.pos.getRangeTo(targets[miners.indexOf(creep)]) == 0) { 
            //var source = creep.pos.findClosestByPath(FIND_SOURCES || FIND_MINERALS); 
            
            sources = sources.concat(creep.room.find(FIND_SOURCES), creep.room.find(FIND_MINERALS));
            source = creep.pos.findClosestByRange(sources) // Never use ClosestByPath, it eats CPU like nothing else.`
            creep.harvest(source); 
            
        } else { 
            creep.moveTo(targets[miners.indexOf(creep)]); 
            
            } 
        
        } 
        
    }
};

module.exports = roleMiner;