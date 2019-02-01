var roleUpgrader = require('role.upgrader');
//var roleLogist = require('role.logist');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
        
            if (Game.flags.Flag4 && creep.room.name != Game.flags.Flag4.room.name) {
                    creep.moveTo(Game.flags.Flag4); 
                    creep.say("move to flag");
                    }
            
                else {
                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, 
                    {
                        // the second argument for findClosestByPath is an object which takes
                        // a property called filter which can be a function
                        // we use the arrow operator to define it
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    });
                    
                    
                    if (constructionSite == undefined) {
                        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES); }
                    
                    //creep.say(constructionSite);
                    // if one is found
                    if (constructionSite != undefined) {
                        // creep.say('// try to build, if the constructionSite is not in range');
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            //creep.say(' move towards the constructionSite');
                            creep.moveTo(constructionSite);
                        }
                    }
                    // if no constructionSite is found
                    else {
                        //creep.say('// try to upgrade');
                        // go upgrading the controller
                        //roleLogist.run(creep);
                        roleUpgrader.run(creep);
                    }
                }
                
            }
        
        // if creep is supposed to harvest energy from base
        else {
            // find closest base
            
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 400)
            });

            if (container) {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(container);    
                }
            }
            
            else {

                // find closest source
                 //creep.say('Harvest');
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
        }
    }
};