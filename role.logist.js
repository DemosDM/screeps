var roleLogistic = {
    /** @param {Creep} creep **/ 
    run: function(creep) {
        if(creep.memory.supplying && _.sum(creep.carry) == 0) {
            creep.memory.supplying = false; creep.say('fetching'); 
        } 
        
        if(!creep.memory.supplying && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.supplying = true; creep.say('supplying'); 
        } 
        
        if (creep.memory.supplying) {
            if (_.sum(creep.carry) > creep.carry.energy) {
                creep.say("Miner");
                var terminal = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                filter: (s) => (s.structureType == STRUCTURE_TERMINAL)
                            });
                if(creep.transfer(terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE || creep.transfer(terminal, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(terminal); 
                    
                }                 
                
            }
            else {
                //creep.say("Harvest");
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                    // the second argument for findClosestByPath is an object which takes
                                    // a property called filter which can be a function
                                    // we use the arrow operator to define it
                                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                 || s.structureType == STRUCTURE_EXTENSION
                                                 || s.structureType == STRUCTURE_TOWER
                                                 || s.structureType == STRUCTURE_CONTAINER
                                                 )
                                                 && s.energy < s.energyCapacity
                                });
                if (structure != undefined) {
                    if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure); 
                        
                    } 
                }
                
                // fill the storage
                else {
                    var stores = creep.room.find(FIND_STRUCTURES, { 
                    filter: (structure) => { return (
                         structure.structureType ==  STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity); } 
                    }); 
                    
  /*                  if (stores == undefined){
                        console.log("Unde" == stores);
                        var stores = creep.room.find(FIND_STRUCTURES, { 
                        filter: (structure) => { return (
                             structure.structureType ==  STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity); } 
                        });
    */       }
                if (stores != undefined) {
                            
                        //console.log("move to = " + creep.name + stores);
                       //creep.say("Undefinet");
                        if(creep.transfer(stores[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(stores[0]); 
                        }
                    }
            }
        }
        else { 
           // creep.say("Harvest");
            let res = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (o) => o.resourceType === RESOURCE_ENERGY });
            
            if (res.length  && (res[0].energy > 200)) {
                console.log('found ' + res[0].energy + ' energy at ', res[0].pos);
                creep.say(res[0].energy);
                if (creep.pickup(res[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(res[0].pos);
                    
                }
                
            }
           
           else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) && ((structure.store[RESOURCE_ENERGY] > 500) || (structure.store[RESOURCE_LEMERGIUM] > 500 ) || (structure.store[RESOURCE_UTRIUM] > 500 )); } 
                });
               
                var source = creep.pos.findClosestByPath(containers); 
                if (source) {
                    
                    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
                        creep.moveTo(source); 
                    }
                    else {
                        creep.withdraw(source, RESOURCE_LEMERGIUM);
                        creep.withdraw(source, RESOURCE_UTRIUM);
                    }
                    
                } 
           }
        } 
        
    }
};

module.exports = roleLogistic;